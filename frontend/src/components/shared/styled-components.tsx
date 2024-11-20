import styled from "styled-components";

export const DropdownWithButtons = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
export const DropdownBox = styled.div<{ open?: boolean }>`
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

export const DropdownOption = styled.div`
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
export const Row = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
export const Column = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	gap: 20px;
`;
export const Section = styled.div`
	padding: 10px 30px;
	border-bottom: 1px solid #838383;
	display: flex;
	flex-direction: row;
	label {
		margin-bottom: 8px;
	}
`;
export const LorasList = styled.ul`
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

export const Button = styled.button`
	font-family: var(--font-4), serif;
	padding: 5px 10px;
	max-width: 165px;
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
		background-color: var(--highlight-1a);
		color: var(--text-color);
		&:hover {
			background-color: var(--highlight-2a);
		}
	}
	&.selected {
		background-color: var(--highlight-2a);
		color: var(--text-color);
	}
`;

export const DropDownOpener = styled(Button)`
	width: 25%;
`;

interface SelectableButtonProps {
	$isselected: boolean;
}
export const SelectableButton = styled(Button)<SelectableButtonProps>`
	padding: 0px 2px;
	aspect-ratio: 1.9;
	width: 70px;
	font-weight: 500;
	font-size: 10px;
	background: none;
	border: 1px solid transparent;
	&:after {
		transition: all 1s ease infinite;
		animation: ${props => (props.$isselected ? "pulse 1s infinite" : "none")};
	}
	animation: ${props => (props.$isselected ? "pulse 1s infinite" : "none")};
`;
