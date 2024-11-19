package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
)

var imagesMux *http.ServeMux

func setupImages() {
	imagesMux = http.NewServeMux()
	imagesMux.HandleFunc("/models", Models)
	imagesMux.HandleFunc("/loras", Loras)
	imagesMux.HandleFunc("/controls", Controls)
	imagesMux.HandleFunc("/samplers", Samplers)
	imagesMux.HandleFunc("/refiners", Refiners)
	imagesMux.HandleFunc("/seedmodes", SeedModes)
	imagesMux.HandleFunc("/upscalers", Upscalers)
	imagesMux.HandleFunc("/byfilename", IsAuthenticated(Image))
	imagesMux.HandleFunc("/save", IsAuthenticated(SaveImage))
	imagesMux.HandleFunc("/search", IsAuthenticated(FindImagesPaged))
	imagesMux.HandleFunc("/saved", IsAuthenticated(SavedImage))
	imagesMux.HandleFunc("/paged", IsAuthenticated(ImagesPaged))
	imagesMux.HandleFunc("/unsaved", IsAuthenticated(UnsavedPaged))
	imagesMux.HandleFunc("/delete", IsAuthenticated(DeleteImage))

}

func Models(w http.ResponseWriter, r *http.Request) {
	var models []Model

	rows, err := db.Query("SELECT * FROM models")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var model Model
		err = rows.Scan(&model.ID, &model.Name, &model.File, &model.ModelType)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		models = append(models, model)
	}
	err = rows.Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(models)

}

func Loras(w http.ResponseWriter, r *http.Request) {
	var loras []Lora

	rows, err := db.Query("SELECT * FROM loras")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var lora Lora
		err = rows.Scan(&lora.ID, &lora.ModelType, &lora.Name, &lora.File)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		loras = append(loras, lora)
	}
	err = rows.Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(loras)

}

func Controls(w http.ResponseWriter, r *http.Request) {
	var controls []Control

	rows, err := db.Query("SELECT * FROM controls")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var control Control
		err = rows.Scan(&control.ID, &control.Name, &control.ModelType, &control.File)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		controls = append(controls, control)
	}
	err = rows.Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(controls)

}

func Samplers(w http.ResponseWriter, r *http.Request) {
	var samplers []Sampler

	rows, err := db.Query("SELECT * FROM samplers")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var sampler Sampler
		err = rows.Scan(&sampler.ID, &sampler.Name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		samplers = append(samplers, sampler)
	}
	err = rows.Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(samplers)

}

func Refiners(w http.ResponseWriter, r *http.Request) {
	var refiners []Refiner

	rows, err := db.Query("SELECT * FROM refiners")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var refiner Refiner
		err = rows.Scan(&refiner.ID, &refiner.Name, &refiner.ModelType, &refiner.File)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		refiners = append(refiners, refiner)
	}
	err = rows.Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(refiners)

}

func SeedModes(w http.ResponseWriter, r *http.Request) {
	var seedModes []SeedMode

	rows, err := db.Query("SELECT * FROM seed_modes")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var seedMode SeedMode
		err = rows.Scan(&seedMode.ID, &seedMode.Name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		seedModes = append(seedModes, seedMode)
	}
	err = rows.Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(seedModes)

}

func Upscalers(w http.ResponseWriter, r *http.Request) {
	var upscalers []Upscaler

	rows, err := db.Query("SELECT * FROM upscalers")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var upscaler Upscaler
		err = rows.Scan(&upscaler.ID, &upscaler.Name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		upscalers = append(upscalers, upscaler)
	}
	err = rows.Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(upscalers)

}

func Image(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Image function")
	user := r.Context().Value(UserKey).(*User)

	filename := r.URL.Query().Get("filename")
	if filename == "" {
		http.Error(w, "filename required", http.StatusBadRequest)
		return
	}

	http.ServeFile(w, r, fmt.Sprintf("private/assets/images/%s/%s", user.Username, filename))
}

func SaveImage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("SaveImage")
	user := r.Context().Value(UserKey).(*User)

	var body struct {
		Filename string `json:"filename"`
		Savename string `json:"savename"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		fmt.Println(err)
		return
	}
	if body.Filename == "" || body.Savename == "" {
		http.Error(w, "filename and savename required", http.StatusBadRequest)
		fmt.Println("filename and savename required")
		return
	}

	if _, err := os.Stat(fmt.Sprintf("private/assets/images/%s/saved", user.Username)); os.IsNotExist(err) {
		if err = os.MkdirAll(fmt.Sprintf("private/assets/images/%s/saved", user.Username), 0755); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			fmt.Println(err)
			return
		}
	}

	if err := os.Rename(fmt.Sprintf("private/assets/images/%s/%s.png", user.Username, body.Filename), fmt.Sprintf("private/assets/images/%s/saved/%s.png", user.Username, body.Savename)); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		fmt.Println(err)
		return
	}

	w.WriteHeader(http.StatusOK)

}

func ImagesPaged(w http.ResponseWriter, r *http.Request) {
	fmt.Println("ImagesPaged")
	user := r.Context().Value(UserKey).(*User)

	page := r.URL.Query().Get("page")
	if page == "" {
		page = "1"
	}
	pageNum, err := strconv.Atoi(page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	files, err := os.ReadDir(fmt.Sprintf("private/images/%s/saved", user.Username))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var images []string
	for i, file := range files {
		if i >= 10*(pageNum-1) && i < 10*pageNum {
			filename := file.Name()

			images = append(images, filename)
		} else if i >= 10*pageNum {
			break
		} else {
			continue
		}
	}
	json.NewEncoder(w).Encode(images)

}

func SavedImage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("SavedImage")
	user := r.Context().Value(UserKey).(*User)

	filename := r.URL.Query().Get("filename")
	if filename == "" {
		http.Error(w, "filename required", http.StatusBadRequest)
		return
	}

	http.ServeFile(w, r, fmt.Sprintf("private/assets/images/%s/saved/%s", user.Username, filename))
}

func FindImagesPaged(w http.ResponseWriter, r *http.Request) {
	fmt.Println("FindImagesPaged")
	user := r.Context().Value(UserKey).(*User)
	query := r.URL.Query().Get("query")

	page := r.URL.Query().Get("page")
	if page == "" {
		page = "1"
	}
	pageNum, err := strconv.Atoi(page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	files, err := os.ReadDir(fmt.Sprintf("private/assets/images/%s/saved", user.Username))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	images := []string{}
	skippedCount := 0

	for _, file := range files {
		if query == "" || strings.Contains(file.Name(), query) {
			if skippedCount < 10*(pageNum-1) {
				skippedCount++
				continue
			}
			if len(images) >= 10 {
				break
			}
			images = append(images, file.Name()[0:len(file.Name())-4])
		}
		fmt.Println("images", images)
	}
	json.NewEncoder(w).Encode(images)

}

func UnsavedPaged(w http.ResponseWriter, r *http.Request) {
	fmt.Println("UnsavedPaged")
	user := r.Context().Value(UserKey).(*User)
	page := r.URL.Query().Get("page")
	if page == "" {
		page = "1"
	}
	// convert page to int, get 10 images starting from 9*(pageNum-1) to 9*(pageNum-1)+9
	pageNum, err := strconv.Atoi(page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	files, err := os.ReadDir(fmt.Sprintf("private/assets/images/%s", user.Username))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	images := []string{}
	for i, file := range files {
		if i < 9*(pageNum-1) || file.Name() == "saved" {
			continue
		}
		if i >= 9*pageNum {
			break
		}
		images = append(images, file.Name()[0:len(file.Name())-4])
	}

	json.NewEncoder(w).Encode(images)

}

func DeleteImage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DeleteImage")
	user := r.Context().Value(UserKey).(*User)

	// get filename and saved property from body
	var body struct {
		Filename string `json:"filename"`
		Saved    bool   `json:"saved"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if body.Filename == "" {
		http.Error(w, "filename required", http.StatusBadRequest)
		return
	}

	// filePath == private/assets/images/username/{saved/}filename.png
	var filePath string
	if body.Saved {
		filePath = fmt.Sprintf("private/assets/images/%s/saved/%s.png", user.Username, body.Filename)
	} else {
		filePath = fmt.Sprintf("private/assets/images/%s/%s.png", user.Username, body.Filename)
	}
	if err := os.Remove(filePath); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)

}
