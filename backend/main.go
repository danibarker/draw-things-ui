package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"sync"

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

//	var config = Config{
//		HOST: "https://drawthings.danibarker.ca",
//	}
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
	imageRequestList []ImageConfig              = make([]ImageConfig, 0)
	idToSocketMap    map[string]*websocket.Conn = make(map[string]*websocket.Conn)
	idToImageRequest map[string][]ImageConfig   = make(map[string][]ImageConfig)
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
		// check if id is in idToSocketMap
		if message.Id != "" {
			if _, ok := idToSocketMap[message.Id]; !ok {
				idToSocketMap[message.Id] = ws
			}
		}

		switch message.Type {
		case "image":
			var imgConfig ImageConfig
			if err := mapstructure.Decode(message.Data, &imgConfig); err != nil {
				fmt.Printf("error decoding image config: %s\n", err)
				continue
			}

			idToImageRequest[message.Id] = append(idToImageRequest[message.Id], imgConfig)
			imageRequestList = append(imageRequestList, imgConfig)
			handleImageMessages()
			handleQueueMessage(ws)
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
			continue
		}
		queueMutex.Lock()
		imgConfig := imageRequestList[0]
		imageRequestList = imageRequestList[1:]
		queueMutex.Unlock()
		jsonBody, err := json.Marshal(imgConfig)
		if err != nil {
			fmt.Printf("error marshalling image config: %s\n", err)
			continue
		}
		if !busy {
			image, err := handleImageRequest("generate", jsonBody)
			if err != nil {
				fmt.Printf("error handling image request: %s\n", err)
				continue
			}

			if err := websocket.JSON.Send(ws, Message{
				Type: "image",
				Data: image,
			}); err != nil {
				fmt.Printf("error sending message: %s\n", err)
			}

		}
	}
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
	http.FileServer(http.Dir("./dist")).ServeHTTP(w, r)
}

func main() {
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
	// }
	// if _, err = db.Exec(CREATE_DB2); err != nil {
	// 	fmt.Printf("error creating table: %s\n", err)
	// 	panic(err)
	// }
	// if _, err = db.Exec(CREATE_DB3); err != nil {
	// 	fmt.Printf("error creating table: %s\n", err)
	// 	panic(err)
	// }
	// if _, err = db.Exec(CREATE_DB4); err != nil {
	// 	fmt.Printf("error creating table: %s\n", err)
	// 	panic(err)
	// }

	fmt.Printf("connected to sqlite3\n")
	fmt.Printf("listening on port 3333\n")

	http.Handle("/ws", websocket.Handler(handleWebSocket))
	http.Handle("/api/", http.StripPrefix("/api", apiMux))

	http.HandleFunc("/", serveFrontend)
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
