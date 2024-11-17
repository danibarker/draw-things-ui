import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./components/shared/styled-components";
import styled from "styled-components";
const validate = (
	mode: string,
	username: string,
	password: string,
	confirmPassword: string,
	email: string,
	setError: React.Dispatch<React.SetStateAction<string>>
) => {
	if (/^[!-흉]{1,36}$/gi.test(username) === false) {
		setError("Username must be at least 3 characters long");
		return false;
	}
	if (password.length < 8) {
		setError("Password must be at least 8 characters long");
		return false;
	}
	// password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
	if (
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*()_+])[A-Za-z\d!.@#$%^&*()_+]{8,}$/g.test(
			password
		) === false
	) {
		setError(
			"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
		);
		return false;
	}

	if (mode === "Register" && password !== confirmPassword) {
		setError("Passwords do not match");
		return false;
	}
	if (
		mode === "Register" &&
		/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/gi.test(email) === false
	) {
		setError("Invalid email address");
		return false;
	}
	setError("");
	return true;
};
const LoginRegister = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const [mode, setMode] = useState("Login");
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (location.pathname === "/register") {
			setMode("Register");
		} else if (location.pathname === "/login") {
			setMode("Login");
		}
	}, [location]);

	const sendRequest = async () => {
		const valid = validate(
			mode,
			username,
			password,
			confirmPassword,
			email,
			setError
		);
		if (!valid) {
			return;
		}
		const url = mode === "Register" ? "/api/auth/register" : "/api/auth/login";
		const data: Auth = {
			username,
			password,
		};
		if (mode === "Register") {
			data.confirmPassword = confirmPassword;
			data.email = email;
		}
		// Send the data to the server
		const response = await axios.post(url, data);
		// If the server responds with an error, display the error
		if (response.data.error) {
			setError(response.data.error);
		} else {
			// If the server responds with a success message, navigate to the home page
			navigate("/");
		}
	};
	return (
		<Page>
			<h1>{mode}</h1>
			<div>{error}</div>
			<LoginInputs>
				<input
					type="text"
					placeholder="Username"
					onChange={e => setUsername(e.target.value)}
				/>

				<input
					type="password"
					placeholder="Password"
					onChange={e => setPassword(e.target.value)}
				/>
				{mode === "Register" && (
					<>
						<input
							type="password"
							placeholder="Confirm Password"
							onChange={e => setConfirmPassword(e.target.value)}
						/>

						<input
							type="email"
							placeholder="Email"
							onChange={e => setEmail(e.target.value)}
						/>
					</>
				)}
				<LoginButtons>
					<Button onClick={sendRequest}>{mode}</Button>
					{mode === "Login" && (
						<Button onClick={() => navigate("/forgot-password")}>
							Forgot Password
						</Button>
					)}
				</LoginButtons>
			</LoginInputs>
			<SwitchModes>
				{mode === "Login" ? (
					<>
						<p>Don't have an account?</p>
						<Button onClick={() => navigate("/register")}>Register</Button>
					</>
				) : (
					<>
						<p>Already have an account?</p>
						<Button onClick={() => navigate("/login")}>Login</Button>
					</>
				)}
			</SwitchModes>
		</Page>
	);
};

export default LoginRegister;

const Page = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px 0px;
	margin: 15% 20%;
	justify-content: space-evenly;
	background: var(--panel-bg);
`;

const LoginInputs = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	margin-top: 20px;
	width: 100%;
	justify-content: space-evenly;
`;

const SwitchModes = styled.div`
	width: 100%;
	border-top: 1px solid var(--highlight-1);
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	margin-top: 20px;
	padding-top: 40px;
	gap: 20px;
`;

const LoginButtons = styled.div`
	display: flex;
	flex-direction: row;
	gap: 20px;
	width: 100%;
	justify-content: center;
`;
