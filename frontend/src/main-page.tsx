import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./components/settings/styled-components";

const MainPage = () => {
	const pageRef = useRef<HTMLDivElement>(null);
	const [showNav, setShowNav] = useState<boolean>(true);

	useEffect(() => {
		if (pageRef.current) {
			pageRef.current.addEventListener("mousemove", e => {
				if (!pageRef.current) return;
				const x = e.clientX;
				const y = e.clientY;
				const width = pageRef.current.clientWidth;
				const height = pageRef.current.clientHeight;
				const xPercent = (x / width) * 100;
				const yPercent = (y / height) * 100;
				pageRef.current.style.setProperty(
					"background",
					`radial-gradient(circle at ${xPercent}% ${yPercent}%,black 1%, var(--main-bg) 3%)`
				);
				if (yPercent < 6) {
					setShowNav(true);
				} else {
					setShowNav(false);
				}
			});
		}
	}, []);
	return (
		<Page ref={pageRef}>
			<Nav $show={showNav}>
				<ul>
					<li>
						<Link to="login">
							<Button className="solid">Login</Button>
						</Link>
					</li>
					<li>
						<Link to="/">
							<Button className="solid">Home</Button>
						</Link>
					</li>
				</ul>
			</Nav>
			<Outlet />
		</Page>
	);
};

export default MainPage;

const Page = styled.div`
	display: grid;
	grid-template-rows: 1fr;
	height: 100%;
	background: var(--input-bg);
	color: var(--text-color);
	width: 100%;
`;

const Nav = styled.nav<{ $show: boolean }>`
	height: ${(props: { $show: boolean }) => (props.$show ? "55px" : "0")};
	background: var(--input-bg);
	border-bottom: 0.1px solid var(--border-color-1);
	color: var(--text-color);
	display: flex;
	align-items: center;
	transition: all 0.3s;
	position: absolute;
	overflow: hidden;
	width: 100%;
	ul {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
		list-style: none;
	}
`;