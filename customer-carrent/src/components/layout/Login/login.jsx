import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

import axios from "axios";

import ToastComponent from "../../../assets/toasty";

import "../../../style/styleLogin.css";
import { display } from "@mui/system";

function Login() {
	const { t, i18n } = useTranslation();

	// const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
	// const [password, setPassword] = useState("");
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const [account, setAccount] = useState({
		emailOrPhoneNumber: "",
		password: "",
	});

	const errRef = useRef(null);

	const { emailOrPhoneNumber, password } = account;
	const onInputChange = (e) => {
		setAccount({ ...account, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {
		const errorContain = document.getElementsByClassName("input-field-err");
		//const errorMessage = document.getElementById('err-message');
		localStorage.removeItem("token");
		localStorage.removeItem("roles");
		e.preventDefault();
		const formData = new FormData();
		formData.append("emailOrPhoneNumber", emailOrPhoneNumber);
		formData.append("password", password);
		await axios
			.post("http://localhost:8080/api/v1/customer/signin", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				//Set token
				const { token } = response.data.data;
				localStorage.setItem("token", token);

				//ToastComponent('success', 'Đăng nhập thành công !');
				window.location.reload();
			})
			.catch((err) => {
				errRef.current.style.display = "block";
				// errorMessage.innerHTML = '<i className="fa-solid fa-circle-info"></i> Tài khoản hoặc mật khẩu chưa chính xác.';
			});
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
		<div
			className="modal fade"
			id="loginWindow"
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-body p-0">
						<div className="d-flex flex-row-reverse p-2">
							<button
								type="button"
								className="btn"
								data-bs-dismiss="modal"
								aria-label="Close"
							>
								<i className="fa-regular fa-circle-xmark fa-xl"></i>
							</button>
						</div>
						<div className="form-item">
							<div className="input-box">
								<h5 className="item-title">{t("login")}</h5>
								<form onSubmit={handleLogin}>
									<div className="input-field">
										<input
											type="text-login"
											id="un"
											className="input-form"
											name="emailOrPhoneNumber"
											value={emailOrPhoneNumber}
											onChange={(e) => onInputChange(e)}
											required
											autoComplete="off"
										/>
										<label htmlFor="un">
											<i className="fa-solid fa-user"></i>{" "}
											{t("email_or_phone")}
										</label>
									</div>
									<div className="input-field">
										<input
											type={
												passwordShown
													? "text"
													: "password"
											}
											id="pw"
											className="input-form"
											name="password"
											value={password}
											onChange={(e) => onInputChange(e)}
											required
										/>
										<label htmlFor="pw">
											<i className="fa-solid fa-lock"></i>{" "}
											{t("password")}
										</label>
									</div>
									<div
										className="input-field-err"
										ref={errRef}
									>
										<p
											className="err-message"
											id="err-message"
										>
											<i className="fa-solid fa-circle-info"></i>{" "}
											{t("incorrect_credentials")}
										</p>
									</div>
									<div className="form-suggest-right">
										<span className="suggest-item">
											<a
												href={`/carrentsg/forgot?lng=${i18n.language}`}
												target="_blank"
											>
												{t("forgot_password_login")}
											</a>
										</span>
									</div>
									<div className="input-field mt-3">
										<button
											type="submit"
											className="btn-submit"
										>
											{t("login_button")}
										</button>
									</div>
								</form>
								<div className="form-suggest">
									<span className="suggest-item">
										{t("not_a_member")}{" "}
										<a
											href="/carrentsg/register"
											data-bs-toggle="modal"
											data-bs-target="#regisWindow"
										>
											{t("register_now")}
										</a>
									</span>
								</div>
								<div className="form-suggest-row">
									<div className="suggest-item">
										<a
											onClick={handleGoogleLogin}
											className="btn btn-outline-success"
										>
											<i className="fa-brands fa-google"></i>{" "}
											{t("google")}
										</a>
									</div>
									<div className="suggest-item">
										<a
											onClick={handleGithubLogin}
											className="btn btn-outline-success"
										>
											<i className="fa-brands fa-google"></i>{" "}
											{t("github")}
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
