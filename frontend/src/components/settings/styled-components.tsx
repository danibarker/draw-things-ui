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
	height: 100%;
	width: 100%;
	outline: var(--outline-1) solid 3px;
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
		outline: var(--outline-2) solid 3px;
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
	border: 2px solid var(--primary-color);
	width: 50%;
	place-self: center;
	box-shadow: 0px 8px 16px 0px var(--transparent-shadow);
	z-index: 1;
	height: 400px;
	overflow-y: auto;
`;

const DropdownOption = styled.div`
	display: flex;
	background-color: var(--panel-bg);
	justify-content: space-between;
	align-items: center;
	border: 1px solid var(--highlight-1);
	padding: 12px 16px;
	Button {
		font-weight: 100;
		color: var(--text-color);
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
		border-bottom: 1px solid var(--border-color-1);
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
			color: var(--text-color);
		}
	}
`;
const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 28px;
	color: white;
	Button {
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

const Button = styled.button`
	font-family: var(--font-4), serif;
	padding: 5px 10px;
	max-width: 120px;
	cursor: pointer;
	font-size: 16px;
	position: relative;
	border: 1px solid transparent;
	border-radius: 5px;
	font-weight: 400;
	background-color: transparent;
	color: var(--text-color);
	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	&:after {
		content: "";
		position: absolute;
		top: -1.5px;
		left: -1.5px;
		width: 100%;
		height: 100%;
		background: linear-gradient(179deg, var(--highlight-1), var(--highlight-2))
			border-box;
		mask: linear-gradient(white, white) padding-box,
			linear-gradient(white, white);
		mask-composite: exclude;
		border-radius: inherit;
		border: inherit;
		border-style: inherit;
	}
	&:disabled::after {
		background: linear-gradient(
				90deg,
				var(--disabled-border-gradient-1),
				var(--disabled-border-gradient-2)
			)
			border-box;
		animation: pulse-disabled 1s infinite;
	}

	&.solid {
		background-color: var(--highlight-1);
		color: var(--text-color);
		&:hover {
			background-color: var(--highlight-2);
		}
	}
`;

const DropDownOpener = styled(Button)`
	width: 25%;
`;

export {
	Button,
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
