import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/dist",
  },

  server: {
    proxy: {
      "/ws": {
        target: "ws://localhost:3333",
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});
