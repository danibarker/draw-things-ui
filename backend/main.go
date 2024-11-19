package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"sync"

	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/net/websocket"
)

var (
	config               AppConfig               // Config struct
	db                   *sql.DB                 // SQLite3 database
	clientQueue          []*websocket.Conn       // Queue of clients waiting for image responses
	queueMutex           sync.Mutex              // Mutex for the image request queue
	imageRequestList     []int                   = make([]int, 0)
	userIdToSocketMap    map[int]*websocket.Conn = make(map[int]*websocket.Conn)
	userIdToImageRequest map[int][]ImageRequest  = make(map[int][]ImageRequest)
	busy                 bool                    = false
	HOST                 string                  = "http://localhost:7775"
	Id                   string
)

func serveFrontend(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("serving frontend\n")

	http.ServeFile(w, r, "public/index.html")
}

func main() {

	if _, err := os.Stat("public/assets/images"); os.IsNotExist(err) {
		if err = os.MkdirAll("public/assets/images", 0755); err != nil {
			fmt.Printf("error creating images folder: %s\n", err)
			panic(err)
		}
	}
	setupApi()

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
