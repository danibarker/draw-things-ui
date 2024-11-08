import { ReactNode, useState } from "react";
import { defaultSettings, SettingsContext } from "./useSettings";
import useWebSocket from "../../useWebsocket";

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [images, setImages] = useState<string[]>([]);
  const websocket = useWebSocket("/ws", setImages);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        images,
        setImages,
        websocket,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
