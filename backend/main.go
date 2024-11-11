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

type Lora struct {
	File   string  `json:"file"`
	Weight float64 `json:"weight"`
}
type Control struct {
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
type InitImagesType struct {
	// init_images is either an array of strings or undefined
	// must handle the undefined case when undefined received in JSON

}
type ImageConfig struct {
	Width         int       `json:"width"`
	Height        int       `json:"height"`
	Prompt        string    `json:"prompt"`
	Steps         int       `json:"steps"`
	Strength      float32   `json:"strength"`
	Model         string    `json:"model"`
	Loras         []Lora    `json:"loras"`
	Controls      []Control `json:"controls"`
	Seed          int64     `json:"seed"`
	GuidanceScale float32   `json:"guidance_scale"`
	Sampler       string    `json:"sampler"`
	// init_images is either an array of strings or undefined
	// must handle the undefined case
	// InitImages []string `json:"init_images,omitempty"`
}

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
	clientQueue     []*websocket.Conn                 // Queue of clients waiting for image responses
	queueMutex      sync.Mutex                        // Mutex for the image request queue
	serviceBusy     bool                              // Flag to indicate if the service is busy processing requests
	imageRequestMap map[*websocket.Conn][]ImageConfig = make(map[*websocket.Conn][]ImageConfig)
	HOST            string                            = "http://localhost:7776"
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
		queueMutex.Lock()
		if len(clientQueue) == 0 {
			serviceBusy = false
			queueMutex.Unlock()
			return
		}
		serviceBusy = true
		// Get the first client in the queue
		client := clientQueue[0]
		clientQueue = clientQueue[1:]
		// Get the first image request for the client
		imgConfig := imageRequestMap[client][0]
		imageRequestMap[client] = imageRequestMap[client][1:]
		queueMutex.Unlock()

		// Send the image request to the service
		image, err := handleImageRequest("txt2img", imgConfig)
		if err != nil {
			fmt.Printf("error handling image request: %s\n", err)
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
		jsonMessage, err := json.Marshal(messageToSend)
		if err != nil {
			fmt.Printf("error marshalling message: %s\n", err)
			continue
		}
		fmt.Printf("sending image to client\n%s\n", jsonMessage)
		// Send the image to the client
		if err := websocket.Message.Send(client, jsonMessage); err != nil {
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
	resp, err := http.Post(
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
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return "", err
	}
	if len(response.Images) == 0 {
		return "", errors.New("no images in response")
	}
	return response.Images[0], nil
}

func serveFrontend(w http.ResponseWriter, r *http.Request) {
	// serve frontend/dist/index.html
	http.FileServer(http.Dir("./dist")).ServeHTTP(w, r)
}
func main() {
	// sqlite3
	const create string = `
  CREATE TABLE IF NOT EXISTS activities (
  id INTEGER NOT NULL PRIMARY KEY,
  time DATETIME NOT NULL,
  description TEXT
  );`
	const file string = "activities.db"
	db, err := sql.Open("sqlite3", file)
	if err != nil {
		fmt.Printf("error opening sqlite3: %s\n", err)
		panic(err)
	}

	if _, err3 := db.Exec(create); err3 != nil {
		fmt.Printf("error creating table: %s\n", err3)
		panic(err3)
	}

	fmt.Printf("connected to sqlite3\n")
	fmt.Printf("creating table\n")
	fmt.Printf("listening on port 3333\n")

	db.Exec("INSERT INTO activities (time, description) VALUES (datetime('now'), 'server started')")

	rows, err := db.Query("SELECT * FROM activities")
	if err != nil {
		fmt.Printf("error querying table: %s\n", err)
	}
	for rows.Next() {
		var id int
		var time string
		var description string
		if err := rows.Scan(&id, &time, &description); err != nil {
			fmt.Printf("error scanning row: %s\n", err)
		}
		fmt.Printf("id: %d, time: %s, description: %s\n", id, time, description)
	}
	rows.Close()
	db.Close()

	http.Handle("/ws", websocket.Handler(handleWebSocket))
	http.HandleFunc("/api/loras", func(w http.ResponseWriter, r *http.Request) {
		// get input from request body
		body := struct {
			Input string `json:"input"`
		}{}
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// check if input === 'macbookmsglimespeakermousebrushvape'
		if body.Input == "don't steal please" {
			// return "success" if true
			w.Write([]byte("success"))
		} else {
			// send 500 error if false
			http.Error(w, "invalid input", http.StatusInternalServerError)
		}
	})

	http.HandleFunc("/", serveFrontend)
	err2 := http.ListenAndServe(":3333", nil)
	if errors.Is(err2, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err2 != nil {
		fmt.Printf("error starting server: %s\n", err2)
		os.Exit(1)
	} else {
		fmt.Printf("server started on port 3333\n")
	}
}
