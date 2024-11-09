import { useEffect } from "react";
import { Row, Section } from "../styled-components";
import { useSettings } from "../useSettings";

function PromptSection() {
  const s = useSettings();
  const {
    settings,
    websocket,
    setSettings,
    isAdvanced,
    setShowHidden,
    showHidden,
  } = s;
  useEffect(() => {
    if (
      settings.prompt &&
      settings.prompt === "show hidden stuff" &&
      !showHidden
    ) {
      setShowHidden(true);
    }
  }, [settings.prompt, setShowHidden, showHidden]);

  /*
  Width          int       `json:"width"`
	Height         int       `json:"height"`
	Prompt         string    `json:"prompt"`
	NegativePrompt string    `json:"negative_prompt"`
	Steps          int       `json:"steps"`
	Strength       float32   `json:"strength"`
	Model          string    `json:"model"`
	Loras          []Lora    `json:"loras"`
	Controls       []Control `json:"controls"`
	Seed           int64     `json:"seed"`
	Guidance       float32   `json:"guidance_scale"`
	Sampler        string    `json:"sampler"`
	InitImages []string `json:"init_images,omitempty"`
  */
  const submit = async () => {
    const data = {
      width: settings.width,
      height: settings.height,
      prompt: settings.prompt,
      steps: settings.steps,
      strength: settings.strength,
      model: settings.model,
      loras: settings.loras,
      controls: settings.controls,
      seed: settings.seed,
      guidance_scale: settings.guidance_scale,
      sampler: settings.sampler,
      upscaler: "disabled",
      // init_images: settings.init_images,
    };
    if (data && websocket) {
      console.log(data);
      websocket.send(JSON.stringify(data));
    } else {
      console.log("Settings and/or websocket not found");
    }
  };
  return (
    <Section>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="prompt">Prompt</label>
          <textarea
            id="prompt"
            name="prompt"
            value={settings.prompt}
            onChange={(event) => {
              setSettings({
                ...settings,
                prompt: event.target.value,
              });
            }}
            style={{ height: isAdvanced ? "300px" : "100px" }}
          />
        </div>
        <div>
          <button onClick={submit}>Submit</button>
        </div>
      </Row>
    </Section>
  );
}

export default PromptSection;
