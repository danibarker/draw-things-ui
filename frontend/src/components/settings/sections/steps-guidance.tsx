import { Column, Row, Section } from "../styled-components";
import { useSettings } from "../useSettings";

function StepsGuidanceSection() {
  const settings = useSettings();
  return (
    <Section>
      <Column>
        <Row>
          <label htmlFor="controls">Steps</label>
          <span>{settings.settings.steps}</span>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={settings.settings.steps}
            onChange={(event) => {
              settings.setSettings({
                ...settings.settings,
                steps: parseInt(event.target.value),
              });
            }}
          />
        </Row>
        <Row>
          <label htmlFor="controls">Text Guidance</label>
          <span>{settings.settings.guidance_scale}</span>
          <input
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={settings.settings.guidance_scale}
            onChange={(event) => {
              settings.setSettings({
                ...settings.settings,
                guidance_scale: parseFloat(event.target.value),
              });
            }}
          />
        </Row>
      </Column>
    </Section>
  );
}

export default StepsGuidanceSection;
