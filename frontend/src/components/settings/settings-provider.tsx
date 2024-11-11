import { ReactNode, useState } from "react";
import { defaultSettings, SettingsContext } from "./useSettings";
import useWebSocket from "../../useWebsocket";

const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [isAdvanced, setIsAdvanced] = useState(false);
	const [showHidden, setShowHidden] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [queue, setQueue] = useState<Settings[]>([]);
	const [globalQueueLength, setGlobalQueueLength] = useState(0);
	const [positionsInQueue, setPositionsInQueue] = useState<number[]>([]);
	const [settings, setSettings] = useState<Settings>(defaultSettings);
	const [images, setImages] = useState<string[]>([]);
	const [modalContent, setModalContent] = useState("help");

	const websocket = useWebSocket(
		"/ws",
		setImages,
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
				settings,
				setSettings,
				images,
				setImages,
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
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export default SettingsProvider;
