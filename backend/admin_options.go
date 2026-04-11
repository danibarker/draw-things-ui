package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

type optionConfig struct {
	Table   string
	Columns []string
}

var optionConfigs = map[string]optionConfig{
	"models":     {Table: "models", Columns: []string{"model_name", "model_type", "filename"}},
	"loras":      {Table: "loras", Columns: []string{"lora_name", "model_type", "filename"}},
	"controls":   {Table: "controls", Columns: []string{"control_name", "model_type", "file"}},
	"refiners":   {Table: "refiners", Columns: []string{"refiner_name", "model_type", "filename"}},
	"samplers":   {Table: "samplers", Columns: []string{"sampler_name"}},
	"seed-modes": {Table: "seed_modes", Columns: []string{"seed_mode_name"}},
	"upscalers":  {Table: "upscalers", Columns: []string{"upscaler_name"}},
}

func AdminOptionTypes(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	names := make([]string, 0, len(optionConfigs))
	for name := range optionConfigs {
		names = append(names, name)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(names)
}

func AdminOptionsHandler(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/admin/options/")
	parts := strings.Split(strings.Trim(path, "/"), "/")
	if len(parts) == 0 || parts[0] == "" {
		http.Error(w, "option type required", http.StatusBadRequest)
		return
	}

	optionType := parts[0]
	config, ok := optionConfigs[optionType]
	if !ok {
		http.Error(w, "unknown option type", http.StatusNotFound)
		return
	}

	if len(parts) == 1 {
		switch r.Method {
		case http.MethodGet:
			listOptionRows(w, config)
		case http.MethodPost:
			insertOptionRow(w, r, config)
		default:
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		}
		return
	}

	if len(parts) == 2 {
		id, err := strconv.Atoi(parts[1])
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}

		switch r.Method {
		case http.MethodPut:
			updateOptionRow(w, r, config, id)
		case http.MethodDelete:
			deleteOptionRow(w, config, id)
		default:
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		}
		return
	}

	http.Error(w, "invalid path", http.StatusBadRequest)
}

func listOptionRows(w http.ResponseWriter, config optionConfig) {
	selectCols := append([]string{"id"}, config.Columns...)
	query := fmt.Sprintf("SELECT %s FROM %s ORDER BY id ASC", strings.Join(selectCols, ", "), config.Table)

	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	results := make([]map[string]any, 0)
	for rows.Next() {
		resultRow := make(map[string]any, len(selectCols))
		scanTargets := make([]any, len(selectCols))
		scanPtrs := make([]any, len(selectCols))
		for i := range selectCols {
			scanPtrs[i] = &scanTargets[i]
		}

		if err := rows.Scan(scanPtrs...); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		for i, col := range selectCols {
			resultRow[col] = normalizeSQLValue(scanTargets[i])
		}
		results = append(results, resultRow)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

func insertOptionRow(w http.ResponseWriter, r *http.Request, config optionConfig) {
	payload, err := decodeOptionPayload(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	values := make([]any, 0, len(config.Columns))
	placeholders := make([]string, 0, len(config.Columns))
	for _, column := range config.Columns {
		value, valueErr := getRequiredString(payload, column)
		if valueErr != nil {
			http.Error(w, valueErr.Error(), http.StatusBadRequest)
			return
		}
		values = append(values, value)
		placeholders = append(placeholders, "?")
	}

	query := fmt.Sprintf(
		"INSERT INTO %s (%s) VALUES (%s)",
		config.Table,
		strings.Join(config.Columns, ", "),
		strings.Join(placeholders, ", "),
	)
	result, err := db.Exec(query, values...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeSingleRow(w, config, int(id))
}

func updateOptionRow(w http.ResponseWriter, r *http.Request, config optionConfig, id int) {
	payload, err := decodeOptionPayload(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	assignments := make([]string, 0, len(config.Columns))
	values := make([]any, 0, len(config.Columns)+1)
	for _, column := range config.Columns {
		value, valueErr := getRequiredString(payload, column)
		if valueErr != nil {
			http.Error(w, valueErr.Error(), http.StatusBadRequest)
			return
		}
		assignments = append(assignments, fmt.Sprintf("%s = ?", column))
		values = append(values, value)
	}
	values = append(values, id)

	query := fmt.Sprintf("UPDATE %s SET %s WHERE id = ?", config.Table, strings.Join(assignments, ", "))
	if _, err := db.Exec(query, values...); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeSingleRow(w, config, id)
}

func deleteOptionRow(w http.ResponseWriter, config optionConfig, id int) {
	query := fmt.Sprintf("DELETE FROM %s WHERE id = ?", config.Table)
	if _, err := db.Exec(query, id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func writeSingleRow(w http.ResponseWriter, config optionConfig, id int) {
	selectCols := append([]string{"id"}, config.Columns...)
	query := fmt.Sprintf("SELECT %s FROM %s WHERE id = ?", strings.Join(selectCols, ", "), config.Table)

	scanTargets := make([]any, len(selectCols))
	scanPtrs := make([]any, len(selectCols))
	for i := range selectCols {
		scanPtrs[i] = &scanTargets[i]
	}

	if err := db.QueryRow(query, id).Scan(scanPtrs...); err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "not found", http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	result := make(map[string]any, len(selectCols))
	for i, col := range selectCols {
		result[col] = normalizeSQLValue(scanTargets[i])
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func decodeOptionPayload(r *http.Request) (map[string]any, error) {
	payload := map[string]any{}
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		return nil, err
	}
	return payload, nil
}

func getRequiredString(payload map[string]any, key string) (string, error) {
	value, ok := payload[key]
	if !ok {
		return "", fmt.Errorf("missing required field: %s", key)
	}
	str, ok := value.(string)
	if !ok {
		return "", fmt.Errorf("field %s must be a string", key)
	}
	str = strings.TrimSpace(str)
	if str == "" {
		return "", fmt.Errorf("field %s cannot be empty", key)
	}
	return str, nil
}

func normalizeSQLValue(value any) any {
	switch typed := value.(type) {
	case []byte:
		return string(typed)
	default:
		return typed
	}
}
