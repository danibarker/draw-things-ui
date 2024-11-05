import { ReactNode, useState } from "react";
import { defaultSettings, SettingsContext } from "./useSettings";

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [images, setImages] = useState<string[]>([]);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        images,
        setImages,
        websocket,
        setWebsocket,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
