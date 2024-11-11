import styled from "styled-components";

export const Window = styled.div`
	display: grid;
	grid-template-rows: 1fr;
	height: 100vh;
`;

export const Nav = styled.nav`
	height: 60px;
	background: #333;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Main = styled.main`
	display: grid;
	grid-template-columns: auto 1fr; /* Left auto width, Right takes remaining */
	height: 100%;
`;

/* Left Side (2 rows) */
export const LeftSide = styled.div`
	display: grid;
	grid-template-rows: 50px 1fr; /* Title Bar (50px) + Scrollable Settings */
`;

export const RightSide = styled.div`
	display: grid;
	grid-template-rows: 50px 1fr; /* Title Bar (50px) + Scrollable Gallery */
`;

export const TitleBar = styled.div`
	height: 50px;
	background: #444; /* Example color */
	color: white;
	display: flex;
	align-items: center;
	padding-left: 10px;
`;

export const Scrollable = styled.div`
	overflow-y: auto;
	padding: 10px;
	background: #f5f5f5; /* Light background for contrast */
`;

export const PhotoGallery = styled.div`
	overflow-y: auto;
	padding: 10px;
	background: #e5e5e5; /* Light background for contrast */
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
	gap: 10px;
	img,
	.img {
		width: 100%;
		height: auto;
		display: block;
	}
`;

export const ModalContent = styled.div`
	position: absolute;
	border: 4px solid transparent;
	border-radius: 20px;
	padding: 40px;
	color: white;
	width: 670px;
	height: 460px;
	font-size: 20px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 199;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-template-rows: repeat(5, 1fr);
	gap: 20px;
	background: black;
	&::after {
		content: "";
		position: absolute;
		pointer-events: none;
		top: -4px;
		left: -4px;
		width: 100%;
		height: 100%;
		background: linear-gradient(137deg, #ffffff, #f4f8f4) padding-box,
			linear-gradient(45deg, #6700ff, #00cfff) border-box;
		mask: linear-gradient(white, black) padding-box,
			linear-gradient(white, white);
		mask-composite: exclude;
		border-radius: inherit;
		border: inherit;
		text-align: center;
		font-size: 20px;
		z-index: 100;
		color: #36ff0e;
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: center;
		justify-content: center;
	}
	h2 {
		font-size: 44px;
		grid-row: 1 / 3;
		grid-column: 1 / 7;
		text-align: center;
		align-self: center;
		font-weight: 100;
	}
	input {
		padding: 5px;
		font-size: 32px;
		grid-row: 3 / 4;
		grid-column: 1 / 7;
		background: linear-gradient(0deg, black 10%, black 50%, white 190%);
		border: 2px solid blue;
		color: #bebebe;
	}
	button {
		padding: 5px 10px;
		font-size: 16px;
		cursor: pointer;
		grid-row: 4 / 5;
		grid-column: span 3;
		font-size: 20px;
		position: relative;
		border: 6px solid transparent;
		border-radius: 10px;
	}
	button::after {
		content: "";
		position: absolute;
		top: -6px;
		left: -6px;
		width: 100%;
		height: 100%;
		background: linear-gradient(56deg, #9300ac, #1c3fff) border-box;
		mask: linear-gradient(white, black) padding-box,
			linear-gradient(white, white);
		mask-composite: exclude;
		border-radius: inherit;
		border: inherit;
	}
	button:disabled {
		background-color: gray;
		cursor: not-allowed;
	}
`;
