import { useRef } from "react";
import {
	LeftSide,
	Main,
	PhotoGallery,
	RightSide,
	Scrollable,
	TitleBar,
	Window,
} from "./components/settings/layout-elements";
import { NavBar } from "./components/settings/navbar";
import LoraSection from "./components/settings/sections/loras-section";
import ModelSection from "./components/settings/sections/model-section";
import PromptSection from "./components/settings/sections/prompt-section";
import SamplerSection from "./components/settings/sections/sampler-section";
import SimpleSizeSection from "./components/settings/sections/simple-size-section";
import SizeSection from "./components/settings/sections/size-section";
import StepsGuidanceSection from "./components/settings/sections/steps-guidance";
import StrengthSeedSection from "./components/settings/sections/strength-seed-section";
import { useSettings } from "./components/settings/useSettings";
import { Modal } from "./Modal";
import { HelpSection } from "./HelpSection";
import { GetMoreLoras } from "./components/settings/get-more-loras";
const Layout = () => {
	const { isAdvanced, images, queue, modalOpen, setModalOpen, modalContent } =
		useSettings();
	const modalRef = useRef<HTMLDivElement>(null);

	return (
		<Window>
			{modalOpen && (
				<Modal modalRef={modalRef}>
					{modalContent === "help" ? (
						<HelpSection />
					) : (
						<GetMoreLoras setModalOpen={setModalOpen} />
					)}
				</Modal>
			)}
			<NavBar />
			<Main>
				<LeftSide>
					<TitleBar>
						<h1>Settings</h1>
					</TitleBar>
					<Scrollable>
						<PromptSection />
						{isAdvanced && <ModelSection />}
						<LoraSection />
						{isAdvanced && <StrengthSeedSection />}
						{isAdvanced && <StepsGuidanceSection />}
						{isAdvanced ? <SizeSection /> : <SimpleSizeSection />}
						{isAdvanced && <SamplerSection />}
					</Scrollable>
				</LeftSide>

				<RightSide>
					<TitleBar>Gallery</TitleBar>
					<PhotoGallery>
						{images.map(image => (
							<img key={image} src={`${image}`} alt="Generated" />
						))}
						{queue.map((settings, index) => (
							<div key={index} className="img">
								<h2>Queue {index + 1}</h2>
								<p>{settings.prompt}</p>
							</div>
						))}
					</PhotoGallery>
				</RightSide>
			</Main>
		</Window>
	);
};

export default Layout;
