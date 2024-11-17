import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from "../../shared/styled-components";
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
			<Button disabled={buttonDisabled} onClick={getLoras}>
				Submit
			</Button>
			<Button onClick={() => setModalOpen(false)}>Close</Button>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
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
