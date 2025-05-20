package main

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"time"
)

var apiMux *http.ServeMux
var authMux *http.ServeMux

func serveFrontend(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("serving frontend\n")
	http.ServeFile(w, r, "public/index.html")
}
func main() {
	numbers := []uint64{}
	var count uint64 = 0
	for {
		numbers = append(numbers, count)
		count++
		if count%2 == 4 {
			break
		}
		if count%uint64(1e5) == 0 {
			fmt.Printf("count: %d\n", count)
		}
	}
	fmt.Printf("numbers: %v\n", numbers)
	apiMux = http.NewServeMux()
	authMux = http.NewServeMux()

	http.HandleFunc("/", serveFrontend)
	http.HandleFunc("/assets/", func(w http.ResponseWriter, r *http.Request) {
		http.FileServer(http.Dir("./public")).ServeHTTP(w, r)
	})
	http.Handle("/api/", http.StripPrefix("/api", apiMux))
	apiMux.Handle("/auth/", http.StripPrefix("/auth", authMux))
	authMux.HandleFunc("/login", Login)
	fmt.Printf("server started on port 3333\n")
	err := http.ListenAndServe(":3333", nil)

	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error starting server: %s\n", err)
		os.Exit(1)
	}

}

func Login(w http.ResponseWriter, r *http.Request) {
	fmt.Println("login")

	http.SetCookie(w, &http.Cookie{
		Name:     "session",
		Value:    string("sessionToken"),
		Path:     "/",
		Expires:  time.Now().Add(1000000 * time.Hour),
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
	})

}
