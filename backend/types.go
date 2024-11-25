package main

import "golang.org/x/net/websocket"

type LoraSetting struct {
	File   string  `json:"file"`
	Weight float64 `json:"weight"`
}
type ControlSetting struct {
	File                 string   `json:"file"`
	Weight               float32  `json:"weight"`
	GuidanceStart        float32  `json:"guidanceStart"`
	GuidanceEnd          float32  `json:"guidanceEnd"`
	ControlImportance    string   `json:"controlImportance"`
	NoPrompt             bool     `json:"noPrompt"`
	InputOverride        string   `json:"inputOverride"`
	TargetBlocks         []string `json:"targetBlocks"`
	Key                  string   `json:"key"`
	GlobalAveragePooling bool     `json:"globalAveragePooling"`
	DownSamplingRate     float32  `json:"downSamplingRate"`
}

type AppConfig struct {
	Password   string `json:"password"`
	ExtraLoras string `json:"extra_loras"`
	DBFilename string `json:"db_filename"`
}

type ImageConfig struct {
	Width         int              `json:"width"`
	Height        int              `json:"height"`
	Prompt        string           `json:"prompt"`
	Steps         int              `json:"steps"`
	Strength      float32          `json:"strength"`
	Model         string           `json:"model"`
	Loras         []LoraSetting    `json:"loras"`
	Controls      []ControlSetting `json:"controls"`
	Seed          int64            `json:"seed"`
	GuidanceScale float32          `json:"guidance_scale"`
	Sampler       string           `json:"sampler"`
	InitImages    *[]string        `json:"init_images,omitempty"`
}

type ImageRequest struct {
	ImageConfig ImageConfig `json:"image_config"`
	Complete    bool        `json:"complete"`
	Filename    string      `json:"filename"`
	Username    string      `json:"username"`
}

type Message struct {
	Type   string      `json:"type"`
	Data   interface{} `json:"data"`
	Cookie string      `json:"cookie"`
}
type QueueMessage struct {
	QueueLength int    `json:"queue_length"`
	Type        string `json:"type"`
}
type ImageResponse struct {
	Images []string `json:"images"`
}

type CompletedImage struct {
	Image  string         `json:"image"`
	Socket websocket.Conn `json:"socket"`
}

type ErrorMessage struct {
	Error string `json:"error"`
}

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Roles    []int  `json:"roles"`
	Email    string `json:"email"`

	Password string `json:"password"`
}

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
