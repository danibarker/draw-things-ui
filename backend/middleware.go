package main

import (
	"context"
	"fmt"
	"net/http"
)

type ContextKey int

const (
	UserKey ContextKey = iota
)

// type Roles struct {
// 	Admin string
// 	User  string
// }

const (
	AdminRole = 0
	UserRole  = 7
	GuestRole = 9
)

// is authenticated middleware
func IsAuthenticated(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// get session from session cookie
		cookie, err := r.Cookie("session")
		if err != nil {
			http.Error(w, "no session cookie", http.StatusUnauthorized)
			return
		}
		authHeader := cookie.Value

		fmt.Println("authHeader", authHeader)
		if authHeader == "" {
			http.Error(w, "no authorization header", http.StatusUnauthorized)
			return
		}
		// get session from sessions in db
		result, err := db.Query("SELECT user_id FROM sessions WHERE session_token = ?", authHeader)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer result.Close()
		var userID int
		if result.Next() {
			err = result.Scan(&userID)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "no session found", http.StatusUnauthorized)
			return
		}
		// get user from db
		user := User{}
		err = db.QueryRow("SELECT id, username FROM users WHERE id = ?", userID).Scan(&user.ID, &user.Username)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		// set user in context
		ctx := context.WithValue(r.Context(), UserKey, &user)

		next(w, r.WithContext(ctx))

	}
}

// is admin middleware
func IsAdmin(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// get session from cookie
		cookie, err := r.Cookie("session")
		if err != nil {
			http.Error(w, "no session cookie", http.StatusUnauthorized)
			return
		}
		authHeader := cookie.Value

		if authHeader == "" {
			http.Error(w, "no authorization header", http.StatusUnauthorized)
			return
		}

		// get session from sessions in db
		result, err := db.Query("SELECT user_id FROM sessions WHERE session_token = ?", authHeader)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer result.Close()

		var userID int
		if result.Next() {
			err = result.Scan(&userID)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "no session found", http.StatusUnauthorized)
			return
		}

		// get user from db
		user := User{}
		var role int
		err = db.QueryRow(`
		SELECT u.id, u.username, r.level FROM users u
		inner join user_roles ur on u.id = ur.user_id
		inner join roles r on ur.role_id = r.id
		WHERE u.id = ?
		`, userID).Scan(&user.ID, &user.Username, &role)
		fmt.Println("role", role, "user", user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if role != AdminRole {
			http.Error(w, "not an admin", http.StatusUnauthorized)
			return
		}

		// set user in context
		ctx := context.WithValue(r.Context(), UserKey, &user)

		next(w, r.WithContext(ctx))

	}
}
