import { ScrollWindow, RightPanel } from "../settings/styled-components";
import { useSettings } from "../settings/useSettings";

const ImageGallery = ({ openPanel }: { openPanel: boolean }) => {
	const settings = useSettings();
	const { images, queue } = settings;
	return (
		<RightPanel wide={!openPanel}>
			<h1>Generated Images</h1>
			<ScrollWindow>
				{images.map(image => (
					<img key={image} src={`${image}`} alt="Generated" />
				))}
				{queue.map((settings, index) => (
					<div key={index}>
						<h2>Queue {index + 1}</h2>
						<p>{settings.prompt}</p>
					</div>
				))}
			</ScrollWindow>
		</RightPanel>
	);
};

export default ImageGallery;
