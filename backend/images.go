// auth endpoints
package main

import (
	"encoding/json"
	"net/http"
)

type Model struct {
	ID        int    `json:"id"`
	Name      string `json:"model_name"`
	File      string `json:"filename"`
	ModelType string `json:"model_type"`
}
type Lora struct {
	ID        int    `json:"id"`
	ModelType string `json:"model_type"`
	Name      string `json:"lora_name"`
	File      string `json:"filename"`
}
type Control struct {
	ID        int    `json:"id"`
	Name      string `json:"control_name"`
	ModelType string `json:"model_type"`
	File      string `json:"file"`
}
type Sampler struct {
	ID   int    `json:"id"`
	Name string `json:"sampler_name"`
}
type Refiner struct {
	ID        int    `json:"id"`
	Name      string `json:"refiner_name"`
	ModelType string `json:"model_type"`
	File      string `json:"filename"`
}
type SeedMode struct {
	ID   int    `json:"id"`
	Name string `json:"seed_mode_name"`
}
type Upscaler struct {
	ID   int    `json:"id"`
	Name string `json:"upscaler_name"`
}

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
