import { useState } from "react";
import axios from "axios";
export function GetMoreLoras({
	setModalOpen,
}: {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [input, setInput] = useState("");
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const getLoras = async () => {
		const response = await axios.post("/api/loras", { input });
		if (response.status === 200) {
			const lorasToAdd = response.data;
			localStorage.setItem("loras", JSON.stringify(lorasToAdd));
			window.location.reload();
		} else {
			setButtonDisabled(true);
		}
	};
	return (
		<>
			<h2>Enter your API key</h2>
			<input
				type="text"
				value={input}
				onChange={e => setInput(e.target.value)}
			/>
			<button disabled={buttonDisabled} onClick={getLoras}>
				Submit
			</button>
			<button onClick={() => setModalOpen(false)}>Close</button>
		</>
	);
}
