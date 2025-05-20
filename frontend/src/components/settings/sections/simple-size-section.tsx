import { useEffect, useMemo, useState } from "react";
import {
	Column,
	Row,
	Section,
	SelectableButton,
} from "../../shared/styled-components";
import { useSettings } from "../useSettings";
import styled from "styled-components";

const SpecialColumn = styled(Column)``;
function SimpleSizeSection() {
	const { setSettings } = useSettings();
	const [aspectRatio, setAspectRatio] = useState("square");
	const [size, setSize] = useState("small");
	const quickSizes: { [key: string]: { [key: string]: [number, number] } } =
		useMemo(
			() => ({
				square: {
					small: [384, 384],
					medium: [768, 768],
					large: [960, 960],
				},

				landscape: {
					small: [512, 256],
					medium: [704, 512],
					large: [960, 704],
				},

				portrait: {
					small: [256, 512],
					medium: [512, 704],
					large: [704, 960],
				},
				tall: {
					small: [192, 640],
					medium: [512, 1024],
					large: [640, 1208],
				},
				wide: {
					small: [640, 192],
					medium: [1024, 512],
					large: [1208, 640],
				},
				panoramic: {
					small: [768, 128],
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
							$isselected={aspectRatio === "square"}
							onClick={() => setAspectRatio("square")}
						>
							Square
						</SelectableButton>
						<SelectableButton
							$isselected={aspectRatio === "landscape"}
							onClick={() => setAspectRatio("landscape")}
						>
							Landscape
						</SelectableButton>
						<SelectableButton
							$isselected={aspectRatio === "portrait"}
							onClick={() => setAspectRatio("portrait")}
						>
							Portrait
						</SelectableButton>
					</SpecialColumn>
					<SpecialColumn>
						<SelectableButton
							$isselected={aspectRatio === "tall"}
							onClick={() => setAspectRatio("tall")}
						>
							Tall
						</SelectableButton>
						<SelectableButton
							$isselected={aspectRatio === "wide"}
							onClick={() => setAspectRatio("wide")}
						>
							Wide
						</SelectableButton>
						<SelectableButton
							$isselected={aspectRatio === "panoramic"}
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
							$isselected={size === "small"}
							onClick={() => setSize("small")}
						>
							Small
						</SelectableButton>
						<SelectableButton
							$isselected={size === "medium"}
							onClick={() => setSize("medium")}
						>
							Medium
						</SelectableButton>
						<SelectableButton
							$isselected={size === "large"}
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
