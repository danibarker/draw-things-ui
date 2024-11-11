import Loading from "../icons/loading";
import { Nav } from "./layout-elements";
import { useSettings } from "./useSettings";

export const NavBar = () => {
	const { websocket, globalQueueLength, setModalContent, setModalOpen } =
		useSettings();
	return (
		<Nav>
			<p>
				Hello, server is
				{websocket && websocket?.readyState == 1
					? " connected"
					: websocket && websocket.readyState == 0
					? " not responding"
					: " disconnected"}
			</p>
			<button
				onClick={() => {
					setModalOpen(true);
					setModalContent("help");
				}}
			>
				Help/Tutorial
			</button>
			<button
				style={{ border: "none", background: "none" }}
				onClick={() => {
					websocket?.send(JSON.stringify({ type: "queue" }));
				}}
			>
				<Loading fill="white" stroke="white" width={20} />
			</button>
			<p>Global queue length: {globalQueueLength}</p>
		</Nav>
	);
};
