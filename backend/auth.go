package main

import (
	"crypto/md5"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

var authMux *http.ServeMux

func setupAuth() {
	authMux = http.NewServeMux()
	authMux.HandleFunc("/login", Login)
	authMux.HandleFunc("/logout", Logout)
	authMux.HandleFunc("/register", Register)
	authMux.HandleFunc("/current_user", IsAuthenticated(GetCurrentUser))

}

func GenerateToken(input string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(input), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Hash to store:", string(hash))

	hasher := md5.New()
	hasher.Write(hash)
	return hex.EncodeToString(hasher.Sum(nil))
}

func HashPassword(password string) ([]byte, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return hashed, nil
}

func Login(w http.ResponseWriter, r *http.Request) {
	fmt.Println("login")
	var userAttempt User
	user := User{}

	err := json.NewDecoder(r.Body).Decode(&userAttempt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Println("userAttempt", userAttempt.Username)

	err = db.QueryRow("SELECT id, username, hashed_password FROM users WHERE username = ?", userAttempt.Username).Scan(&user.ID, &userAttempt.Username, &user.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println("user", user)

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userAttempt.Password))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	sessionToken := GenerateToken(userAttempt.Username)

	_, err = db.Exec("INSERT INTO sessions (session_token, user_id) VALUES (?, ?)", string(sessionToken), user.ID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:  "session",
		Value: string(sessionToken),
		Path:  "/",
	})

	userAttempt.Password = ""
	json.NewEncoder(w).Encode(userAttempt)

}

func Logout(w http.ResponseWriter, r *http.Request) {

	_, err := db.Exec("DELETE FROM sessions WHERE session_token = ?", r.Header.Get("Authorization"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:   "session",
		MaxAge: -1,
	})

	w.Write([]byte("success"))

}

func Register(w http.ResponseWriter, r *http.Request) {
	var user User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var hashed []byte
	hashed, err = HashPassword(user.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	user.Password = string(hashed)

	var result sql.Result

	result, err = db.Exec("INSERT INTO users (username, hashed_password) VALUES (?, ?)", user.Username, user.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var id int64
	id, err = result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = db.Exec("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)", id, UserRole)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	sessionToken := GenerateToken(user.Username)

	_, err = db.Exec("INSERT INTO sessions (user_id, session_token) VALUES (?, ?)", id, string(sessionToken))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:  "session",
		Value: sessionToken,
		Path:  "/",
	})

	user.Password = ""
	json.NewEncoder(w).Encode(user)

}

func GetCurrentUser(w http.ResponseWriter, r *http.Request) {

	user := r.Context().Value(UserKey).(*User)
	json.NewEncoder(w).Encode(user)
}

func HandleAuth(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handling /auth", r.URL.Path)

}
