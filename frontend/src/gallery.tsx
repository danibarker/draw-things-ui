import { useState } from "react";
import { useSettings } from "./components/settings/useSettings";
import axios from "axios";
import {
	DeleteButton,
	Divider,
	ImageContainer,
	ImageOptions,
	Images,
	PhotoGallery,
	TitleBar,
} from "./components/shared/layout-elements";
import { SelectableButton } from "./components/shared/styled-components";
import SaveImage from "./save-image";

const Gallery = () => {
	const {
		setUnsavedImages,
		unsavedImages,
		setSavedImages,
		savedImages,
		queue,
	} = useSettings();
	const [showSaved, setShowSaved] = useState(false);
	const [showUnsaved, setShowUnsaved] = useState(true);
	const deleteImage = async (type: string, image: string) => {
		if (type === "unsaved") {
			setUnsavedImages(unsavedImages.filter(img => img !== image));
			await axios.post("/api/images/delete", {
				filename: image,
				saved: false,
			});
		} else {
			setSavedImages(savedImages.filter(img => img !== image));
			await axios.post("/api/images/delete", {
				filename: image,
				saved: true,
			});
		}
	};

	console.log("savedImages,unsavedImages", savedImages, unsavedImages);

	return (
		<>
			<TitleBar>
				<h2>Gallery</h2>
				<ImageOptions>
					<SelectableButton
						$isselected={showUnsaved}
						onClick={() => setShowUnsaved(!showUnsaved)}
					>
						Unsaved
					</SelectableButton>
					<SelectableButton
						$isselected={showSaved}
						onClick={() => setShowSaved(!showSaved)}
					>
						Saved
					</SelectableButton>
				</ImageOptions>
			</TitleBar>
			<PhotoGallery $both={showSaved && showUnsaved}>
				{showUnsaved && (
					<Images>
						{queue.map((settings, index) => (
							<div key={index} className="img">
								<h2>Queue {index + 1}</h2>
								<p>{settings.prompt}</p>
							</div>
						))}
						{unsavedImages.map((image: string) => (
							<ImageContainer>
								<DeleteButton onClick={() => deleteImage("unsaved", image)}>
									X
								</DeleteButton>
								<img
									key={image}
									src={`/api/images/byfilename?filename=${encodeURIComponent(
										image
									)}.png`}
									alt="Generated"
								/>
								<SaveImage filename={image} />
							</ImageContainer>
						))}
					</Images>
				)}
				{showSaved && showUnsaved && (
					<div>
						<Divider />
						<h2>Saved Images</h2>
					</div>
				)}
				{showSaved && (
					<Images>
						{savedImages.map((image: string) => (
							<ImageContainer>
								<DeleteButton onClick={() => deleteImage("saved", image)}>
									X
								</DeleteButton>
								<img
									key={image}
									src={`/api/images/saved?filename=${encodeURIComponent(
										image
									)}.png`}
									alt="Generated"
								/>
							</ImageContainer>
						))}
					</Images>
				)}
			</PhotoGallery>
		</>
	);
};

export default Gallery;
