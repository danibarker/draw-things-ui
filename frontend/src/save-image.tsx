import { useState } from "react";
import { useSettings } from "./components/settings/useSettings";
import axios from "axios";
import { ImageSaveContainer } from "./components/shared/layout-elements";
import { Button } from "./components/shared/styled-components";

const SaveImage = ({ filename }: { filename: string }) => {
	const [savename, setSavename] = useState("");
	const { setSavedImages, setUnsavedImages } = useSettings();
	const saveImage = async () => {
		await axios.post("/api/images/save", {
			filename,
			savename,
		});
		setSavedImages(prev => [...prev, savename]);
		setUnsavedImages(prev => prev.filter(img => img !== filename));
	};
	return (
		<ImageSaveContainer>
			<input
				placeholder="Title"
				value={savename}
				type="text"
				onChange={e => setSavename(e.target.value)}
			/>
			<Button onClick={() => saveImage()}>Save</Button>
		</ImageSaveContainer>
	);
};

export default SaveImage;
