import { Row, Section } from "../styled-components";
import samplers from "../samplers.json";
import { useSettings } from "../useSettings";

const SamplerSection = () => {
  const settings = useSettings();
  return (
    <Section>
      <Row>
        <label htmlFor="sampler">Sampler</label>
        <select
          id="sampler"
          name="sampler"
          onChange={(event) => {
            const sampler = event.target.value;
            settings.setSettings({
              ...settings.settings,
              sampler,
            });
          }}
        >
          <option value="">Select Sampler</option>
          {samplers &&
            Object.keys(samplers).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
        </select>
      </Row>
    </Section>
  );
};

export default SamplerSection;
