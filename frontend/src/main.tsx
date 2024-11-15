import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SettingsProvider from "./components/settings/settings-provider.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<SettingsProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</SettingsProvider>
	</StrictMode>
);
