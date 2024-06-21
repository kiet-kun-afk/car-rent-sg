import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		try {
			const formData = new FormData();
			formData.append("emailOrPhoneNumber", emailOrPhoneNumber);
			formData.append("password", password);

			const response = await axios.post(
				"http://localhost:8080/api/v1/customer/signin",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			const { token } = response.data.data;
			localStorage.setItem("token", token);
			navigate("/profile");
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	const handleGoogleLogin = () => {
		window.location.href =
			"http://localhost:8080/oauth2/authorization/google";
	};

	const handleGithubLogin = () => {
		window.location.href =
			"http://localhost:8080/oauth2/authorization/github";
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email or Phone Number</label>
					<input
						type="text"
						value={emailOrPhoneNumber}
						onChange={(e) => setEmailOrPhoneNumber(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<button onClick={handleGoogleLogin}>Đăng nhập với Google</button>
			<button onClick={handleGithubLogin}>Đăng nhập với Github</button>
		</div>
	);
};

export default Login;
