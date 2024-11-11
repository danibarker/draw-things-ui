import { useEffect, useMemo, useState } from "react";
import { Column, Row, Section } from "../styled-components";
import { useSettings } from "../useSettings";
import styled from "styled-components";
interface SelectableButtonProps {
	$isselected: string;
}

const SelectableButton = styled.button<SelectableButtonProps>`
	padding: 0px 2px;
	aspect-ratio: 1.9;
	width: 70px;
	font-weight: 500;
	font-size: 10px;
	background: none;
	border: 1px solid transparent;
	&:after {
		transition: all 1s ease infinite;
		animation: ${props =>
			props.$isselected == "true" ? "pulse 1s infinite" : "none"};
	}
	animation: ${props =>
		props.$isselected === "true" ? "pulse 1s infinite" : "none"};
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
				panoramic: {
					small: [768, 256],
					medium: [1152, 384],
					large: [1728, 576],
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
					<SpecialColumn style={{ marginBottom: "10px" }}>
						<SelectableButton
							$isselected={aspectRatio === "square" ? "true" : "false"}
							onClick={() => setAspectRatio("square")}
						>
							Square
						</SelectableButton>
						<SelectableButton
							$isselected={aspectRatio === "landscape" ? "true" : "false"}
							onClick={() => setAspectRatio("landscape")}
						>
							Landscape
						</SelectableButton>
						<SelectableButton
							$isselected={aspectRatio === "portrait" ? "true" : "false"}
							onClick={() => setAspectRatio("portrait")}
						>
							Portrait
						</SelectableButton>
					</SpecialColumn>
					<SpecialColumn>
						<SelectableButton
							$isselected={aspectRatio === "tall" ? "true" : "false"}
							onClick={() => setAspectRatio("tall")}
						>
							Tall
						</SelectableButton>
						<SelectableButton
							$isselected={aspectRatio === "wide" ? "true" : "false"}
							onClick={() => setAspectRatio("wide")}
						>
							Wide
						</SelectableButton>
						<SelectableButton
							$isselected={aspectRatio === "panoramic" ? "true" : "false"}
							onClick={() => setAspectRatio("panoramic")}
						>
							Panoramic
						</SelectableButton>
					</SpecialColumn>
				</Row>
				<Row>
					<label htmlFor="controls">Size</label>
					<SpecialColumn>
						<SelectableButton
							$isselected={size === "small" ? "true" : "false"}
							onClick={() => setSize("small")}
						>
							Small
						</SelectableButton>
						<SelectableButton
							$isselected={size === "medium" ? "true" : "false"}
							onClick={() => setSize("medium")}
						>
							Medium
						</SelectableButton>
						<SelectableButton
							$isselected={size === "large" ? "true" : "false"}
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
