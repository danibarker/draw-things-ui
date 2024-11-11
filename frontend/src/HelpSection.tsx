import styled from "styled-components";

interface HelpProps {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HelpSection = ({ setModalOpen }: HelpProps) => {
	return (
		<HelpContainer>
			<div>
				<button onClick={() => setModalOpen(false)}>Close</button>
				<h2>Help</h2>
			</div>
			<div className="scroll">
				<div
					style={{
						gridRow: 1,
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
					}}
				>
					<div>
						<p>
							Welcome to the AmagineIt! This is a tool that allows you to
							generate images using some of the best AI models available,
							Including the new Flux.1! The standard view is pretty simple, as
							soon as you figure out a good prompt.
						</p>
						<p>
							If you're having any trouble getting results that match what
							you're looking for, each of the models have their own set of
							inputs that they were trained on.
						</p>
					</div>
					<div>
						<p>
							You can view the images you've generated in the gallery on the
							right side of the page. Click on an image to view it in full size.
						</p>
						<p>
							If you want the advanced settings, in the prompt area, just type
							"advanced settings". To go back, type "basic settings"
						</p>
						<p>
							That's it! Have fun creating your own AI-generated art, and feel
							free to reach out if you have any questions or feedback.
						</p>
					</div>
					<div>
						<p>
							You can also view how many are in the queue ahead of you at the
							top{" "}
							<img
								style={{
									height: "30px",
									width: "auto",
									outline: "2px solid white",
									margin: "10px",
								}}
								src="./queue.png"
							/>
						</p>

						<p>
							That's it! Have fun creating your own AI-generated art, and feel
							free to reach out if you have any questions or feedback.
						</p>
						<p>Features coming soon: </p>
						<p>Login - save your favorite settings, share images with others</p>
						<p>
							Contact Me - report bugs, ask for features, ask for specific
							LoRAs, etc
						</p>
						<p>
							Better Help/Tutorials, or at least links to some vetted ones from
							other people
						</p>
						<p>
							Time remaining estimate so you know how long you'll be waiting for
							your image
						</p>
					</div>
				</div>
				<div
					style={{
						gridRow: 2,
						display: "grid",
						gap: "20px",
						gridTemplateColumns: "1fr 1fr 1fr",
						marginTop: "20px",
						borderTop: "1px solid #888",
						padding: "20px 0",
					}}
				>
					<div>
						<p>
							For good results with Flux, you'll get the best results if you
							give a few very descriptive sentences about the image you want to
							see. The best results will include all or most of the following:
							<br />
							<br />
							<ul>
								<li>Subject: The main focus of the image.</li>
								<br />
								<li>Style: The artistic approach or visual aesthetic.</li>
								<br />
								<li>
									Composition: How elements are arranged within the frame.{" "}
									<br />
								</li>
							</ul>
						</p>
					</div>
					<div>
						<p>
							<ul>
								<li>Lighting: The type and quality of light in the scene.</li>
								<br />
								<li>Color Palette: The dominant colors or color scheme.</li>
								<br />
								<li>
									Mood/Atmosphere: The emotional tone or ambiance of the image.
								</li>
								<br />
								<li>
									Technical Details: Camera settings, perspective, or specific
									visual techniques.
								</li>
								<br />
								<li>
									Additional Elements: Supporting details or background
									information.
								</li>
							</ul>
						</p>
					</div>

					<div>
						<p>
							Below are some examples of prompts, any of them are likely to give
							you decent results, but if you want to get all the value of the
							Flux.1 model, go bigger! To give you an idea of what works well:
						</p>
						<p>
							Poor: "A portrait of a woman"
							<br />
							Better: "A close-up portrait of a middle-aged woman with curly red
							hair, green eyes, and freckles, wearing a blue silk blouse"
							<br />
						</p>
					</div>
				</div>
				<div
					style={{
						gridRow: 3,
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
					}}
				>
					<div style={{ gridColumn: "1 / 4", gridRow: "1" }}>
						<p>
							Best: "Layer 1 (Background): Depict a vast, otherworldly desert
							landscape under a burnt orange and teal sky. Strange, towering
							rock formations and distant, jagged cliffs rise against the
							horizon, with two large planets and multiple moons looming
							prominently above, casting long shadows.
							<br />
						</p>
						<p>
							Layer 2 (Middle ground): Focus on a shimmering oasis surrounded by
							bioluminescent plants with twisted, translucent leaves. Odd,
							crystalline structures jut from the sand, and faint reflections of
							the sky dance across their facets. A few scattered alien creatures
							with iridescent wings and elongated limbs are resting near the
							water.
							<br />
						</p>
					</div>

					<div style={{ gridColumn: "1 / 4", gridRow: "2" }}>
						<p>
							Layer 3 (Foreground): Populate the scene with strange desert
							flora, twisted and stretching towards the sky. A winding path
							lined with glowing rocks leads into the oasis. Unique, spiny
							plants with blue and purple hues frame the view, and a lone,
							cloaked traveler with intricate, futuristic armor observes the
							scene, holding a staff adorned with glowing symbols. Atmosphere:
							The overall mood should be mystical and slightly ominous, with an
							eerie, tranquil silence filling the air. The landscape feels
							ancient and magical, as if imbued with secrets from a
							long-forgotten civilization."
						</p>
					</div>
					<div style={{ gridColumn: "1 / 4", gridRow: "3" }}>
						<p>
							Here is the above prompts result, and a few more to give you ideas
						</p>
						<img style={{ width: "100%", marginTop: "20px" }} src="./1.png" />
						<img style={{ width: "100%", marginTop: "20px" }} src="./2.png" />
						<img style={{ width: "100%", marginTop: "20px" }} src="./3.png" />
						<img style={{ width: "100%", marginTop: "20px" }} src="./4.png" />
						<img style={{ width: "100%", marginTop: "20px" }} src="./5.png" />
						<img style={{ width: "100%", marginTop: "20px" }} src="./6.png" />
						<img style={{ width: "100%", marginTop: "20px" }} src="./7.png" />
						<img style={{ width: "100%", marginTop: "20px" }} src="./8.png" />
						<img style={{ width: "100%", marginTop: "20px" }} src="./9.png" />
					</div>
				</div>
			</div>
		</HelpContainer>
	);
};

const HelpContainer = styled.div`
	/* overflow: hidden; */
	width: 100%;
	height: 100%;
	background: var(--panel-bg);
	text-align: center;
	padding: 40px 0px 0 0;
	.scroll {
		background: var(--input-bg);
		overflow: auto;
		padding: 40px;
		font-size: 14px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		height: 80%;

		img {
			width: 50px;
		}
	}
	h2 {
		text-align: center;
		font-size: 24px;
		font-weight: 100;
		margin-bottom: 20px;
	}
`;
