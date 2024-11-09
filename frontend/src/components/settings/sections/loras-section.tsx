import {
  DropdownBox,
  DropDownOpener,
  DropdownOption,
  DropdownWithButtons,
  LorasList,
  Row,
  Section,
} from "../styled-components";
import loras from "./loras.json";
import { useState } from "react";
import { useSettings } from "../useSettings";
type LorasWithHidden = {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
};
function LoraSection() {
  const [open, setOpen] = useState(false);
  const settings = useSettings();
  let lorasToShow: LorasWithHidden = loras;
  if (settings.showHidden) {
    lorasToShow = {
      flux: { ...loras.flux, ...loras.secret.flux },
      sd1_5: { ...loras.sd1_5, ...loras.secret.sd1_5 },
      sd2_0: { ...loras.sd2_0 },
      sd3_5: { ...loras.sd3_5 },
    };
  }
  return (
    <Section>
      <Row>
        <label htmlFor="loras">Loras</label>

        <DropdownWithButtons>
          <DropDownOpener
            onClick={() => {
              setOpen(!open);
            }}
          >
            Add
          </DropDownOpener>
          <DropdownBox id="loras-dropdown" open={open}>
            {lorasToShow &&
              Object.entries(
                lorasToShow[
                  settings.settings.model_category as keyof LorasWithHidden
                ]
              ).map(([key, value]) => (
                <DropdownOption key={key}>
                  {key}
                  <button
                    onClick={() => {
                      let lorasInUse =
                        settings.settings.loras &&
                        settings.settings.loras.slice();

                      if (!Array.isArray(lorasInUse)) {
                        lorasInUse = [];
                      }
                      lorasInUse.push({
                        weight: 1,
                        file:
                          typeof value === "string"
                            ? value
                            : JSON.stringify(value),
                        key,
                      });

                      settings.setSettings({
                        ...settings.settings,
                        loras: lorasInUse,
                      });
                      setOpen(!open);
                    }}
                  >
                    Add
                  </button>
                </DropdownOption>
              ))}
          </DropdownBox>
        </DropdownWithButtons>
        <LorasList>
          {settings.settings.loras &&
            settings.settings.loras.map((lora, index) => (
              <li key={index}>
                <span>{lora.key}</span>
                <span className="input_label">
                  {Math.ceil(lora.weight * 100)}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={lora.weight}
                  onChange={(event) => {
                    const lorasInUse =
                      settings.settings.loras &&
                      settings.settings.loras.slice();
                    if (!Array.isArray(lorasInUse)) {
                      return;
                    }
                    lorasInUse[index].weight = parseFloat(event.target.value);
                    settings.setSettings({
                      ...settings.settings,
                      loras: lorasInUse,
                    });
                  }}
                />
                <button
                  onClick={() => {
                    if (!Array.isArray(settings.settings.loras)) {
                      return;
                    }
                    const lorasInUse = settings.settings.loras.slice();
                    lorasInUse.splice(index, 1);
                    settings.setSettings({
                      ...settings.settings,
                      loras: lorasInUse,
                    });
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
        </LorasList>
      </Row>
    </Section>
  );
}

export default LoraSection;
