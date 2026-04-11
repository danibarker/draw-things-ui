import axios from "axios";

type SettingsFileName =
	| "models"
	| "loras"
	| "samplers"
	| "seed-modes"
	| "upscalers"
	| "refiners"
	| "controls";

export const getLoras = async () => {
	try {
		const lorasFromLocalStorage = localStorage.getItem("loras");
		let lorasToAdd;
		if (lorasFromLocalStorage) {
			lorasToAdd = JSON.parse(lorasFromLocalStorage) as {
				[key: string]: { [key: string]: string };
			};
		} else {
			lorasToAdd = {};
		}
		const response = await axios.get("/api/images/loras");
		response.data.forEach((lora: Lora) => {
			if (!lorasToAdd[lora.lora_name]) {
				lorasToAdd[lora.lora_name] = { [lora.model_type]: lora.filename };
			} else {
				lorasToAdd[lora.lora_name][lora.model_type] = lora.filename;
			}
		});
		return lorasToAdd;
	} catch (error) {
		console.log((error as Error).message);
		return {};
	}
};

export const getModels = async () => {
	try {
		const response = await axios.get("/api/images/models");
		return response.data.reduce(
			(acc: { [key: string]: { [key: string]: string } }, model: Model) => {
				if (!acc[model.model_type]) {
					acc[model.model_type] = { [model.model_name]: model.filename };
				} else {
					acc[model.model_type][model.model_name] = model.filename;
				}
				return acc;
			},
			{}
		);
	} catch (error) {
		console.log((error as Error).message);
		return {};
	}
};

export const getSeedModes = async () => {
	const response = await axios.get("/api/images/seedmodes");
	return response.data;
};

export const getUpscalers = async () => {
	const response = await axios.get("/api/images/upscalers");
	return response.data;
};

export const getSamplers = async () => {
	const response = await axios.get("/api/images/samplers");
	return response.data;
};

export const getSettingsFileContent = async (name: SettingsFileName) => {
	const response = await axios.get(`/api/admin/options/${name}`);
	return response.data;
};

export const saveSettingsFileContent = async (
	name: SettingsFileName,
	content: unknown
) => {
	const response = await axios.put(
		`/api/admin/options/${name}/${(content as { id: number }).id}`,
		content
	);
	return response.data;
};

export const createSettingsOption = async (
	name: SettingsFileName,
	content: unknown
) => {
	const response = await axios.post(`/api/admin/options/${name}`, content);
	return response.data;
};

export const deleteSettingsOption = async (
	name: SettingsFileName,
	id: number
) => {
	await axios.delete(`/api/admin/options/${name}/${id}`);
};

export const canEditSettingsOptions = async () => {
	try {
		await axios.get("/api/admin/options");
		return true;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			return false;
		}
		return false;
	}
};

export const getCurrentUser = async (): Promise<User> => {
	const response = await axios.get("/api/auth/current_user");
	return response.data;
};

export const getUnsavedImages = async () => {
	const response = await axios.get("/api/images/unsaved");
	return response.data;
};
