import { useEffect } from "react";
import "./App.css";
import Settings from "./components/settings/settings";
import { useSettings } from "./components/settings/useSettings";
import { ImageGallery } from "./components/settings/styled-components";
import styled from "styled-components";

function App() {
  const settings = useSettings();
  const { images, setImages, setWebsocket } = settings;
  useEffect(() => {
    let ws = new WebSocket("/ws");
    // reconnect on disconnect
    ws.onclose = () => {
      console.log("Disconnected from websocket");
      setTimeout(() => {
        console.log("Reconnecting...");
        ws = new WebSocket("/ws");
      }, 100);
    };

    ws.onopen = () => {
      console.log("Connected to websocket");
      setWebsocket(ws);
    };
    ws.onmessage = (event) => {
      console.log("event came");
      const data = event.data;
      console.log(data);
      setImages((prev) => [...prev, `data:image/png;base64,${data}`]);
    };
    const si = setInterval(() => {
      // if connected do nothing
      // else reconnect
      if (ws.readyState === ws.CLOSED) {
        console.log("Reconnecting...");
        ws = new WebSocket("/ws");
        setWebsocket(ws);
      }
    }, 1000);
    return () => {
      ws.close();
      clearInterval(si);
    };
  }, [setImages, setWebsocket]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <Settings />
      <RightPanel>
        <h1>Generated Images</h1>
        <ImageGallery>
          {images.map((image) => (
            <img key={image} src={`${image}`} alt="Generated" width="400" />
          ))}
        </ImageGallery>
      </RightPanel>
    </div>
  );
}

export default App;

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
