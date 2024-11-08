/// <reference types="vite/client" />
interface ControlsType {
  guidanceStart: number;
  guidanceEnd: number;
  controlImportance: string;
  weight: number;
  noPrompt: boolean;
  inputOverride: string;
  targetBlocks: [];
  file: string;
  key: string;
  globalAveragePooling: boolean;
  downSamplingRate: number; // tile and upscale
}
interface Lora {
  file: string;
  weight: number;
  key: string;
}

interface Settings {
  model_category: string;
  model: string;
  loras: Lora[];
  controls: ControlsType[];
  strength: number;
  seed: number;
  seed_mode: string;
  refiner_start: number;
  zero_negative_prompt: boolean;
  separate_clip_l: boolean;
  clip_l_text: null;
  separate_open_clip_g: boolean;
  open_clip_g_text: null;
  clip_skip: number;
  mask_blur: number;
  mask_blur_outset: number;
  sharpness: number;
  preserve_original_after_inpaint: boolean;
  hires_fix: boolean;
  hires_first_pass_width: number;
  hires_first_pass_height: number;
  hires_fix_height: number;
  hires_fix_width: number;
  hires_fix_strength: number;
  tiled_decoding: boolean;
  decoding_tile_width: number;
  decoding_tile_height: number;
  decoding_tile_overlap: number;
  tiled_diffusion: boolean;
  diffusion_tile_height: number;
  diffusion_tile_width: number;
  diffusion_tile_overlap: number;
  prompt: string;
  negative_prompt: string;
  start_frame_guidance: number;
  stage_2_guidance: number;
  num_frames: number;
  fps: number;
  motion_scale: number;
  guiding_frame_noise: number;
  crop_top: number;
  crop_left: number;
  target_height: number;
  target_width: number;
  original_height: number;
  original_width: number;
  negative_original_width: number;
  negative_original_height: number;
  aesthetic_score: number;
  negative_aesthetic_score: number;
  t5_text_encoder_decoding: boolean;
  speed_up_with_guidance_embed: boolean;
  stage_2_shift: number;
  image_prior_steps: number;
  negative_prompt_for_image_prior: boolean;
  guidance_embed: number;
  resolution_dependent_shift: boolean;
  width: number;
  height: number;
  upscaler: string;
  upscaler_scale: number;
  guidance_scale: number;
  steps: number;
  sampler: string;
  stochastic_sampling_gamma: number;
  shift: number;
  batch_count: number;
  refiner_model: string;
  type?: string;
}

interface SettingsContextProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  websocket: WebSocket | null;
}

type PageHeaderProps = {
  setOpenPanel: React.Dispatch<React.SetStateAction<boolean>>;
  openPanel: boolean;
};

type SectionProps = {
  settings: SettingsContextProps;
};
