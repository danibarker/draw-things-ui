import { Row, Section } from "../../shared/styled-components";
import { useSettings } from "../useSettings";

function ModelSection() {
	const settings = useSettings();
	const models = settings.models;
	return (
		<Section>
			<Row>
				<label htmlFor="model">Model</label>
				<select
					id="model-category"
					name="model-category"
					value={settings.settings.model_category}
					onChange={event => {
						const model_category = event.target.value;
						settings.setSettings({
							...settings.settings,
							model_category: model_category,
						});
					}}
				>
					<option value="">Select Model Category</option>
					{Object.keys(models).map(key => (
						<option key={key} value={key}>
							{key}
						</option>
					))}
				</select>
				<select
					id="model"
					name="model"
					value={settings.settings.model}
					onChange={event => {
						const model = event.target.value;
						settings.setSettings({
							...settings.settings,
							model,
						});
					}}
				>
					<option value="">Select Model</option>
					{settings.settings.model_category &&
						Object.entries(models[settings.settings.model_category] ?? {}).map(
							([key, value]) => (
								<option key={key} value={value}>
									{key}
								</option>
							)
						)}
				</select>
			</Row>
		</Section>
	);
}

export default ModelSection;
