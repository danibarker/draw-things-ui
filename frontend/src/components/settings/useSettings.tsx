import { createContext, useContext } from "react";
export const defaultSettings: Settings = {
	model_category: "flux",
	model: "flux_1_schnell_q5p.ckpt",
	loras: [],
	controls: [],
	strength: 1,
	seed: -1,
	seed_mode: "Scale Alike",
	width: 384,
	height: 384,
	upscaler: "",
	upscaler_scale: 0,
	guidance_scale: 3.5,
	steps: 4,
	sampler: "DDIM Trailing",
	stochastic_sampling_gamma: 0.3,
	shift: 1,
	batch_count: 1,
	refiner_model: "",
	refiner_start: 0.8500000238418579,
	zero_negative_prompt: false,
	separate_clip_l: false,
	clip_l_text: null,
	separate_open_clip_g: false,
	open_clip_g_text: null,
	clip_skip: 1,
	mask_blur: 0,
	mask_blur_outset: 1,
	sharpness: 0,
	preserve_original_after_inpaint: false,
	hires_fix: false,
	hires_first_pass_width: 128,
	hires_first_pass_height: 128,
	hires_fix_height: 128,
	hires_fix_width: 128,
	hires_fix_strength: 0.699999988079071,
	tiled_decoding: false,
	decoding_tile_width: 640,
	decoding_tile_height: 640,
	decoding_tile_overlap: 128,
	tiled_diffusion: false,
	diffusion_tile_height: 1024,
	diffusion_tile_width: 1024,
	diffusion_tile_overlap: 128,
	prompt:
		"photo of the number " +
		Math.random().toString().substring(4, 5) +
		" in a field",
	negative_prompt: "",
	negative_aesthetic_score: 0,
	negative_original_height: 0,
	negative_original_width: 0,
	negative_prompt_for_image_prior: false,
	start_frame_guidance: 1,
	stage_2_guidance: 1,
	num_frames: 14,
	fps: 5,
	motion_scale: 127,
	guiding_frame_noise: 0.019999999552965164,
	crop_top: 0,
	crop_left: 0,
	target_height: 1024,
	target_width: 1024,
	original_height: 1024,
	original_width: 1024,
	aesthetic_score: 0,
	t5_text_encoder_decoding: false,
	speed_up_with_guidance_embed: false,
	stage_2_shift: 0,
	image_prior_steps: 0,
	guidance_embed: 0,
	resolution_dependent_shift: false,
	type: "txt2img",
};
export const SettingsContext = createContext<SettingsContextProps>({
	setSettings: () => null,
	settings: defaultSettings,
	setImages: () => null,
	websocket: null,
	images: [],
	isAdvanced: false,
	setIsAdvanced: () => null,
	showHidden: false,
	setShowHidden: () => null,
	modalOpen: false,
	setModalOpen: () => null,
	queue: [],
	setQueue: () => null,
	globalQueueLength: 0,
	setGlobalQueueLength: () => null,
	setModalContent: () => null,
	modalContent: "",
	loras: {},
	models: {},
	seedModes: [],
	upscalers: [],
	samplers: [],
});

export const useSettings = () => {
	return useContext(SettingsContext);
};
