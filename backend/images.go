// auth endpoints
package main

import (
	"net/http"
)

var imagesMux *http.ServeMux

func setupImages() {
	imagesMux = http.NewServeMux()
	imagesMux.HandleFunc("/login", Login)
	imagesMux.HandleFunc("/logout", Logout)
	imagesMux.HandleFunc("/register", Register)
	imagesMux.HandleFunc("/current_user", GetCurrentUser)
}
