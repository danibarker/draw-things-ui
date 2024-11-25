import { useState } from "react";

const App = () => {
	const [statusImage, setStatusImage] = useState<File | null>(null);
	return (
		<div>
			<button
				onClick={async () => {
					const res = await fetch("/api/check");
					// response is a ReadableStream, image.png is a Blob
					const image = await res.blob();
					// create a new File object
					const file = new File([image], "image.png", { type: "image/png" });
					setStatusImage(file);
				}}
			>
				Check
			</button>
			<button
				onClick={async () => {
					const res = await fetch("/api/start");
					const image = await res.blob();
					const file = new File([image], "image.png", { type: "image/png" });
					setStatusImage(file);
				}}
			>
				Insert
			</button>

			<div>
				{statusImage && (
					<img src={URL.createObjectURL(statusImage)} alt="status" />
				)}
			</div>
		</div>
	);
};

export default App;
