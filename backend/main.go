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
	// init_images is either an array of strings or undefined
	// must handle the undefined case
	// InitImages []string `json:"init_images,omitempty"`
}
type ImageReqFail struct {
	Req ImageConfig `json:"req"`
	Err string      `json:"err"`
}
type ImageReqFails []ImageReqFail
type ImageReqFailsMap map[*websocket.Conn]ImageReqFails

type Message struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
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

var (
	config          AppConfig                         // Config struct
	db              *sql.DB                           // SQLite3 database
	clientQueue     []*websocket.Conn                 // Queue of clients waiting for image responses
	queueMutex      sync.Mutex                        // Mutex for the image request queue
	serviceBusy     bool                              // Flag to indicate if the service is busy processing requests
	imageRequestMap map[*websocket.Conn][]ImageConfig = make(map[*websocket.Conn][]ImageConfig)
	HOST            string                            = "http://localhost:7775"
	fails           ImageReqFailsMap                  = make(ImageReqFailsMap)
)

func handleWebSocket(ws *websocket.Conn) {
	for {
		var message Message
		if err := websocket.JSON.Receive(ws, &message); err != nil {
			fmt.Printf("error receiving message: %s\n", err)
			break
		}
		fmt.Printf("received message: %s\n", message.Type)

		switch message.Type {
		case "image":
			var imgConfig ImageConfig
			if err := mapstructure.Decode(message.Data, &imgConfig); err != nil {
				fmt.Printf("error decoding image config: %s\n", err)
				continue
			}
			fmt.Printf("image config: %+v\n", imgConfig)
			handleImageMessage(ws, imgConfig)
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

	// should send a message to the client as such:
	// {"type":"queue","queue_length":1}

	message := QueueMessage{
		QueueLength: queueLength,
		Type:        "queue",
	}

	if err := websocket.JSON.Send(ws, message); err != nil {
		fmt.Printf("error sending message: %s\n", err)
	}

}
func handleImageMessage(ws *websocket.Conn, imgConfig ImageConfig) {
	queueMutex.Lock()
	clientQueue = append(clientQueue, ws)
	imageRequestMap[ws] = append(imageRequestMap[ws], imgConfig)
	queueMutex.Unlock()
	if !serviceBusy {
		go processQueue()
	}
}

func processQueue() {
	for {
		var client *websocket.Conn
		var imgConfig ImageConfig

		queueMutex.Lock()
		if len(clientQueue) == 0 {
			serviceBusy = false
			queueMutex.Unlock()
			return
		} else {
			fmt.Printf("queue length: %d\n", len(clientQueue))
			client = clientQueue[0]
			clientQueue = clientQueue[1:]

			if len(imageRequestMap[client]) == 0 {
				queueMutex.Unlock()
				continue
			} else {
				serviceBusy = true
				imgConfig = imageRequestMap[client][0]
				// Get the first client in the queue
				// Get the first image request for the client
				imageRequestMap[client] = imageRequestMap[client][1:]
				queueMutex.Unlock()
			}
		}

		// Send the image request to the service
		image, err := handleImageRequest("txt2img", imgConfig)
		if err != nil {
			fmt.Printf("error handling image request: %s\n", err)
			// add the imgConfig back to the client
			// increment the failures
			fails[client] = append(fails[client], ImageReqFail{
				Req: imgConfig,
				Err: err.Error(),
			})

			// check if the client has failed 3 times
			if len(fails[client]) >= 3 {
				// send the client a message that they have failed 3 times
				// and remove them from the queue
				type FailMessage struct {
					Type string `json:"type"`
					Err  string `json:"err"`
				}
				failMessage := FailMessage{
					Type: "fail",
					Err:  "failed 3 times",
				}
				var jsonFailMessage []byte
				jsonFailMessage, err = json.Marshal(failMessage)
				if err != nil {
					fmt.Printf("error marshalling message: %s\n", err)
					continue
				}
				if err = websocket.Message.Send(client, jsonFailMessage); err != nil {
					fmt.Printf("error sending message: %s\n", err)
				}
				continue
			}

			queueMutex.Lock()
			imageRequestMap[client] = append(imageRequestMap[client], imgConfig)

			// Add the client back to the queue

			clientQueue = append(clientQueue, client)
			queueMutex.Unlock()
			continue
		}
		type ImageResponse struct {
			Type        string `json:"type"`
			Image       string `json:"image"`
			QueueLength int    `json:"queue_length"`
		}
		queueMutex.Lock()
		queueLength := len(clientQueue)
		queueMutex.Unlock()

		messageToSend := ImageResponse{
			Type:        "image",
			Image:       image,
			QueueLength: queueLength,
		}
		// stringify
		var jsonMessage []byte
		jsonMessage, err = json.Marshal(messageToSend)
		if err != nil {
			fmt.Printf("error marshalling message: %s\n", err)
			continue
		}
		fmt.Printf("sending image to client\n%s\n", jsonMessage)
		// Send the image to the client
		if err = websocket.Message.Send(client, jsonMessage); err != nil {
			fmt.Printf("error sending message: %s\n", err)
		}
	}
}

func handleImageRequest(method string, body ImageConfig) (string, error) {
	// stringify
	jsonBody, err := json.Marshal(body)
	if err != nil {
		return "", err
	}
	url := fmt.Sprintf("%s/sdapi/v1/%s", HOST, method)
	// sends request
	var resp *http.Response
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
