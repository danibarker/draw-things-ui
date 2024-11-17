import { Column, Row, Section } from "../../shared/styled-components";
import { useSettings } from "../useSettings";

function SizeSection() {
	// const sizes = [
	//   128, 256, 320, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960, 1024, 1088,
	//   1152, 1216, 1280, 1344, 1408, 1472, 1536, 1600, 1664, 1728, 1792, 1856,
	//   1920, 1984, 2048,
	// ];

	const settings = useSettings();
	return (
		<Section>
			<Column>
				<Row>
					<label htmlFor="controls">Width</label>
					<span>{settings.settings.width}</span>
					<input
						type="range"
						min={144}
						max={2000}
						step={1}
						value={settings.settings.width}
						onChange={event => {
							settings.setSettings({
								...settings.settings,
								width: parseInt(event.target.value),
							});
						}}
					/>
				</Row>
				<Row>
					<label htmlFor="controls">Height</label>
					<span>{settings.settings.height}</span>
					<input
						type="range"
						min={144}
						max={2000}
						step={1}
						value={settings.settings.height}
						onChange={event => {
							settings.setSettings({
								...settings.settings,
								height: parseInt(event.target.value),
							});
						}}
					/>
				</Row>
			</Column>
		</Section>
	);
}

export default SizeSection;
