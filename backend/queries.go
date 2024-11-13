package main

const CREATE_DB string = `
CREATE TABLE IF NOT EXISTS users (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	username TEXT NOT NULL UNIQUE,
	hashed_password TEXT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS visibilities (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	visibility_name TEXT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS models (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	model_name TEXT NOT NULL,
	model_type TEXT NOT NULL,
	filename TEXT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS upscalers (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	upscaler_name TEXT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS samplers (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	sampler_name TEXT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS seed_modes (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	seed_mode_name TEXT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS generated_images (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	user_id INTEGER NOT NULL,
	filename TEXT NOT NULL,
	model_id INTEGER NOT NULL,
	refiner_id INTEGER NOT NULL,
	prompt TEXT NOT NULL,
	strength INTEGER NOT NULL,
	steps INTEGER NOT NULL,
	width INTEGER NOT NULL,
	height INTEGER NOT NULL,
	guidance TEXT NOT NULL,
	seed INTEGER NOT NULL,
	seed_mode_id INTEGER NOT NULL,
	upscaler_id INTEGER NOT NULL,
	sampler_id INTEGER NOT NULL,
	visibility INTEGER NOT NULL,
	FOREIGN KEY(user_id) REFERENCES users(id)
	FOREIGN KEY(visibility) REFERENCES visibilities(id)
	FOREIGN KEY(model_id) REFERENCES models(id)
	FOREIGN KEY(refiner_id) REFERENCES models(id)
	FOREIGN KEY(seed_mode_id) REFERENCES seed_modes(id)
	FOREIGN KEY(upscaler_id) REFERENCES upscalers(id)
	FOREIGN KEY(sampler_id) REFERENCES samplers(id)
	);
CREATE TABLE IF NOT EXISTS loras (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	lora_name TEXT NOT NULL,
	model_type TEXT NOT NULL,
	filename TEXT NOT NULL
	);


CREATE TABLE IF NOT EXISTS gi_loras (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	gi_id INTEGER NOT NULL,
	lora_id INTEGER NOT NULL,
	strength INTEGER NOT NULL,
	FOREIGN KEY(gi_id) REFERENCES generated_images(id),
	FOREIGN KEY(lora_id) REFERENCES loras(id)
	);
	CREATE TABLE IF NOT EXISTS controls (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	control_name TEXT NOT NULL,
	model_type TEXT NOT NULL,
	file TEXT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS gi_controls (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	gi_id INTEGER NOT NULL,
	control_id INTEGER NOT NULL,
	strength INTEGER NOT NULL,
	guidance_start INTEGER NOT NULL,
	control_importance TEXT NOT NULL,
	down_sampling_rate INTEGER NOT NULL,
	global_average_pooling BOOLEAN NOT NULL,
	guidance_end INTEGER NOT NULL,
	weight INTEGER NOT NULL,
	input_override TEXT NOT NULL,
	no_prompt BOOLEAN NOT NULL,

	FOREIGN KEY(gi_id) REFERENCES generated_images(id),	
	FOREIGN KEY(control_id) REFERENCES controls(id)
	);


CREATE TABLE IF NOT EXISTS roles (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	level INTEGER NOT NULL,
	role_name TEXT NOT NULL,
	UNIQUE(level, role_name)
	);
	CREATE TABLE IF NOT EXISTS user_roles (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	user_id INTEGER NOT NULL,
	role_id INTEGER NOT NULL,
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(role_id) REFERENCES roles(id)
	);
	CREATE TABLE IF NOT EXISTS sessions (
	id TEXT NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	user_id INTEGER NOT NULL,
	session_token TEXT NOT NULL,
	FOREIGN KEY(user_id) REFERENCES users(id)
	);
	
	CREATE TABLE IF NOT EXISTS following (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	follower_id INTEGER NOT NULL,
	followee_id INTEGER NOT NULL,
	FOREIGN KEY(follower_id) REFERENCES users(id),
	FOREIGN KEY(followee_id) REFERENCES users(id)
	);
	CREATE TABLE IF NOT EXISTS likes (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	user_id INTEGER NOT NULL,
	image_id INTEGER NOT NULL,
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(image_id) REFERENCES generated_images(id)
	);
	CREATE TABLE IF NOT EXISTS comments (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	user_id INTEGER NOT NULL,
	image_id INTEGER NOT NULL,
	comment TEXT NOT NULL,
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(image_id) REFERENCES generated_images(id)
	);
	CREATE TABLE IF NOT EXISTS image_tags (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	image_id INTEGER NOT NULL,
	tag TEXT NOT NULL,
	FOREIGN KEY(image_id) REFERENCES generated_images(id)
	);

	CREATE TABLE IF NOT EXISTS refiners (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	refiner_name TEXT NOT NULL,
	model_type TEXT NOT NULL,
	filename TEXT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS gi_refiners (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	gi_id INTEGER NOT NULL,
	refiner_id INTEGER NOT NULL,
	strength INTEGER NOT NULL,
	FOREIGN KEY(gi_id) REFERENCES generated_images(id),
	FOREIGN KEY(refiner_id) REFERENCES refiners(id)
	);
	CREATE TABLE IF NOT EXISTS requests_bugs_comments (
	id INTEGER NOT NULL PRIMARY KEY DEFAULT (hex(randomblob(16))),
	user_id INTEGER NULL,
	request TEXT NOT NULL,
	FOREIGN KEY(user_id) REFERENCES users(id)
	);


	INSERT OR IGNORE INTO visibilities (visibility_name) VALUES ('public');
	INSERT OR IGNORE INTO visibilities (visibility_name) VALUES ('private');
	INSERT OR IGNORE INTO visibilities (visibility_name) VALUES ('followers');
	INSERT OR IGNORE INTO visibilities (visibility_name) VALUES ('unlisted');
	INSERT OR IGNORE INTO visibilities (visibility_name) VALUES ('direct');



	INSERT OR IGNORE INTO seed_modes (seed_mode_name) VALUES ('Scale Alike');
	INSERT OR IGNORE INTO seed_modes (seed_mode_name) VALUES ('Legacy');
	INSERT OR IGNORE INTO seed_modes (seed_mode_name) VALUES ('NVIDIA GPU Compatible');
	INSERT OR IGNORE INTO seed_modes (seed_mode_name) VALUES ('Torch CPU Compatible');


	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('Euler A Trailing');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('DPM++ 2M Karras');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('Euler a');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('DPM++ SDE Karras');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('UniPC');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('PLMS');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('DDIM');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('LCM');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('Euler A Substep');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('DPM++ SDE Substep');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('TCD');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('DPM++ 2M Trailing');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('DPM++ SDE Trailing');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('DDIM Trailing');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('DPM++ 2M AYS');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('DPM++ SDE AYS');
	INSERT OR IGNORE INTO samplers (sampler_name) VALUES ('Euler A AYS');

	INSERT OR IGNORE INTO upscalers (upscaler_name) VALUES ('null');
	INSERT OR IGNORE INTO upscalers (upscaler_name) VALUES ('esrgan_4x_universal_upscaler_v2_sharp_f16.ckpt');
	INSERT OR IGNORE INTO upscalers (upscaler_name) VALUES ('4x_ultrasharp_f16.ckpt');


	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('SD V2 (SD2.0 Inpainting)', 'sd2_0', 'sd_v2.0_inpainting_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Flux.1 (Flux)', 'flux', 'flux_1_schnell_q8p.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Flux.1 8-bit (Flux)', 'flux', 'flux_1_schnell_q5p.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('SD V1.5 (SD1.5 Inpainting)', 'sd1_5', 'sd_v1.5_inpainting_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Dreamshaper (SD1.5)', 'sd1_5', 'dreamshaper_v8_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Counterfeit (SD1.5)', 'sd1_5', 'counterfeit_v3.0_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Spiderverse (SD1.5)', 'sd1_5', 'spiderverse_v1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('F222 (SD1.5)', 'sd1_5', 'f222_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Hassanblend (SD1.5)', 'sd1_5', 'hassanblend_v1.5.1.2_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Juggernaut (SD1.5)', 'sd1_5', 'juggernaut_reborn_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Realistic Vision V5 (SD1.5)', 'sd1_5', 'realistic_vision_v5.1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('DnD Classes and Species (SD1.5)', 'sd1_5', 'dnd_classes_and_species_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Studio Ghibli (SD1.5)', 'sd1_5', 'ghibli_v1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Sam Does Art (SD1.5)', 'sd1_5', 'samdoesart_v3_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Ink Punk (SD1.5)', 'sd1_5', 'inkpunk_v2_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Classic Disney (SD1.5)', 'sd1_5', 'classicanim_v1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Seek Art Mega (SD1.5)', 'sd1_5', 'seek_art_mega_v1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Aloe Veras', 'sd1_5', 'aloeveras_simpmaker_3k1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Supermarionation (SD1.5)', 'sd1_5', 'supermarionation_v2_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Pixar/Modern Disney (SD1.5)', 'sd1_5', 'modi_v1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Midjourney (SD1.5)', 'sd1_5', 'mdjrny_v4_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Papercut (SD1.5)', 'sd1_5', 'papercut_v1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Analog (SD1.5)', 'sd1_5', 'analog_v1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('3D Model Redshift (SD1.5)', 'sd1_5', 'redshift_v1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Rev Animated (SD1.5)', 'sd1_5', 'rev_animated_v1.22_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Anime Anything (SD1.5)', 'sd1_5', 'anything_v3_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Juggernaut 8-bit (SD1.5)', 'sd1_5', 'juggernaut_reborn_q6p_q8p.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Dani (SD1.5)', 'sd1_5', 'dani_f32.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Spidermike (SD1.5)', 'sd1_5', 'spidermike_f32.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('DJ (SD1.5)', 'sd1_5', 'dj_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Playground (SDXL)', 'sdxl', 'playground_v2.5_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Kwai Kolors (SDXL Inpainting)', 'sdxl', 'kwai_kolors_inpainting_1.0_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Fooocus (SDXL Inpainting)', 'sdxl', 'fooocus_inpaint_sd_xl_v2.6_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Kwai Kolors (SDXL)', 'sdxl', 'kwai_kolors_1.0_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('PixelWave 10 (SDXL)', 'sdxl', 'pixelwave_10_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Playground V2 (SDXL)', 'sdxl', 'playground_v2_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('RealVisXL (SDXL)', 'sdxl', 'realvisxl_v4.0_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('JuggernautXL (SDXL)', 'sdxl', 'juggernaut_xl_v9_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('AnimagineXL (SDXL)', 'sdxl', 'animagine_xl_v3.1_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('iCatcher Realistic (SDXL)', 'sdxl', 'icatcher_realistic_f16.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('SD V3.5 Turbo', 'sd3_5', 'sd3_large_turbo_3.5_q6p.ckpt');
	INSERT OR IGNORE INTO models (model_name, model_type, filename) VALUES ('Video (SVD)', 'video', 'svd_i2v_xt_1.1_f16.ckpt');


	INSERT OR IGNORE INTO controls (control_name, model_type, file) VALUES ('Jasper AI Upscaler', 'flux', 'controlnet_jasper_ai_upscaler_flux_1_dev_1.0_f16.ckpt');
	INSERT OR IGNORE INTO controls (control_name, model_type, file) VALUES ('PuLID', 'flux', 'pulid_0.9_eva02_clip_l14_336_f16.ckpt');
	INSERT OR IGNORE INTO controls (control_name, model_type, file) VALUES ('Sketch', 'sd1_5', 't2iadapter_sketch_1.x_f16.ckpt');
	INSERT OR IGNORE INTO controls (control_name, model_type, file) VALUES ('Scribble', 'sd1_5', 'controlnet_scribble_1.x_v1.1_f16.ckpt');
	INSERT OR IGNORE INTO controls (control_name, model_type, file) VALUES ('Canny', 'sd1_5', 'controlnet_canny_1.x_v1.1_f16.ckpt');
	INSERT OR IGNORE INTO controls (control_name, model_type, file) VALUES ('Openpose','sd1_5', 'controlnet_openpose_1.x_v1.1_f16.ckpt');
	INSERT OR IGNORE INTO controls (control_name, model_type, file) VALUES ('MLSD', 'sd1_5', 'controlnet_mlsd_1.x_v1.1_f16.ckpt');
	INSERT OR IGNORE INTO controls (control_name, model_type, file) VALUES ('Tile', 'sd1_5', 'controlnet_tile_1.x_v1.1_f16.ckpt');

	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Amateur', 'flux', 'amateur_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Oil Painting', 'flux', 'bichu_v0612_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Dani', 'flux', 'daniflux_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Dani2', 'flux', 'daniflux1000_lora_f16.ckpt');
	
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Add More Details', 'sd1_5', 'add_more_details__detail_enhancer___tweaker__lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Geometric', 'sd1_5', 'geometric_pattern_v1_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Graffiti Tattoo', 'sd1_5', 'graffiti_tattoo_000005_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Tattoo', 'sd1_5', 'tattoozfczfc_v1.1_5640_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Face Tattoo', 'sd1_5', 'nlo_facetattoo_v1_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('8-Step', 'sd1_5', 'hyper_sd_v1.x_8_step_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('4-Step', 'sd1_5', 'hyper_sd_v1.x_4_step_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Dani4', 'sd1_5', 'danilora_1500_lora_f32.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('Turbo', 'sd1_5', 'tcd_sd_v1.5_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('LCM', 'sdxl', 'lcm_sd_xl_base_1.0_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('8-Step', 'sdxl', 'hyper_sdxl_8_step_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('DmD2', 'sdxl', 'dmd2_sdxl_4_step_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('SDXL Render', 'sdxl', 'sdxl_render_v2.0_lora_f16.ckpt');
	INSERT OR IGNORE INTO loras (lora_name, model_type, filename) VALUES ('TurboXL', 'sdxl', 'tcd_sd_xl_base_1.0_lora_f16.ckpt');

	INSERT OR IGNORE INTO refiners (refiner_name, model_type, filename) VALUES ('SD XL Refiner', 'sdxl', 'sd_xl_refiner_1.0_f16.ckpt');
	INSERT OR IGNORE INTO refiners (refiner_name, model_type, filename) VALUES ('SD XL Refiner 8-bit', 'sdxl', 'sd_xl_refiner_1.0_q6p_q8p.ckpt');

	`
