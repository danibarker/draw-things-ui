package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"sync"

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
		var imgConfig ImageConfig
		var message string
		if err := websocket.Message.Receive(ws, &message); err != nil {

			fmt.Printf("error receiving message: %s\n", err)
			break
		}
		fmt.Printf("received message: %s\n", message)
		if err := json.Unmarshal([]byte(message), &imgConfig); err != nil {
			fmt.Printf("error unmarshaling message: %s\n", err)
			continue
		}

		queueMutex.Lock()
		// Add the client to the queue
		clientQueue = append(clientQueue, ws)
		// Add the request to the map
		imageRequestMap[ws] = append(imageRequestMap[ws], imgConfig)
		queueMutex.Unlock()

		// If the service is not busy, process the queue
		if !serviceBusy {
			go processQueue()
		}

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

		// Send the image to the client
		if err := websocket.Message.Send(client, image); err != nil {
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

	http.Handle("/ws", websocket.Handler(handleWebSocket))
	http.HandleFunc("/", serveFrontend)
	err := http.ListenAndServe(":3333", nil)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error starting server: %s\n", err)
		os.Exit(1)
	} else {
		fmt.Printf("server started on port 3333\n")
	}
}
