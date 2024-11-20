import styled, {
	// css,
	keyframes,
} from "styled-components";
import { Button } from "./styled-components";
const spin = ({
	$color1,
	$color2,
}: {
	$color1: string;
	$color2: string;
}) => keyframes`

	0% {
		background: linear-gradient(0deg, ${$color1}, ${$color2});
	}
	10% {
		background: linear-gradient(36deg, ${$color1}, ${$color2});
	}
	20% {
		background: linear-gradient(72deg, ${$color1}, ${$color2});
	}
	30% {
		background: linear-gradient(108deg, ${$color1}, ${$color2});
	}
	40% {
		background: linear-gradient(144deg, ${$color1}, ${$color2});
	}
	50% {
		background: linear-gradient(180deg, ${$color1}, ${$color2});
	}
	60% {
		background: linear-gradient(216deg, ${$color1}, ${$color2});
	}
	70% {
		background: linear-gradient(252deg, ${$color1}, ${$color2});
	}
	80% {
		background: linear-gradient(288deg, ${$color1}, ${$color2});
	}
	90% {
		background: linear-gradient(324deg, ${$color1}, ${$color2});
	}
	100% {
		background: linear-gradient(360deg, ${$color1}, ${$color2});
	}

`;
export const Window = styled.div`
	display: grid;
	grid-template-rows: 1fr 40px;
	height: 100%;
	overflow: hidden;
`;

export const Nav = styled.nav`
	height: 40px;
	background: var(--input-bg);
	border-bottom: 0.1px solid var(--border-color-1);
	color: var(--text-color);
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

export const Main = styled.main<{ $hideGallery: boolean }>`
	display: grid;
	grid-template-columns: 500px 5fr; /* Left auto width, Right takes remaining */
	height: 100%;
	overflow: hidden;

	@media (max-width: 500px) {
		grid-template-columns: 1fr;
		grid-template-rows: ${props =>
			props.$hideGallery ? "1fr 50px" : "1fr 1fr"};
		gap: 1rem;
	}
`;

/* Left Side (2 rows) */
export const LeftSide = styled.div`
	height: 100%;
	overflow: hidden;
	border-right: 0.1px solid var(--border-color-1);
	display: grid;
	grid-template-rows: 50px 1fr; /* Title Bar (50px) + Scrollable Settings */

	@media (max-width: 500px) {
		border-bottom: 2px solid var(--border-color-1);
	}
`;

export const RightSide = styled.div`
	overflow: hidden;
	height: 100%;
	display: grid;
	grid-template-rows: 50px 1fr;
	position: relative;

	@media (max-width: 500px) {
		grid-template-rows: 100px 1fr;
		border-top: 2px solid var(--border-color-1);
	}
`;

export const TitleBar = styled.div`
	height: 50px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-left: 10px;
	border-bottom: 0.1px solid var(--border-color-1);
	h2 {
		font-size: 29px;
		font-weight: 100;
		margin-left: auto;
		margin-right: auto;
	}
`;

export const Scrollable = styled.div`
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
`;

export const Images = styled.div`
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 10px;
	/* Light background for contrast */
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: 10px;
	img,
	.img {
		width: 100%;
		height: auto;
		display: block;
	}
`;

// const animationRule = css`
// 	${props: { $color1: string, $color2: string } => spin(props.$color1, props.$color2)} 1s infinite alternate;
// `;
export const ModalContent = styled.div<{ $color1: string; $color2: string }>`
	position: absolute;
	border: 4px solid transparent;
	border-radius: 20px;
	color: var(--text-color);
	width: 670px;
	height: 460px;

	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 199;
	&::after {
		content: "";
		position: absolute;
		pointer-events: none;
		top: -4px;
		left: -4px;
		width: 100%;
		height: 100%;
		background: linear-gradient(137deg, var(--highlight-3), var(--highlight-4))
				padding-box,
			linear-gradient(45deg, var(--highlight-1), var(--highlight-2)) border-box;
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
		animation: ${props =>
				spin({ $color1: props.$color1, $color2: props.$color2 })}
			2s infinite;
	}
`;

export const PhotoGallery = styled.div<{ $both: boolean }>`
	display: grid;
	grid-template-rows: ${props => (props.$both ? "1fr auto 1fr" : "1fr")};
	height: 100%;
	overflow: hidden;
`;

export const ImageOptions = styled.div`
	display: flex;
	gap: 10px;
	justify-content: center;
	align-items: center;
	margin: auto;
	height: 50px;
	flex-direction: row;
	position: relative;

	@media (max-width: 500px) {
		margin: 0;
	}
`;

export const Divider = styled.div`
	width: 100%;
	height: 1px;
	background: var(--border-color-1);
	margin: 1rem 0;
`;

export const DeleteButton = styled(Button)`
	position: absolute;
	top: 0;
	right: 0;
	background: transparent;
	color: var(--highlight-1);
	border: none;
	padding: 0.5rem;
	cursor: pointer;
`;

export const ImageSaveContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	input {
		margin-bottom: 0.5rem;
		height: 24px;
		width: 100%;
		padding: 0 10px;
	}
	button {
		height: 24px;
		padding: 0 10px;
		width: 100%;
		margin-bottom: 0.5rem;
	}
`;

export const ImageContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	img {
		width: 100%;
	}
`;
