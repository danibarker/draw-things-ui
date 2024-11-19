import { ReactNode, useEffect, useState } from "react";
import { defaultSettings, SettingsContext } from "../settings/useSettings";
import useWebSocket from "../../useWebsocket";
import {
	getLoras,
	getModels,
	getSamplers,
	getUpscalers,
	getSeedModes,
} from "../../helpers/api";
import axios from "axios";

const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [isAdvanced, setIsAdvanced] = useState(false);
	const [showHidden, setShowHidden] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [queue, setQueue] = useState<Settings[]>([]);
	const [globalQueueLength, setGlobalQueueLength] = useState(0);
	const [positionsInQueue, setPositionsInQueue] = useState<number[]>([]);
	const [settings, setSettings] = useState<Settings>(defaultSettings);
	const [unsavedImages, setUnsavedImages] = useState<string[]>([]);
	const [savedImages, setSavedImages] = useState<string[]>([]);
	const [id, setId] = useState("");
	const [modalContent, setModalContent] = useState("help");
	const [loras, setLoras] = useState<{
		[key: string]: { [key: string]: string };
	}>({});
	const [models, setModels] = useState<{
		[key: string]: { [key: string]: string };
	}>({});
	const [seedModes, setSeedModes] = useState<SeedMode[]>([]);
	const [upscalers, setUpscalers] = useState<Upscaler[]>([]);
	const [samplers, setSamplers] = useState<Sampler[]>([]);
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	useEffect(() => {
		const getSettings = async () => {
			const newLoras = await getLoras();
			setLoras(newLoras);
			const newModels = await getModels();
			setModels(newModels);
			const newSeedModes = await getSeedModes();
			setSeedModes(newSeedModes);
			const newUpscalers = await getUpscalers();
			setUpscalers(newUpscalers);
			const newSamplers = await getSamplers();
			setSamplers(newSamplers);
			// get from localStorage or generate random 16 character string and store in localStorage
			let lsData = localStorage.getItem("id");
			if (!lsData) {
				lsData = Math.random().toString(36).substring(2, 18);
				localStorage.setItem("id", lsData);
			} else {
				setId(lsData);
			}
		};
		getSettings();
	}, []);
	useEffect(() => {
		const getSettings = async () => {
			const imageResponse = await axios.get("/api/images/unsaved");
			const newImages = imageResponse.data;
			setUnsavedImages(newImages);
			const savedImageResponse = await axios.get(
				`/api/images/search?page=${page}${query ? `&query=${query}` : ""}`
			);
			const newSavedImages = savedImageResponse.data;
			setSavedImages(newSavedImages);
		};
		getSettings();
	}, [query, page]);

	const websocket = useWebSocket(
		"/ws",
		setUnsavedImages,
		setQueue,
		setGlobalQueueLength
	);
	const currentFullTime = globalQueueLength * 120000; // 2 minutes per image
	const timeToStart = Date.now() + currentFullTime;
	const timesToFinish = queue.map((_, i) => timeToStart - i * 120000);
	console.log("timesToFinish", timesToFinish, positionsInQueue);
	if (positionsInQueue.length !== 0) {
		setPositionsInQueue([]);
	}
	return (
		<SettingsContext.Provider
			value={{
				id,
				settings,
				setSettings,
				unsavedImages,
				setUnsavedImages,
				savedImages,
				setSavedImages,
				websocket,
				isAdvanced,
				setIsAdvanced,
				showHidden,
				setShowHidden,
				modalOpen,
				setModalOpen,
				queue,
				setQueue,
				globalQueueLength,
				setGlobalQueueLength,
				modalContent,
				setModalContent,
				loras,
				models,
				seedModes,
				upscalers,
				samplers,
				query,
				setQuery,
				page,
				setPage,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export default SettingsProvider;
