package main

import (
	"errors"
	"fmt"
	"net/http"
	"os"
)

var apiMux *http.ServeMux
var err error

func main() {
	setupApi()
	http.Handle("/api/", http.StripPrefix("/api", apiMux))

	http.HandleFunc("/assets", func(w http.ResponseWriter, r *http.Request) {
		http.FileServer(http.Dir("./dist/assets")).ServeHTTP(w, r)
	})
	http.HandleFunc("/", serveFrontend)
	fmt.Printf("listening on port 3334\n")
	err = http.ListenAndServe(":3334", nil)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error starting server: %s\n", err)
		os.Exit(1)
	} else {
		fmt.Printf("server started on port 3333\n")
	}

}

func serveFrontend(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("serving frontend\n")

	http.FileServer(http.Dir("./dist")).ServeHTTP(w, r)
}

func setupApi() {
	apiMux = http.NewServeMux()
	apiMux.HandleFunc("/check", checkStatus)
	apiMux.HandleFunc("/open", openDrawThings)
}
