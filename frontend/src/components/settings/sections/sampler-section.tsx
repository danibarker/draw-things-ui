import { Row, Section } from "../../shared/styled-components";
import { useSettings } from "../useSettings";

const SamplerSection = () => {
	const settings = useSettings();
	const samplers = settings.samplers;
	return (
		<Section>
			<Row>
				<label htmlFor="sampler">Sampler</label>
				<select
					id="sampler"
					name="sampler"
					value={settings.settings.sampler}
					onChange={event => {
						const sampler = event.target.value;
						settings.setSettings({
							...settings.settings,
							sampler,
						});
					}}
				>
					<option value="">Select Sampler</option>
					{samplers &&
						samplers.map(({ sampler_name }) => (
							<option key={sampler_name} value={sampler_name}>
								{sampler_name}
							</option>
						))}
				</select>
			</Row>
		</Section>
	);
};

export default SamplerSection;
