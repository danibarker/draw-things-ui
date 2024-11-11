import { Column, Row, Section } from "../styled-components";
import { useSettings } from "../useSettings";

function StrengthSeedSection() {
	const settings = useSettings();
	return (
		<Section>
			<Column>
				<Row>
					<label htmlFor="controls">Strength</label>
					<span>{Math.ceil(settings.settings.strength * 100)}%</span>
					<input
						type="range"
						min={0}
						max={1}
						step={0.1}
						value={settings.settings.strength}
						onChange={event => {
							settings.setSettings({
								...settings.settings,
								strength: parseFloat(event.target.value),
							});
						}}
					/>
				</Row>

				{/* seed */}
				<Row>
					<label htmlFor="controls">Seed</label>
					<input
						style={{
							width: "200px",
							fontSize: "16px",
							padding: "0px",
							marginBottom: "4px",
						}}
						onChange={event => {
							settings.setSettings({
								...settings.settings,
								seed: parseInt(event.target.value) || -1,
							});
						}}
						value={
							settings.settings.seed === -1 ? "Random" : settings.settings.seed
						}
					/>

					<input
						type="range"
						min={-1}
						max={4294967295}
						step={1}
						value={settings.settings.seed}
						onChange={event => {
							settings.setSettings({
								...settings.settings,
								seed: parseInt(event.target.value),
							});
						}}
					/>
				</Row>
			</Column>
		</Section>
	);
}

export default StrengthSeedSection;
