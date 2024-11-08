import { useEffect, useState } from "react";

function useWebSocket(
  url: string,
  setImages: React.Dispatch<React.SetStateAction<string[]>>
) {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    let ws: WebSocket;
    let reconnectAttempts = 0;

    const connect = () => {
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("Connected to websocket");
        setWebsocket(ws);
        reconnectAttempts = 0; // Reset attempts on successful connection
      };

      ws.onclose = () => {
        console.log("Disconnected from websocket");
        setWebsocket(null);

        // Only attempt to reconnect if attempts are below 10
        if (reconnectAttempts < 10) {
          reconnectAttempts += 1;

          // Calculate delay based on the attempt number, capping at 1 minute
          const delay = Math.min(1000 * 2 ** reconnectAttempts, 60000);

          console.log(
            `Reconnecting in ${
              delay / 1000
            } seconds... (Attempt ${reconnectAttempts})`
          );
          setTimeout(connect, delay);
        } else {
          console.log(
            "Max reconnect attempts reached. Stopping further attempts."
          );
        }
      };

      ws.onmessage = (event) => {
        console.log("Message received from websocket");
        const data = event.data;
        setImages((prev) => [...prev, `data:image/png;base64,${data}`]);
      };
    };

    connect();

    return () => {
      ws.close();
    };
  }, [url, setImages, setWebsocket]);

  return websocket;
}

export default useWebSocket;
