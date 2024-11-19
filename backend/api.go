package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var apiMux *http.ServeMux

func setupApi() {
	setupAuth()
	setupImages()
	apiMux = http.NewServeMux()
	apiMux.HandleFunc("/loras", HandleLoras)
	apiMux.Handle("/auth/", http.StripPrefix("/auth", authMux))
	apiMux.Handle("/images/", http.StripPrefix("/images", imagesMux))
}

func HandleApi(w http.ResponseWriter, r *http.Request) {

	fmt.Println("handling /api", r.URL.Path)

}

func HandleLoras(w http.ResponseWriter, r *http.Request) {

	body := struct {
		Input string `json:"input"`
	}{}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if body.Input == config.Password {

		w.Write([]byte(config.ExtraLoras))
	} else {

		http.Error(w, "invalid input", http.StatusInternalServerError)
	}
}
