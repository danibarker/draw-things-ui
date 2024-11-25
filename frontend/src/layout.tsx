import { useRef, useState } from "react";
import {
	LeftSide,
	Main,
	RightSide,
	TitleBar,
	Window,
} from "./components/shared/layout-elements";
import { NavBar } from "./components/shared/navbar";
import { useSettings } from "./components/settings/useSettings";
import { Modal } from "./Modal";
import { HelpSection } from "./HelpSection";
import { GetMoreLoras } from "./components/settings/sections/get-more-loras";
import Gallery from "./gallery";
import { Button } from "./components/shared/styled-components";
import Settings from "./settings";
const Layout = () => {
	const { isAdvanced, modalOpen, setModalOpen, modalContent, reconnect } =
		useSettings();
	const modalRef = useRef<HTMLDivElement>(null);
	const [hideGallery, setHideGallery] = useState(false);
	console.log("modalContent", modalContent);
	return (
		<Window>
			{modalOpen && (
				<Modal modalRef={modalRef} $color1="green" $color2="purple">
					{modalContent === "help" ? (
						<HelpSection setModalOpen={setModalOpen} />
					) : (
						<GetMoreLoras setModalOpen={setModalOpen} />
					)}
				</Modal>
			)}

			<Main $hideGallery={hideGallery}>
				<LeftSide>
					<TitleBar>
						<h2>Settings</h2>
						<Button
							className="solid"
							style={{ marginRight: "auto" }}
							onClick={reconnect}
						>
							Reconnect
						</Button>
					</TitleBar>
					<Settings isAdvanced={isAdvanced} />
				</LeftSide>

				<RightSide>
					<Button
						className="hide-on-desktop"
						style={{ position: "absolute", left: "0", top: "0" }}
						onClick={() => setHideGallery(prev => !prev)}
					>
						{hideGallery ? "Gallery" : "Hide"}
					</Button>
					<Gallery isHidden={hideGallery} />
				</RightSide>
			</Main>
			<NavBar />
		</Window>
	);
};

export default Layout;
