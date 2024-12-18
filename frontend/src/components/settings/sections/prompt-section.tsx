import { useEffect, useRef } from "react";
import { Button, Row, Section } from "../../shared/styled-components";
import { useSettings } from "../useSettings";
// import Timer from "../../timer";
import styled from "styled-components";
import { getCookie } from "../../../helpers";

function PromptSection() {
	const buttonRef = useRef<HTMLDivElement>(null);
	const submitRef = useRef<HTMLButtonElement>(null);
	const {
		settings,
		websocket,
		setSettings,
		isAdvanced,
		setIsAdvanced,
		setQueue,
		queue,
	} = useSettings();

	useEffect(() => {
		setSettings(prev => ({
			...prev,
			prompt:
				"Young software developer immersed in coding, viewed from behind, bathed in blue monitor glow. Modern minimalist workspace, dual screens displaying vibrant code. Hyper-realistic style with precise details, volumetric lighting, reflections on glass desk surface, 8K resolution detail.",
		}));
	}, [setSettings]);
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
		const cookie = getCookie("session");
		const data: { data: Settings; type: string; cookie: string | undefined } = {
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
				upscaler: "",
			},
			type: "image",
			cookie: cookie,
		};
		if (settings.init_images) {
			data.data["init_images"] = settings.init_images;
		}
		console.log("data is", data);
		if (
			data &&
			websocket &&
			buttonRef &&
			buttonRef.current &&
			submitRef &&
			submitRef.current
		) {
			console.log(data);
			websocket.send(JSON.stringify(data));
			setQueue([...queue, data.data]);
			buttonRef.current.classList.add("move");
			submitRef.current.disabled = true;
			setTimeout(() => {
				if (buttonRef && buttonRef.current && submitRef && submitRef.current) {
					buttonRef.current.classList.remove("move");
					submitRef.current.disabled = false;
				}
			}, 1000);
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
				<div style={{ display: "flex", position: "relative" }}>
					<Button
						className="sibling"
						ref={submitRef}
						disabled={queue.length > 3}
						onClick={submit}
					>
						{queue.length > 3 ? "Busy..." : "Submit"}
					</Button>
					<Button onClick={() => setIsAdvanced(prev => !prev)}>
						{isAdvanced ? "Basic" : "Advanced"}
					</Button>
					<FlyingButton ref={buttonRef}>
						<Button
							className="underbutton"
							style={{ opacity: 0.9 }}
							onMouseEnter={console.log}
						>
							{queue.length > 3 ? "Busy..." : "Submit"}
						</Button>
					</FlyingButton>
					{/* <Timer time={33} /> */}
				</div>
			</Row>
		</Section>
	);
}

const FlyingButton = styled.div`
	position: absolute;
	background-color: transparent;
	width: 86px;
	height: 31px;
	transition: none;
	left: 0px;
	top: 0px;
	display: flex;
	pointer-events: none;
	&.move {
		left: 200%;
		scale: 200;
		top: -13px;
		rotate: 360deg;
		transition: all 1s;
	}
	&:hover > button {
		color: var(--highlight-3);
		background-color: var(--button-hover-bg);
	}
	/* animation: move 1s infinite; */
`;

export default PromptSection;
