import Layout from "./layout";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./main-page";
import LoginRegister from "./login-register";
import AuthenticatedRoute from "./components/authenticated-route";
import SavedImages from "./components/saved-images";
import { useEffect, useRef, useState } from "react";
import { Button } from "./components/shared/styled-components";
import styled from "styled-components";
import { Divider, PhotoGallery } from "./components/shared/layout-elements";
import LogOut from "./log-out";
function App() {
	const [installPrompt, setInstallPrompt] = useState<EventWithPrompt | null>(
		null
	);
	const installButton = useRef<HTMLButtonElement>(null);
	function disableInAppInstallPrompt() {
		console.log("disableInAppInstallPrompt");
		setInstallPrompt(null);
		installButton?.current?.setAttribute("hidden", "");
	}
	useEffect(() => {
if (!("Notification" in window)) {}else{
		Notification.requestPermission().then(result => {
			console.log(result);
		});
		// main.js
}
		window.addEventListener("beforeinstallprompt", ((
			event: EventWithPrompt
		) => {
			console.log("beforeinstallprompt fired");
			event.preventDefault();
			setInstallPrompt(event);
		}) as EventListener);
		window.addEventListener("appinstalled", () => {
			console.log("appinstalled fired");
			disableInAppInstallPrompt();
		});
	}, [installButton]);
	return installPrompt ? (
		<>
			<InstallScreen>
				<h1>Welcome To Imagine Something</h1>
				<p>
					<br />
					<br />
					Imagine Something is a App that lets you create images using the
					latest image generation AI, featuring
					<br />
					<FluxText src="assets/flux.png" alt="flux" />
					<br />
					<br />
					Some sample images generated using Flux.1 are shown below. Click to
					view full size.
					<Divider />
					Install on Apple, Android, MacOS or Windows.
				</p>
				<Main>
					<Button
						ref={installButton}
						onClick={async () => {
							if (!installPrompt) {
								return;
							}
							const result = await installPrompt.prompt();
							console.log(`Install prompt was: ${result.outcome}`);
							disableInAppInstallPrompt();
						}}
						id="install"
					>
						Install
					</Button>
					<PhotoGalleryInstall $both={false}>
						<a target="_blank" href="assets/9.png">
							<img
								style={{ width: "100%" }}
								src="assets/9.png"
								alt="placeholder"
							/>
						</a>
						<a target="_blank" href="assets/4.png">
							<img
								style={{ width: "100%" }}
								src="assets/4.png"
								alt="placeholder"
							/>
						</a>
						<a target="_blank" href="assets/5.png">
							<img
								style={{ width: "100%" }}
								src="assets/5.png"
								alt="placeholder"
							/>
						</a>
						<a target="_blank" href="assets/8.png">
							<img
								style={{ width: "100%" }}
								src="assets/8.png"
								alt="placeholder"
							/>
						</a>
						<a target="_blank" href="assets/1.png">
							<img
								style={{ width: "100%" }}
								src="assets/1.png"
								alt="placeholder"
							/>
						</a>
						<a target="_blank" href="assets/2.png">
							<img
								style={{ width: "100%" }}
								src="assets/2.png"
								alt="placeholder"
							/>
						</a>
						<a target="_blank" href="assets/6.png">
							<img
								style={{ width: "100%" }}
								src="assets/6.png"
								alt="placeholder"
							/>
						</a>
						<a target="_blank" href="assets/7.png">
							<img
								style={{ width: "100%" }}
								src="assets/7.png"
								alt="placeholder"
							/>
						</a>
					</PhotoGalleryInstall>
				</Main>
			</InstallScreen>
		</>
	) : (
		<Routes>
			<Route path="/" element={<MainPage />}>
				<Route
					path=""
					element={
						<AuthenticatedRoute>
							<Layout />
						</AuthenticatedRoute>
					}
				/>
				<Route path="login" element={<LoginRegister />} />
				<Route path="register" element={<LoginRegister />} />
				<Route
					path="images"
					element={
						<AuthenticatedRoute>
							<SavedImages />
						</AuthenticatedRoute>
					}
				/>
				<Route
					path="logout"
					element={
						<AuthenticatedRoute>
							<LogOut />
						</AuthenticatedRoute>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;

const InstallScreen = styled.div`
	max-width: 800px;
	margin: 0 auto;
	display: grid;
	padding: 2rem;
	grid-template-rows: 1fr 1fr 4fr;
	text-align: center;
	height: 100vh;
	width: 100vw;
	background-color: var(--main-bg);
	color: var(--text-color);
	p {
		font-size: 0.8rem;
	}

	@media (max-width: 800px) {
		overflow: scroll;
	}

	@media (max-width: 500px) {
		p {
			font-size: 1.5rem;
		}
	}
`;

const Main = styled.div`
	height: 100%;
	display: grid;
	grid-template-rows: 30px 1fr;
	text-align: center;
	margin-top: 1rem;
	justify-items: center;
	/* padding-inline: 8rem; */
	@media (max-width: 500px) {
		Button {
			font-size: 1.5rem;
			height: 50px;
		}
	}
`;

const PhotoGalleryInstall = styled(PhotoGallery)`
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	margin-top: 2rem;
	gap: 2rem;
	height: 50%;

	@media (max-width: 800px) {
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		height: unset;
	}

	@media (max-width: 500px) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr;
	}
`;

const FluxText = styled.img`
	width: 200px;
	height: 75px;
	object-fit: cover;
	margin: 0 auto;
	@media (max-width: 500px) {
		width: 350px;
		height: 100px;
		/* cover */
		object-fit: cover;
	}
`;
