package control

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	"github.com/go-vgo/robotgo"
)

func listWindows() map[string][]int {
	pids, err := robotgo.Pids()
	if err != nil {
		fmt.Println("Error retrieving PIDs:", err)
		return nil
	}
	var windowPIDs []int
	for _, pid := range pids {
		name, err := robotgo.FindName(pid)
		if err == nil && name != "" {
			windowPIDs = append(windowPIDs, pid)
		}
	}
	windowMap := make(map[string][]int)
	for _, pid := range windowPIDs {
		name, _ := robotgo.FindName(pid)
		windowMap[name] = append(windowMap[name], pid)
	}
	return windowMap
}
func makeWindowActive(pid int) error {
	return robotgo.ActivePid(pid)
}

func ensureScreenshotsDir() error {
	return os.MkdirAll("screenshots", 0755)
}

func getScreenshot(filepath string) error {
	cmd := exec.Command("screencapture", "-x", filepath)
	return cmd.Run()
}

func cleanupOldScreenshots() {
	files, err := filepath.Glob("screenshots/screenshot_*.png")
	if err != nil {
		return
	}

	// remove files older than 5 minutes, by the filename timestamp
	cutoff := time.Now().Add(-5 * time.Minute)
	var oldFiles []string
	for _, file := range files {
		base := filepath.Base(file)
		timestampStr := base[len("screenshot_") : len(base)-len(".png")]
		// Use time.Local so the filename is compared correctly against time.Now()
		timestamp, err := time.ParseInLocation("20060102_150405", timestampStr, time.Local)
		if err == nil && timestamp.Before(cutoff) {
			oldFiles = append(oldFiles, file)
		}
	}

	// Delete old files
	for _, file := range oldFiles {
		os.Remove(file)
	}
}

func click(x, y int, button string, double bool) {
	robotgo.MoveClick(x, y, button, double)
}

func typeText(text string) {
	robotgo.Type(text)
}

func keyTap(key string) {
	robotgo.KeyTap(key)
}
func getMouseLocation() (int, int) {
	return robotgo.Location()
}

func scrollMouse(x int, dir string) {
	robotgo.ScrollDir(x, dir)
}

func sendAlert(message string) {
	robotgo.Alert("Alert", message, "ok", "no")
}

func closeWindow() {
	robotgo.CloseWindow()
}

func getWindowSize() (int, int) {
	width, height := robotgo.GetScreenSize()
	return width, height
}

func mouseDown() {
	robotgo.MouseDown()
}

func move(x, y int) {
	robotgo.Move(x, y)
}
func mouseUp() {
	robotgo.MouseUp()
}

func main() {
	// Ensure screenshots directory exists
	if err := ensureScreenshotsDir(); err != nil {
		fmt.Println("Error creating screenshots directory:", err)
		return
	}

	http.HandleFunc("/screenshot", func(w http.ResponseWriter, r *http.Request) {
		// Use consistent timestamp for both operations
		timestamp := time.Now().Format("20060102_150405")
		filePath := filepath.Join("screenshots", fmt.Sprintf("screenshot_%s.png", timestamp))

		// 1. Capture the screenshot as usual
		if err := getScreenshot(filePath); err != nil {
			http.Error(w, "Capture failed", 500)
			return
		}

		// 2. The "Fix": Wait for the file to actually land on the disk
		for i := 0; i < 10; i++ {
			info, err := os.Stat(filePath)
			if err == nil && info.Size() > 0 {
				break // The file is ready!
			}
			time.Sleep(50 * time.Millisecond) // Wait 0.05s and try again
		}

		go cleanupOldScreenshots()
		// Serve the image
		w.Header().Set("Content-Type", "image/png")
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		// 3. Now serve it
		http.ServeFile(w, r, filePath)

	})

	http.HandleFunc("/click", func(w http.ResponseWriter, r *http.Request) {
		xString := r.URL.Query().Get("x")
		yString := r.URL.Query().Get("y")
		button := r.URL.Query().Get("button")
		double := r.URL.Query().Get("double") == "true"
		var x, y int
		fmt.Sscanf(xString, "%d", &x)
		fmt.Sscanf(yString, "%d", &y)
		click(x, y, button, double)
		fmt.Fprintf(w, "Clicked at (%d, %d) with button %s", x, y, button)
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/mousemove", func(w http.ResponseWriter, r *http.Request) {
		xString := r.URL.Query().Get("x")
		yString := r.URL.Query().Get("y")
		var x, y int
		fmt.Sscanf(xString, "%d", &x)
		fmt.Sscanf(yString, "%d", &y)
		move(x, y)
		fmt.Fprintf(w, "Moved mouse to (%d, %d)", x, y)
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/getmouse", func(w http.ResponseWriter, r *http.Request) {
		x, y := getMouseLocation()
		fmt.Fprintf(w, "Mouse location: (%d, %d)", x, y)
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/listwindows", func(w http.ResponseWriter, r *http.Request) {
		windows := listWindows()
		for name, pids := range windows {
			fmt.Fprintf(w, "Window: %s, PIDs: %v\n", name, pids)
		}
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/closewindow", func(w http.ResponseWriter, r *http.Request) {
		closeWindow()
		fmt.Fprintf(w, "Closed active window")
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/windowsize", func(w http.ResponseWriter, r *http.Request) {
		width, height := getWindowSize()
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]int{"width": width, "height": height})
	})

	http.HandleFunc("/alert", func(w http.ResponseWriter, r *http.Request) {
		message := r.URL.Query().Get("message")
		sendAlert(message)
		fmt.Fprintf(w, "Sent alert with message: %s", message)
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/typedtext", func(w http.ResponseWriter, r *http.Request) {
		text := r.URL.Query().Get("text")
		typeText(text)
		fmt.Fprintf(w, "Typed text: %s", text)
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/keytap", func(w http.ResponseWriter, r *http.Request) {
		key := r.URL.Query().Get("key")
		keyTap(key)
		fmt.Fprintf(w, "Tapped key: %s", key)
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/mousedown", func(w http.ResponseWriter, r *http.Request) {
		mouseDown()
		fmt.Fprintf(w, "Mouse button down")
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/mouseup", func(w http.ResponseWriter, r *http.Request) {
		mouseUp()
		fmt.Fprintf(w, "Mouse button up")
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/scroll", func(w http.ResponseWriter, r *http.Request) {
		xString := r.URL.Query().Get("x")
		dirString := r.URL.Query().Get("dir")
		var x int
		fmt.Sscanf(xString, "%d", &x)

		scrollMouse(x, dirString)
		fmt.Fprintf(w, "Scrolled mouse by (%d, %s)", x, dirString)
		w.WriteHeader(http.StatusOK)
	})

	http.HandleFunc("/activatewindow", func(w http.ResponseWriter, r *http.Request) {
		pidString := r.URL.Query().Get("pid")
		var pid int
		fmt.Sscanf(pidString, "%d", &pid)
		err := makeWindowActive(pid)
		if err != nil {
			fmt.Fprintf(w, "Error activating window with PID %d: %v", pid, err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, "Activated window with PID %d", pid)
		w.WriteHeader(http.StatusOK)
	})

	// serve frontend/dist/index.html React app
	http.Handle("/", http.FileServer(http.Dir("./frontend/dist")))

	fmt.Println("Starting server on :8780")
	if err := http.ListenAndServe(":8780", nil); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
