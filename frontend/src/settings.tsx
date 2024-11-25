import { useEffect, useState } from "react";
import LoraSection from "./components/settings/sections/loras-section";
import ModelSection from "./components/settings/sections/model-section";
import PromptSection from "./components/settings/sections/prompt-section";
import SamplerSection from "./components/settings/sections/sampler-section";
import SimpleSizeSection from "./components/settings/sections/simple-size-section";
import SizeSection from "./components/settings/sections/size-section";
import StepsGuidanceSection from "./components/settings/sections/steps-guidance";
import StrengthSeedSection from "./components/settings/sections/strength-seed-section";
import { Scrollable } from "./components/shared/layout-elements";
import { useSettings } from "./components/settings/useSettings";
import { Column, Row, Section } from "./components/shared/styled-components";

const Settings = ({ isAdvanced }: { isAdvanced: boolean }) => {
	return (
		<Scrollable>
			<PromptSection />
			{isAdvanced && <ModelSection />}
			<LoraSection />
			{isAdvanced && <StrengthSeedSection />}
			{isAdvanced && <StepsGuidanceSection />}
			{isAdvanced ? <SizeSection /> : <SimpleSizeSection />}
			{isAdvanced && <SamplerSection />}
			<ImageUploadSection />
		</Scrollable>
	);
};

export default Settings;

const ImageUploadSection = () => {
	const { settings, setSettings, setSizeLocked } = useSettings();
	const [images, setImages] = useState<FileList | null>(null);
	useEffect(() => {
		// check width and height of images[0]
		if (images) {
			const img = new Image();
			img.src = URL.createObjectURL(images[0]);
			img.onload = () => {
				setSettings(prev => ({
					...prev,
					width: img.width,
					height: img.height,
				}));
				setSizeLocked(true);
			};
		}
	}, [images, setSettings, setSizeLocked]);
	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files) {
			// convert to base64
			const reader = new FileReader();
			reader.onload = () => {
				const sixtyFour = reader.result as string;
				const cutPoint = sixtyFour.indexOf(",") + 1;
				setSettings({
					...settings,
					init_images: [(reader.result as string).slice(cutPoint)],
				});
			};

			reader.readAsDataURL(files[0]);
			setImages(files);
		}
	};

	return (
		<Section>
			<Row>
				<Row>
					<label htmlFor="image">Upload Image</label>
					<input
						type="file"
						id="image"
						accept="image/*"
						multiple={false}
						onChange={handleImageUpload}
					/>
				</Row>
				<Column>
					{images && (
						<>
							<img
								style={{ width: "100px", height: "100px" }}
								src={URL.createObjectURL(images[0])}
							/>
							<button onClick={() => setImages(null)}>Clear</button>
						</>
					)}
				</Column>
			</Row>
		</Section>
	);
};
