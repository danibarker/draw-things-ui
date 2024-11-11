import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
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
		<Container>
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
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	background-color: var(--main-bg);
	h2 {
		margin-bottom: 1rem;
	}
	input {
		margin-bottom: 1rem;
	}
	button {
		margin-bottom: 1rem;
	}
`;
