import { Button, LeftPanel, Main } from "../shared/styled-components";
import PageHeader from "./page-header";
import SamplerSection from "./sections/sampler-section";
import SizeSection from "./sections/size-section";
import ModelSection from "./sections/model-section";
import LoraSection from "./sections/loras-section";
import StrengthSeedSection from "./sections/strength-seed-section";
import StepsGuidanceSection from "./sections/steps-guidance";
import PromptSection from "./sections/prompt-section";
import SimpleSizeSection from "./sections/simple-size-section";
import { useSettings } from "./useSettings";
import styled from "styled-components";
import { WindowMaximize, WindowMinimize } from "../icons";
/*
const controlImportances = ["balanced", "prompt", "control"];
const controlSettings = {
	guidanceStart: { min: 0, max: 1 },
	guidanceEnd: { min: 0, max: 1 },
	controlImportance: { options: controlImportances },
	weight: { min: 0, max: 1 },
	noPrompt: { options: [true, false] },
	inputOverride: "",
	targetBlocks: [],
	file: { options: controls },
	globalAveragePooling: { options: [true, false] },
	downSamplingRate: { min: 0, max: 1 }, // fork tile and upscale
};
*/
interface SettingsProps {
	openPanel: boolean;
	setOpenPanel: React.Dispatch<React.SetStateAction<boolean>>;
}
const PanelCollapseButton = styled(Button)<{ open?: boolean }>`
	position: absolute;
	left: ${props => (props.open ? "600px" : "0")};

	top: 50px;
	border: none;
	background: var(--input-bg);
	z-index: 99;
	svg {
		width: 20px;
		height: 20px;
	}
`;
const Settings = ({ openPanel, setOpenPanel }: SettingsProps) => {
	const { isAdvanced } = useSettings();
	return (
		<>
			<PanelCollapseButton
				open={openPanel}
				onClick={() => setOpenPanel((prev: boolean) => !prev)}
			>
				{openPanel ? (
					<WindowMinimize fill="black" stroke="black" strokeWidth={1} />
				) : (
					<WindowMaximize fill="black" stroke="black" strokeWidth={1} />
				)}
			</PanelCollapseButton>
			<LeftPanel open={openPanel}>
				<PageHeader />
				<Main>
					<PromptSection />
					{isAdvanced && <ModelSection />}
					<LoraSection />
					{isAdvanced && <StrengthSeedSection />}
					{isAdvanced && <StepsGuidanceSection />}
					{isAdvanced ? <SizeSection /> : <SimpleSizeSection />}
					{isAdvanced && <SamplerSection />}
				</Main>
			</LeftPanel>
		</>
	);
};

export default Settings;
