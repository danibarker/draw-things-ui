import styled from "styled-components";
const ScrollWindow = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	height: 100%;
	width: 100%;
	gap: 5px;
	overflow-y: auto;
	grid-template-rows: repeat(20, 50%);

	img {
		width: 100%;
	}
	div {
		height: 30%;
		width: auto;
		display: flex;
		flex-direction: column;
		gap: 5px;
		p {
			font-size: 16px;
		}
		h2 {
			font-size: 24px;
		}
	}
	.icon {
		width: 100%;
		height: 100%;
		opacity: 0.4;
	}
`;
const RightPanel = styled.div<{ wide: boolean }>`
	position: relative;
	background-color: rgb(50, 50, 50);
	height: 100%;
	width: 100%;
	outline: rgb(69, 9, 233) solid 3px;
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		font-size: 24px;
		grid-column: 1 / 9;
		grid-row: 1;
		text-align: center;
	}
	grid-column: ${props => (props.wide ? "1 / 4" : "2 / 4")};
	grid-row: 1;

	&* {
		outline: rgb(215, 99, 153) solid 3px;
	}
`; // This is a type definition for the props of the Modal component

const DropdownWithButtons = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const DropdownBox = styled.div<{ open?: boolean }>`
	display: ${props => (props.open ? "block" : "none")};
	position: absolute;
	top: 50px;
	left: 0;
	background-color: #170202;
	border: 2px solid var(--primary-color);
	width: 50%;
	place-self: center;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	height: 400px;
	overflow-y: auto;
`;
const DropDownOpener = styled.button`
	width: 25%;
`;

const DropdownOption = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid var(--primary-color);
	padding: 12px 16px;
	button {
		font-weight: 100;
		color: white;
		padding: 8px;
		cursor: pointer;
		font-size: 16px;
	}
`;
const Row = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
const Column = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	gap: 20px;
`;
const Section = styled.div`
	padding: 10px 30px;
	border-bottom: 1px solid #838383;
	display: flex;
	flex-direction: row;
	label {
		margin-bottom: 8px;
	}
`;
const LeftPanel = styled.div<{ open?: boolean }>`
	width: 600px;
	transform: translateX(${props => (props.open ? "0" : "-565px")});
	height: 100%;
	background-color: #121212;
	overflow: auto;
	display: flex;
	flex-direction: column;
	grid-area: ${props => (props.open ? "1 / 1 / auto / 2" : "1 / 1 / 1 / 1")};
`;
const LorasList = styled.ul`
	list-style-type: none;
	li {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #333;
		input {
			width: 200px;
			margin-left: auto;
			margin-right: 50px;
			margin-top: 18px;
		}
		.input_label {
			position: absolute;
			top: 0;
			right: 40%;
			color: white;
		}
	}
`;
const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 28px;
	background-color: #333;
	color: white;
	button {
		background-color: transparent;
		color: white;
		font-size: 24px;
		border: none;
		cursor: pointer;
	}
	h1 {
		font-size: 24px;
	}
`;
const SettingsPage = styled.main`
	overflow-y: auto;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

export {
	DropdownWithButtons,
	DropdownBox,
	DropDownOpener,
	DropdownOption,
	Row,
	Column,
	Section,
	LeftPanel,
	LorasList,
	Header,
	SettingsPage as Main,
	ScrollWindow,
	RightPanel,
};
