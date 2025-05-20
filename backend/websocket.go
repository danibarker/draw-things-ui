package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/mitchellh/mapstructure"
	"golang.org/x/net/websocket"
)

func handleWebSocket(ws *websocket.Conn) {
	for {
		var message Message
		if err := websocket.JSON.Receive(ws, &message); err != nil {
			fmt.Printf("error receiving message: %s\n", err)
			break
		}
		fmt.Printf("received message: %s,%s\n", message.Type, message.Cookie)
		user := getUser(message.Cookie)
		if user != nil {
			switch message.Type {
			case "reconnect":
				var complete []string
				userIdToSocketMap[user.ID] = ws
				if userIdToImageRequest[user.ID] != nil {
					for _, imgReq := range userIdToImageRequest[user.ID] {
						if !imgReq.Complete {
							complete = append(complete, imgReq.Filename)
						}
					}
				}
				if err := websocket.JSON.Send(ws, Message{
					Type: "reconnect",
					Data: complete,
				}); err != nil {
					fmt.Printf("error sending message: %s\n", err)
				}
			case "queue":
				handleQueueMessage(ws)
			case "image":
				fmt.Printf("Raw message data: %v\n", message.Data)

				// Temporary map to inspect data
				tempMap := map[string]interface{}{}
				if err := mapstructure.Decode(message.Data, &tempMap); err != nil {
					fmt.Printf("Error decoding to map: %s\n", err)
					continue
				}
				fmt.Printf("Temporary map: %+v\n", tempMap)

				// Decode into ImageConfig
				var imgConfig ImageConfig
				decoder, err := mapstructure.NewDecoder(&mapstructure.DecoderConfig{
					Metadata: nil,
					Result:   &imgConfig,
					TagName:  "json",
				})
				if err != nil {
					fmt.Printf("Error creating decoder: %s\n", err)
					continue
				}
				if err := decoder.Decode(message.Data); err != nil {
					fmt.Printf("Error decoding image config: %s\n", err)
					continue
				}
				fmt.Printf("Decoded ImageConfig: %+v\n", imgConfig)

				newImageRequest := ImageRequest{
					ImageConfig: imgConfig,
					Complete:    false,
					Filename:    "",
					Username:    user.Username,
				}
				userIdToImageRequest[user.ID] = append(userIdToImageRequest[user.ID], newImageRequest)
				imageRequestList = append(imageRequestList, user.ID)
				if !busy {
					go handleImageMessages()
				}
				go handleQueueMessage(ws)
			default:
				fmt.Printf("unknown message type: %s\n", message.Type)
			}
		}
	}
}

func handleImageMessages() {
	for {
		if len(imageRequestList) == 0 {
			busy = false
			return
		}
		queueMutex.Lock()
		userId := imageRequestList[0]
		imageRequestList = imageRequestList[1:]
		queueMutex.Unlock()
		imgRequest := userIdToImageRequest[userId][0]
		userIdToImageRequest[userId] = userIdToImageRequest[userId][1:]
		reqType := "txt2img"
		fmt.Printf("image request: %v\n", imgRequest.ImageConfig)
		fmt.Printf("image request: (%v)\n", imgRequest.ImageConfig.InitImages)
		typeOf := fmt.Sprintf("%T", imgRequest.ImageConfig.InitImages)
		fmt.Printf("type of init images== (%v)\n", typeOf)
		if imgRequest.ImageConfig.InitImages != nil {
			reqType = "img2img"
		}
		jsonBody, err := json.Marshal(imgRequest.ImageConfig)
		if err != nil {
			fmt.Printf("error marshalling image config: %s\n", err)
			continue
		}
		fmt.Printf("jsonBody: %s\n", jsonBody)
		image, err := handleImageRequest(reqType, jsonBody)
		if err != nil {
			fmt.Printf("error handling image request: %s\n", err)
			continue
		}
		currentDateTime := time.Now().String()
		filename := currentDateTime[0:10] + "-" + currentDateTime[11:13] + currentDateTime[14:16]
		var folderPath string
		if imgRequest.Username != "" {

			folderPath = "/assets/images/" + imgRequest.Username + "/"
		} else {
			folderPath = "/assets/images/"
		}

		if _, err = os.Stat("private" + folderPath); os.IsNotExist(err) {
			if err = os.MkdirAll("private"+folderPath, 0755); err != nil {
				fmt.Printf("error creating images folder: %s\n", err)
				continue
			}
		}

		filePath := fmt.Sprintf("%s%s.png", folderPath, filename)
		fmt.Println("just made", filePath, "folderPath", folderPath)

		if err = convertBase64ToPng(image, "private"+filePath); err != nil {
			fmt.Printf("error saving image: %s\n", err)
			continue
		}
		imgRequest.Complete = true
		fmt.Printf("image, %s,%v,%v,%d,%v\n", filePath, imgRequest.Complete, userIdToSocketMap, userId, userIdToSocketMap[userId])
		websoc := userIdToSocketMap[userId]
		if websoc != nil {
			if err = websocket.JSON.Send(websoc, Message{
				Type: "image",
				Data: filename,
			}); err != nil {
				fmt.Printf("error sending message: %s\n", err)
			}

		} else {
			fmt.Printf("no socket for user: %d,%d\n", userId, len(userIdToSocketMap))
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

func convertBase64ToPng(base64String, filePath string) error {
	fmt.Println("converting base64 to png", filePath)

	data, err := base64.StdEncoding.DecodeString(base64String)
	if err != nil {
		fmt.Printf("error decoding base64: %s\n", err)
		return err
	}

	file, err := os.Create(filePath)

	if err != nil {
		return err
	}
	defer file.Close()

	if _, err = file.Write(data); err != nil {
		fmt.Printf("error writing data to file: %s\n", err)
		return err
	}
	return nil
}

func handleImageRequest(method string, jsonBody []byte) (string, error) {

	url := fmt.Sprintf("%s/sdapi/v1/%s", HOST, method)

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

	var response ImageResponse
	if err = json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return "", err
	}
	if len(response.Images) == 0 {
		return "", errors.New("no images in response")
	}
	return response.Images[0], nil
}

func getUser(cookie string) *User {
	rows, err := db.Query("SELECT u.id, u.username FROM sessions s INNER JOIN users u on s.user_id = u.id WHERE session_token = ?", cookie)
	if err != nil {
		fmt.Printf("error querying database: %s\n", err)
		return nil
	}
	defer rows.Close()
	if !rows.Next() {
		return nil
	}
	var user User
	if err = rows.Scan(&user.ID, &user.Username); err != nil {
		fmt.Printf("error scanning rows: %s\n", err)
		return nil
	}
	return &user
}
