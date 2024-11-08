import "./App.css";
import Settings from "./components/settings/settings";
import { useSettings } from "./components/settings/useSettings";
import { ScrollWindow } from "./components/settings/styled-components";
import styled from "styled-components";

function App() {
  const { websocket } = useSettings();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr 1fr",
        width: "100%",
      }}
    >
      <Settings />
      <div>
        Hello, server is
        {websocket && websocket?.readyState == 1
          ? " connected"
          : websocket && websocket.readyState == 0
          ? " not responding"
          : " disconnected"}
      </div>
      <ImageGallery />
    </div>
  );
}

export default App;

const ImageGallery = () => {
  const settings = useSettings();
  const { images } = settings;
  return (
    <RightPanel>
      <h1>Generated Images</h1>
      <ScrollWindow>
        {images.map((image) => (
          <img key={image} src={`${image}`} alt="Generated" width="400" />
        ))}
      </ScrollWindow>
    </RightPanel>
  );
};
const RightPanel = styled.div`
  background-color: #4509e9;
  height: 100vh;
  width: 100%;
  outline: 3px solid #4509e9;
  color: white;
  padding: 20px;
  h1 {
    font-size: 24px;
  }
`;
