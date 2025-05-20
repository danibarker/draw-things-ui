package main

import (
	"encoding/json"
	"net/http"

	"github.com/go-vgo/robotgo"
)

var (
	scrollX = 480
	scrollY = 430
	buttonX = 522
	buttonY = 508
)

func openDrawThings(w http.ResponseWriter, r *http.Request) {

	robotgo.Run("open /Applications/Draw\\ Things.app")
	robotgo.MilliSleep(2000)
	robotgo.MoveRelative(-1000, -1000)
	robotgo.MilliSleep(1000)

	robotgo.Move(scrollX, scrollY)
	robotgo.Click("left")
	robotgo.MilliSleep(1000)
	robotgo.ScrollDir(100000, "down")
	robotgo.Move(buttonX, buttonY)
	robotgo.MilliSleep(1000)
	robotgo.Click("left")
	bit, err := robotgo.CaptureImg(scrollX, scrollY, 100, 100)
	if err != nil {
		println("CaptureImg error")
	}
	robotgo.Save(bit, "drawthings.png", 100)
	// send image to frontend, now
	// ok go
	http.ServeFile(w, r, "drawthings.png")

}

func checkStatus(w http.ResponseWriter, r *http.Request) {
	var windowId int
	robotgo.Run("open /Applications/Draw\\ Things.app")
	robotgo.MilliSleep(2000)
	robotgo.MoveRelative(-1000, -1000)
	robotgo.MilliSleep(1000)

	robotgo.Move(scrollX, scrollY)
	robotgo.Click("left")
	robotgo.MilliSleep(1000)
	robotgo.ScrollDir(100000, "down")
	// set window to top
	ids, err := robotgo.FindIds("drawthings")
	if err != nil || len(ids) == 0 {
		println("window not found")
		// respond with {"status": "closed"}
		response := map[string]string{"status": "closed"}
		json.NewEncoder(w).Encode(response)

	} else {
		windowId = ids[0]
		robotgo.ActivePid(windowId)
		robotgo.MilliSleep(2000)
		// respond with {"status": "open"}
		bit, err := robotgo.CaptureImg(scrollX, scrollY, 100, 100)
		if err != nil {
			println("CaptureImg error")
		}
		robotgo.Save(bit, "drawthings.png", 100)
		// send image to frontend, now
		// ok go
		http.ServeFile(w, r, "drawthings.png")

	}
}
