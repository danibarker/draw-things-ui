package main

import (
	"bytes"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"sync"
	"time"

	_ "github.com/mattn/go-sqlite3"
	"github.com/mitchellh/mapstructure"
	"golang.org/x/net/websocket"
)

type LoraSetting struct {
	File   string  `json:"file"`
	Weight float64 `json:"weight"`
}
type ControlSetting struct {
	File                 string   `json:"file"`
	Weight               float32  `json:"weight"`
	GuidanceStart        float32  `json:"guidanceStart"`
	GuidanceEnd          float32  `json:"guidanceEnd"`
	ControlImportance    string   `json:"controlImportance"`
	NoPrompt             bool     `json:"noPrompt"`
	InputOverride        string   `json:"inputOverride"`
	TargetBlocks         []string `json:"targetBlocks"`
	Key                  string   `json:"key"`
	GlobalAveragePooling bool     `json:"globalAveragePooling"`
	DownSamplingRate     float32  `json:"downSamplingRate"`
}

type AppConfig struct {
	Password   string `json:"password"`
	ExtraLoras string `json:"extra_loras"`
	DBFilename string `json:"db_filename"`
}

type ImageConfig struct {
	Width         int              `json:"width"`
	Height        int              `json:"height"`
	Prompt        string           `json:"prompt"`
	Steps         int              `json:"steps"`
	Strength      float32          `json:"strength"`
	Model         string           `json:"model"`
	Loras         []LoraSetting    `json:"loras"`
	Controls      []ControlSetting `json:"controls"`
	Seed          int64            `json:"seed"`
	GuidanceScale float32          `json:"guidance_scale"`
	Sampler       string           `json:"sampler"`
}

type ImageRequest struct {
	ImageConfig ImageConfig `json:"image_config"`
	Complete    bool        `json:"complete"`
	Filename    string      `json:"filename"`
	Username    string      `json:"username"`
}

type Message struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
	Id   string      `json:"id"`
}
type QueueMessage struct {
	QueueLength int    `json:"queue_length"`
	Type        string `json:"type"`
}
type ImageResponse struct {
	Images []string `json:"images"`
}

type CompletedImage struct {
	Image  string         `json:"image"`
	Socket websocket.Conn `json:"socket"`
}

type ErrorMessage struct {
	Error string `json:"error"`
}

var (
	config           AppConfig                  // Config struct
	db               *sql.DB                    // SQLite3 database
	clientQueue      []*websocket.Conn          // Queue of clients waiting for image responses
	queueMutex       sync.Mutex                 // Mutex for the image request queue
	imageRequestList []string                   = make([]string, 0)
	idToSocketMap    map[string]*websocket.Conn = make(map[string]*websocket.Conn)
	idToImageRequest map[string][]ImageRequest  = make(map[string][]ImageRequest)
	busy             bool                       = false
	HOST             string                     = "http://localhost:7775"
	Id               string
)

func handleWebSocket(ws *websocket.Conn) {
	for {
		var message Message
		if err := websocket.JSON.Receive(ws, &message); err != nil {
			fmt.Printf("error receiving message: %s\n", err)
			break
		}
		fmt.Printf("received message: %s\n", message.Type)
		if message.Id != "" {
			if _, ok := idToSocketMap[message.Id]; !ok {
				idToSocketMap[message.Id] = ws
			}
		}

		switch message.Type {
		case "reconnect":
			var complete []string
			if message.Id != "" {
				idToSocketMap[message.Id] = ws
				if idToImageRequest[message.Id] != nil {
					for _, imgReq := range idToImageRequest[message.Id] {
						if !imgReq.Complete {
							complete = append(complete, imgReq.Filename)
						}
					}
				}
			}
			if err := websocket.JSON.Send(ws, Message{
				Type: "reconnect",
				Data: complete,
			}); err != nil {
				fmt.Printf("error sending message: %s\n", err)
			}

		case "image":
			var imgConfig ImageConfig
			if err := mapstructure.Decode(message.Data, &imgConfig); err != nil {
				fmt.Printf("error decoding image config: %s\n", err)
				continue
			}
			newImageRequest := ImageRequest{
				ImageConfig: imgConfig,
				Complete:    false,
				Filename:    "",
			}
			idToImageRequest[message.Id] = append(idToImageRequest[message.Id], newImageRequest)
			imageRequestList = append(imageRequestList, message.Id)
			if !busy {
				go handleImageMessages()
			}
			go handleQueueMessage(ws)
		case "queue":
			handleQueueMessage(ws)
		default:
			fmt.Printf("unknown message type: %s\n", message.Type)
		}
	}
}

func handleQueueMessage(ws *websocket.Conn) {
	queueMutex.Lock()
	queueLength := len(clientQueue)
	queueMutex.Unlock()

	message := QueueMessage{
		QueueLength: queueLength,
		Type:        "queue",
	}

	if err := websocket.JSON.Send(ws, message); err != nil {
		fmt.Printf("error sending message: %s\n", err)
	}

}
func handleImageMessages() {
	for {
		if len(imageRequestList) == 0 {
			busy = false
			return
		}
		queueMutex.Lock()
		id := imageRequestList[0]
		imageRequestList = imageRequestList[1:]
		queueMutex.Unlock()
		imgRequest := idToImageRequest[id][0]
		idToImageRequest[id] = idToImageRequest[id][1:]
		jsonBody, err := json.Marshal(imgRequest.ImageConfig)
		if err != nil {
			fmt.Printf("error marshalling image config: %s\n", err)
			continue
		}
		image, err := handleImageRequest("txt2img", jsonBody)
		if err != nil {
			fmt.Printf("error handling image request: %s\n", err)
			continue
		}
		currentDateTime := time.Now().String()
		currentDate := currentDateTime[0:10] + "-" + currentDateTime[11:13] + currentDateTime[14:16] + "-" + id
		var folderPath string
		if imgRequest.Username != "" {

			folderPath = "/assets/images/" + imgRequest.Username + "/"
		} else {
			folderPath = "/assets/images/"
		}
		fileName := fmt.Sprintf("%s%s.png", folderPath, currentDate)
		// convert base64 image to png, save in filename
		if err = convertBase64ToPng(image, "public"+fileName); err != nil {
			fmt.Printf("error saving image: %s\n", err)
			continue
		}
		imgRequest.Complete = true
		fmt.Printf("image, %s,%v\n", fileName, imgRequest.Complete)
		websocket.JSON.Send(idToSocketMap[id], Message{
			Type: "image",
			Data: fileName,
		})
	}
}

func convertBase64ToPng(base64String, filename string) error {
	// decode base64
	data, err := base64Decode(base64String)
	if err != nil {
		return err
	}
	// create file
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()
	// write data to file
	if _, err = file.Write(data); err != nil {
		fmt.Printf("error writing data to file: %s\n", err)
		return err
	}
	return nil
}

func base64Decode(base64String string) ([]byte, error) {
	// decode base64
	data, err := base64.StdEncoding.DecodeString(base64String)
	if err != nil {
		fmt.Printf("error decoding base64: %s\n", err)
		return nil, err
	}
	return data, nil
}

func handleImageRequest(method string, jsonBody []byte) (string, error) {

	url := fmt.Sprintf("%s/sdapi/v1/%s", HOST, method)
	// sends request
	var resp *http.Response
	var err error
	resp, err = http.Post(
		url, "application/json", bytes.NewReader(jsonBody))
	if err != nil {
		fmt.Printf("error sending request to /api: %s\n", err)
		return "", err
	}
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}
	// unmarshal response
	var response ImageResponse
	if err = json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return "", err
	}
	if len(response.Images) == 0 {
		return "", errors.New("no images in response")
	}
	return response.Images[0], nil
}

func serveFrontend(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("serving frontend\n")
	// serve frontend/dist/index.html
	http.ServeFile(w, r, "public/index.html")
}

func main() {

	// if does not exist create images folder
	if _, err := os.Stat("public/assets/images"); os.IsNotExist(err) {
		if err = os.MkdirAll("public/assets/images", 0755); err != nil {
			fmt.Printf("error creating images folder: %s\n", err)
			panic(err)
		}
	}
	setupApi()
	// sqlite3
	file, err := os.Open("config.json")
	if err != nil {
		fmt.Printf("error opening config.json: %s\n", err)
		panic(err)
	}
	if err = json.NewDecoder(file).Decode(&config); err != nil {
		fmt.Printf("error decoding config.json: %s\n", err)
		panic(err)
	}
	if err = file.Close(); err != nil {
		fmt.Printf("error closing config.json: %s\n", err)
		panic(err)
	}

	fmt.Printf("config: %+v\n", config)

	db, err = sql.Open("sqlite3", config.DBFilename)
	if err != nil {
		fmt.Printf("error opening sqlite3: %s\n", err)
		panic(err)
	}
	defer db.Close()
	// if _, err = db.Exec(CREATE_DB); err != nil {
	// 	fmt.Printf("error creating table: %s\n", err)
	// 	panic(err)
	//=
	fmt.Printf("connected to sqlite3\n")
	fmt.Printf("listening on port 3333\n")

	http.Handle("/ws", websocket.Handler(handleWebSocket))
	http.Handle("/api/", http.StripPrefix("/api", apiMux))

	http.HandleFunc("/", serveFrontend)
	http.HandleFunc("/assets/", func(w http.ResponseWriter, r *http.Request) {
		http.FileServer(http.Dir("./public")).ServeHTTP(w, r)
	})
	err = http.ListenAndServe(":3333", nil)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error starting server: %s\n", err)
		os.Exit(1)
	} else {
		fmt.Printf("server started on port 3333\n")
	}
}
