import { Row, Section } from "../styled-components";
import { useSettings } from "../useSettings";

function PromptSection() {
  const s = useSettings();
  const { settings, websocket, setSettings } = s;
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
      <Row>
        <div>
          <label htmlFor="prompt">Prompt</label>
          <button onClick={submit}>Submit</button>
        </div>
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
        />
      </Row>
    </Section>
  );
}

export default PromptSection;
