import { Column, Row, Section } from "../styled-components";
import { useSettings } from "../useSettings";

function SizeSection() {
  const settings = useSettings();
  return (
    <Section>
      <Column>
        <Row>
          <label htmlFor="controls">Width</label>
          <span>{settings.settings.width}</span>
          <input
            type="range"
            min={144}
            max={2000}
            step={1}
            value={settings.settings.width}
            onChange={(event) => {
              settings.setSettings({
                ...settings.settings,
                width: parseInt(event.target.value),
              });
            }}
          />
        </Row>
        <Row>
          <label htmlFor="controls">Height</label>
          <span>{settings.settings.height}</span>
          <input
            type="range"
            min={144}
            max={2000}
            step={1}
            value={settings.settings.height}
            onChange={(event) => {
              settings.setSettings({
                ...settings.settings,
                height: parseInt(event.target.value),
              });
            }}
          />
        </Row>
      </Column>
    </Section>
  );
}

export default SizeSection;
