package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"sync"

	"golang.org/x/net/websocket"
)

type Config struct {
	HOST string
}
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

// var config = Config{
// 	HOST: "https://drawthings.danibarker.ca",
// }

var (
	imageRequestQueue  []ImageConfig
	imageResponseQueue []string
	queueMutex         sync.Mutex
	serviceBusy        bool
)

func handleWebSocket(ws *websocket.Conn) {
	fmt.Printf("new websocket connection\n")
	config := Config{
		HOST: "http://localhost:7776",
	}

	for {
		var imgConfig ImageConfig
		var message string
		if err := websocket.Message.Receive(ws, &message); err != nil {
			fmt.Printf("error receiving message: %s\n", err)
			break
		}
		fmt.Printf("Received raw message: %s\n", message)
		// Unmarshal the JSON message into ImageConfig
		if err := json.Unmarshal([]byte(message), &imgConfig); err != nil {
			fmt.Printf("error unmarshaling message: %s\n", err)
			break
		}
		fmt.Printf("Unmarshaled ImageConfig: %+v\n", imgConfig)

		queueMutex.Lock()

		fmt.Println("queueMutex locked")
		imageRequestQueue = append(imageRequestQueue, imgConfig)
		fmt.Printf("serviceBusy: %t\n%v", serviceBusy, imageRequestQueue)
		queueMutex.Unlock()
		if !serviceBusy {
			fmt.Println("service not busy")
			go processQueue(config, ws)
			fmt.Println("processQueue called")
		}
		fmt.Println("queueMutex unlocking")
		fmt.Printf("lock released\n")
		//resp, err := handleImageRequest(config, "image", imgConfig)

		// if err := websocket.Message.Send(ws, string(body)); err != nil {
		// 	fmt.Printf("error sending message: %s\n", err)
		// 	break
		// }
	}
	fmt.Printf("closing websocket connection\n")
}

func processQueue(config Config, ws *websocket.Conn) {
	fmt.Println("processQueue called")
	for {
		fmt.Println("for loop")
		queueMutex.Lock()
		// defer queueMutex.Unlock()
		fmt.Printf("len(imageRequestQueue): %d\n", len(imageRequestQueue))
		if len(imageRequestQueue) == 0 {
			serviceBusy = false
			queueMutex.Unlock()
			return
		}

		imgConfig := imageRequestQueue[0]
		imageRequestQueue = imageRequestQueue[1:]
		serviceBusy = true
		queueMutex.Unlock()
		fmt.Println("serviceBusy: ", serviceBusy)
		resp, err := handleImageRequest(config, "txt2img", imgConfig)
		if err != nil {
			fmt.Println("Failed to handle image request:", err)
			continue
		}
		fmt.Println("response received")
		body, err := io.ReadAll(resp.Body)
		fmt.Println("body read")
		defer resp.Body.Close()
		if err != nil {
			fmt.Println("Failed to read the response body:", err)
			continue
		}

		fmt.Printf("Response: %s\n", body)
		var imageResponse ImageResponse
		if err := json.Unmarshal(body, &imageResponse); err != nil {
			fmt.Println("Failed unmarshalling response body:", err)
			continue
		}
		fmt.Println("Unmarshalled response")
		// substring of the 0th element of the Images array, only first 20 chars
		if len(imageResponse.Images) > 0 {
			fmt.Printf("imageResponse: %+v\n", imageResponse.Images[0][:20])
			imageResponseQueue = append(imageResponseQueue, imageResponse.Images[0])
			fmt.Printf("imageResponseQueue: %+v\n", len(imageResponseQueue))
			if len(imageResponseQueue) > 0 {
				fmt.Printf("sending response to client\n")
				// queueMutex.Lock()
				// defer queueMutex.Unlock()
				imageResponse := imageResponseQueue[0]
				imageResponseQueue = imageResponseQueue[1:]

				// Send the response to the client
				if err := websocket.Message.Send(ws, imageResponse); err != nil {
					fmt.Printf("error sending message: %s\n", err)
					break
				}
				fmt.Printf("finished sending response to client\n")
				continue
			} else {
				fmt.Printf("no response to send to client\n")
			}
		} else {
			fmt.Printf("no images in response\n")
		}
	}
}
func handleImageRequest(config Config, method string, body ImageConfig) (*http.Response, error) {
	jsonBody, err := json.Marshal(body)
	fmt.Printf("jsonBody: %s\n", jsonBody)
	if err != nil {
		return nil, err
	}
	url := fmt.Sprintf("%s/sdapi/v1/%s", config.HOST, method)
	resp, err := http.Post(
		url, "application/json", bytes.NewReader(jsonBody))
	if err != nil {
		fmt.Printf("error sending request to /api: %s\n", err)

		return nil, err
	}

	return resp, nil
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
