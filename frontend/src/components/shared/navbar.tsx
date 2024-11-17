import Loading from "../icons/loading";
import { Nav } from "./layout-elements";
import { Button } from "./styled-components";
import { useSettings } from "../settings/useSettings";

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
			<Button
				onClick={() => {
					setModalOpen(true);
					setModalContent("help");
				}}
			>
				Help/Tutorial
			</Button>
			<Button
				style={{ border: "none", background: "none" }}
				onClick={() => {
					websocket?.send(JSON.stringify({ type: "queue" }));
				}}
			>
				<Loading fill="white" stroke="white" width={20} />
			</Button>
			<p>Global queue length: {globalQueueLength}</p>
		</Nav>
	);
};
