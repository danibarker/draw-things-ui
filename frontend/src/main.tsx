import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SettingsProvider from "./components/providers/settings-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/providers/auth-provider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<SettingsProvider>
					<App />
				</SettingsProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
