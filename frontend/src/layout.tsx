import { useRef } from "react";
import {
	LeftSide,
	Main,
	RightSide,
	Scrollable,
	TitleBar,
	Window,
} from "./components/shared/layout-elements";
import { NavBar } from "./components/shared/navbar";
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
import { GetMoreLoras } from "./components/settings/sections/get-more-loras";
import Gallery from "./gallery";
const Layout = () => {
	const { isAdvanced, modalOpen, setModalOpen, modalContent } = useSettings();
	const modalRef = useRef<HTMLDivElement>(null);

	console.log("modalContent", modalContent);
	return (
		<Window>
			{modalOpen && (
				<Modal modalRef={modalRef} $color1="green" $color2="purple">
					{modalContent === "help" ? (
						<HelpSection setModalOpen={setModalOpen} />
					) : (
						<GetMoreLoras setModalOpen={setModalOpen} />
					)}
				</Modal>
			)}

			<Main>
				<LeftSide>
					<TitleBar>
						<h2>Settings</h2>
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
					<Gallery />
				</RightSide>
			</Main>
			<NavBar />
		</Window>
	);
};

export default Layout;
