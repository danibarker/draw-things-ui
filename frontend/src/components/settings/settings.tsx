// import controls from "./controls.json";
// import refiners from "./refiners.json";
// import seedModes from "./seedModes.json";
import { useState } from "react";
import { LeftPanel, Main } from "./styled-components";
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

// const controlImportances = ["balanced", "prompt", "control"];
// const controlSettings = {
//   guidanceStart: { min: 0, max: 1 },
//   guidanceEnd: { min: 0, max: 1 },
//   controlImportance: { options: controlImportances },
//   weight: { min: 0, max: 1 },
//   noPrompt: { options: [true, false] },
//   inputOverride: "",
//   targetBlocks: [],
//   file: { options: controls },
//   globalAveragePooling: { options: [true, false] },
//   downSamplingRate: { min: 0, max: 1 }, // tile and upscale
// };

const Settings = () => {
  const [openPanel, setOpenPanel] = useState(true);
  const { isAdvanced } = useSettings();
  return (
    <LeftPanel open={openPanel}>
      <PageHeader setOpenPanel={setOpenPanel} openPanel={openPanel} />
      <Main>
        <PromptSection />
        {isAdvanced && <ModelSection />}
        <LoraSection />
        {isAdvanced && <StrengthSeedSection />}
        {isAdvanced && <StepsGuidanceSection />}
        {isAdvanced ? <SizeSection /> : <SimpleSizeSection />}
        {!isAdvanced && <SamplerSection />}
      </Main>
    </LeftPanel>
  );
};

export default Settings;
