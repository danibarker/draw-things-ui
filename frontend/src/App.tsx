import Layout from "./layout";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./main-page";
import LoginRegister from "./login-register";
function App() {
	return (
		<Routes>
			<Route path="/" element={<MainPage />}>
				<Route path="" element={<Layout />} />
				<Route path="login" element={<LoginRegister />} />
				<Route path="register" element={<LoginRegister />} />
			</Route>
		</Routes>
	);
}

export default App;
