import axios from "axios";

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
		console.log("loras", response.data);
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

export const getCurrentUser = async (): Promise<User> => {
	const response = await axios.get("/api/auth/current_user");
	return response.data;
};
