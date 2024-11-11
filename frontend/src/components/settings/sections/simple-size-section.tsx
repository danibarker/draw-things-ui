import { useEffect, useMemo, useState } from "react";
import { Column, Row, Section } from "../styled-components";
import { useSettings } from "../useSettings";
import styled from "styled-components";
interface SelectableButtonProps {
	isSelected: boolean;
}

const SelectableButton = styled.button<SelectableButtonProps>`
	padding: 4px;
	aspect-ratio: 1;
	width: 100%;
	font-weight: 100;
	font-size: 14px;

	&:after {
		background: ${props => {
			console.log("isSelected", props.isSelected);
			return props.isSelected ?
					"linear-gradient(179deg, #5c3bff, #e91e76) border-box"
				:	"linear-gradient(179deg, #3bf5ff, #ac1ee9) border-box";
		}};
		transition: background-color 2s ease infinite;
		animation: ${props => (props.isSelected ? "pulse 4s infinite" : "none")};
	}
`;

const SpecialColumn = styled(Column)``;
function SimpleSizeSection() {
	const { setSettings } = useSettings();
	const [aspectRatio, setAspectRatio] = useState("square");
	const [size, setSize] = useState("small");
	const quickSizes: { [key: string]: { [key: string]: [number, number] } } =
		useMemo(
			() => ({
				square: {
					small: [512, 512],
					medium: [768, 768],
					large: [960, 960],
				},

				landscape: {
					small: [512, 384],
					medium: [704, 512],
					large: [960, 704],
				},

				portrait: {
					small: [384, 512],
					medium: [512, 704],
					large: [704, 960],
				},
				tall: {
					small: [320, 640],
					medium: [512, 1024],
					large: [640, 1208],
				},
				wide: {
					small: [640, 320],
					medium: [1024, 512],
					large: [1208, 640],
				},
			}),
			[]
		);
	useEffect(() => {
		setSettings(prev => ({
			...prev,
			aspectRatio,
			size,
			width: quickSizes[aspectRatio][size][0],
			height: quickSizes[aspectRatio][size][1],
		}));
	}, [aspectRatio, size, quickSizes, setSettings]);

	return (
		<Section>
			<Row>
				<Row>
					<label htmlFor="controls">Aspect Ratio</label>
					<SpecialColumn>
						<SelectableButton
							isSelected={aspectRatio === "square"}
							onClick={() => setAspectRatio("square")}
						>
							Square
						</SelectableButton>
						<SelectableButton
							isSelected={aspectRatio === "landscape"}
							onClick={() => setAspectRatio("landscape")}
						>
							Landscape
						</SelectableButton>
						<SelectableButton
							isSelected={aspectRatio === "portrait"}
							onClick={() => setAspectRatio("portrait")}
						>
							Portrait
						</SelectableButton>
						<SelectableButton
							isSelected={aspectRatio === "tall"}
							onClick={() => setAspectRatio("tall")}
						>
							Tall
						</SelectableButton>
						<SelectableButton
							isSelected={aspectRatio === "wide"}
							onClick={() => setAspectRatio("wide")}
						>
							Wide
						</SelectableButton>
					</SpecialColumn>
				</Row>
				<Row>
					<label htmlFor="controls">Size</label>
					<SpecialColumn>
						<SelectableButton
							isSelected={size === "small"}
							onClick={() => setSize("small")}
						>
							Small
						</SelectableButton>
						<SelectableButton
							isSelected={size === "medium"}
							onClick={() => setSize("medium")}
						>
							Medium
						</SelectableButton>
						<SelectableButton
							isSelected={size === "large"}
							onClick={() => setSize("large")}
						>
							Large
						</SelectableButton>
					</SpecialColumn>
				</Row>
				<Row>
					<p>
						{quickSizes[aspectRatio][size][0]}X
						{quickSizes[aspectRatio][size][1]}
					</p>
				</Row>
			</Row>
		</Section>
	);
}

export default SimpleSizeSection;
