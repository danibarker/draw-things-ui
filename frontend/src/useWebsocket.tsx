import { useCallback, useEffect, useState } from "react";
import { getCookie } from "./helpers";

function useWebSocket(
	url: string,
	setImages: React.Dispatch<React.SetStateAction<string[]>>,
	setQueue: React.Dispatch<React.SetStateAction<Settings[]>>,
	setGlobalQueueLength: React.Dispatch<React.SetStateAction<number>>
) {
	const [websocket, setWebsocket] = useState<WebSocket | null>(null);
	const connect = useCallback(
		(
			url: string,
			setWebsocket: React.Dispatch<React.SetStateAction<WebSocket | null>>,
			setImages: React.Dispatch<React.SetStateAction<string[]>>,
			setGlobalQueueLength: React.Dispatch<React.SetStateAction<number>>,
			setQueue: React.Dispatch<React.SetStateAction<Settings[]>>
		) => {
			let reconnectAttempts = 0;
			const ws = new WebSocket(url);
			ws.onopen = () => {
				console.log("Connected to websocket");
				ws.send(`{"type":"reconnect", "cookie": "${getCookie("session")}"}`);
				setWebsocket(ws);
				reconnectAttempts = 0;
			};

			ws.onclose = () => {
				console.log("Disconnected from websocket");
				setWebsocket(null);
				// Only attempt to reconnect if attempts are below 10
				if (reconnectAttempts < 10) {
					reconnectAttempts += 1;

					// Calculate delay based on the attempt number, capping at 1 minute
					const delay = Math.min(1000 * 2 ** reconnectAttempts, 60000);

					console.log(
						`Reconnecting in ${
							delay / 1000
						} seconds... (Attempt ${reconnectAttempts})`
					);
					setTimeout(connect, delay);
				} else {
					console.log(
						"Max reconnect attempts reached. Stopping further attempts."
					);
				}
			};

			ws.onmessage = event => {
				console.log("Message received from websocket", event);
				console.log("event.data", event.data);
				// check if event.data is a string, if it is json.parse it

				if (typeof event.data === "string") {
					const json = JSON.parse(event.data);
					if (json.type === "image") {
						setImages(images => [...images, json.data]);
						setQueue(queue => queue.slice(1));
					} else if (json.type === "queue") {
						setGlobalQueueLength(json.queue_length);
					}
				} else {
					// event.data is a Blob, so we need to convert it to a string
					// AND ONLY THEN parse it as JSON

					const blob: Blob = event.data;
					// convert the blob to a string
					const reader = new FileReader();
					reader.onload = () => {
						const data = reader.result;
						console.log("data", data);
						const json = JSON.parse(data as string);
						console.log("json", json);
						if (json.type === "image") {
							const path = json.data;
							setImages(prev => [...prev, path]);
							setQueue(prev => prev.slice(1));
							setGlobalQueueLength(json.queue_length);
						} else if (json.type === "queue") {
							setGlobalQueueLength(json.data.length);
						}
					};
					reader.readAsText(blob);
				}
			};
		},
		[]
	);
	const reconnect = useCallback(() => {
		if (websocket) websocket.close();
		connect(url, setWebsocket, setImages, setGlobalQueueLength, setQueue);
	}, [connect, setImages, setGlobalQueueLength, setQueue, url, websocket]);
	useEffect(() => {
		if (!websocket)
			connect(url, setWebsocket, setImages, setGlobalQueueLength, setQueue);

		return () => {
			if (websocket) websocket.close();
		};
	}, [
		connect,
		websocket,
		url,
		setImages,
		setWebsocket,
		setGlobalQueueLength,
		setQueue,
	]);

	return { websocket, reconnect };
}

export default useWebSocket;
