import { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./components/shared/styled-components";
import { useAuth } from "./components/providers/useAuth";

const MainPage = () => {
	const pageRef = useRef<HTMLDivElement>(null);
	const { user } = useAuth();
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
			});
		}
	}, []);
	return (
		<Page ref={pageRef}>
			<Nav>
				<ul>
					{user && <li>Welcome, {user.username}!</li>}
					<li>
						{!user ? (
							<Link to="login">
								<Button className="solid">Login/Register</Button>
							</Link>
						) : (
							<Link to="logout">
								<Button className="solid">Logout</Button>
							</Link>
						)}
					</li>
					{user && (
						<li>
							<Link to="/">
								<Button className="solid">Home</Button>
							</Link>
						</li>
					)}
				</ul>
			</Nav>
			<Outlet />
		</Page>
	);
};

export default MainPage;

const Page = styled.div`
	display: grid;
	grid-template-rows: 32px 1fr;
	height: 100%;
	background: var(--main-bg);
	color: var(--text-color);
	width: 100%;
`;

const Nav = styled.nav`
	height: 32px;
	background: var(--input-bg);
	border-bottom: 0.1px solid var(--border-color-1);
	color: var(--text-color);
	display: flex;
	align-items: center;
	transition: all 0.3s;
	overflow: hidden;
	width: 100%;
	ul {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
		list-style: none;
	}
	Button {
		height: 21px;
		width: 100px;
		font-size: 12px;
		padding: 0;
	}
	z-index: 500;
`;
