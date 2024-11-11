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
		setIsAdvanced,
		setQueue,
		queue,
		// setShowHidden,
		// showHidden,
	} = s;
	useEffect(() => {
		if (
			settings.prompt &&
			settings.prompt.length > 13 &&
			settings.prompt.length < 18
		) {
			if (settings.prompt === "advanced settings") {
				setIsAdvanced(true);
			} else if (settings.prompt === "basic settings") {
				setIsAdvanced(false);
			}
		}
	}, [settings.prompt, setIsAdvanced]);

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
			data: {
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
			},
			type: "image",
		};
		console.log(data);
		if (data && websocket) {
			console.log(data);
			websocket.send(JSON.stringify(data));
			setQueue([...queue, data.data]);
		} else {
			console.log("Settings and/or websocket not found");
		}
	};
	return (
		<Section>
			<Row
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "20px",
					justifyContent: "space-between",
					alignItems: "start",
				}}
			>
				<div
					style={{ display: "flex", flexDirection: "column", width: "100%" }}
				>
					<label htmlFor="prompt">Prompt</label>
					<textarea
						id="prompt"
						name="prompt"
						value={settings.prompt}
						onChange={event => {
							setSettings({
								...settings,
								prompt: event.target.value,
							});
						}}
						style={{ height: isAdvanced ? "100px" : "70px" }}
					/>
				</div>
				<div>
					<button disabled={queue.length > 3} onClick={submit}>
						{queue.length > 3 ? "Busy..." : "Submit"}
					</button>
				</div>
			</Row>
		</Section>
	);
}

export default PromptSection;
