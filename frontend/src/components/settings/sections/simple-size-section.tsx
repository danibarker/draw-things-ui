import { useEffect, useMemo, useState } from "react";
import { Column, Row, Section } from "../styled-components";
import { useSettings } from "../useSettings";
import styled from "styled-components";
const SpecialColumn = styled(Column)`
  button {
    padding: 4px;
    aspect-ratio: 1;
    width: 100%;
  }
`;
function SimpleSizeSection() {
  const { setSettings } = useSettings();
  const [aspectRatio, setAspectRatio] = useState("square");
  const [size, setSize] = useState("small");
  const quickSizes: { [key: string]: { [key: string]: [number, number] } } =
    useMemo(
      () => ({
        square: {
          small: [512, 512],
          medium: [768, 768],
          large: [960, 960],
        },

        landscape: {
          small: [512, 384],
          medium: [704, 512],
          large: [960, 704],
        },

        portrait: {
          small: [384, 512],
          medium: [512, 704],
          large: [704, 960],
        },
        tall: {
          small: [320, 640],
          medium: [512, 1024],
          large: [640, 1208],
        },
        wide: {
          small: [640, 320],
          medium: [1024, 512],
          large: [1208, 640],
        },
      }),
      []
    );
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      aspectRatio,
      size,
      width: quickSizes[aspectRatio][size][0],
      height: quickSizes[aspectRatio][size][1],
    }));
  }, [aspectRatio, size, quickSizes, setSettings]);

  return (
    <Section>
      <Row>
        <Row>
          <label htmlFor="controls">Aspect Ratio</label>
          <SpecialColumn>
            <button
              style={{ backgroundColor: aspectRatio === "square" ? "red" : "" }}
              onClick={() => setAspectRatio("square")}
            >
              Square
            </button>
            <button
              style={{
                backgroundColor: aspectRatio === "landscape" ? "red" : "",
              }}
              onClick={() => setAspectRatio("landscape")}
            >
              Landscape
            </button>
            <button
              style={{
                backgroundColor: aspectRatio === "portrait" ? "red" : "",
              }}
              onClick={() => setAspectRatio("portrait")}
            >
              Portrait
            </button>
            <button
              style={{ backgroundColor: aspectRatio === "tall" ? "red" : "" }}
              onClick={() => setAspectRatio("tall")}
            >
              Tall
            </button>
            <button
              style={{ backgroundColor: aspectRatio === "wide" ? "red" : "" }}
              onClick={() => setAspectRatio("wide")}
            >
              Wide
            </button>
          </SpecialColumn>
        </Row>
        <Row>
          <label htmlFor="controls">Size</label>
          <SpecialColumn>
            <button
              style={{ backgroundColor: size === "small" ? "red" : "" }}
              onClick={() => setSize("small")}
            >
              Small
            </button>
            <button
              style={{ backgroundColor: size === "medium" ? "red" : "" }}
              onClick={() => setSize("medium")}
            >
              Medium
            </button>
            <button
              style={{ backgroundColor: size === "large" ? "red" : "" }}
              onClick={() => setSize("large")}
            >
              Large
            </button>
          </SpecialColumn>
        </Row>
        <Row>
          <p>
            {quickSizes[aspectRatio][size][0]}X
            {quickSizes[aspectRatio][size][1]}
          </p>
        </Row>
      </Row>
    </Section>
  );
}

export default SimpleSizeSection;
