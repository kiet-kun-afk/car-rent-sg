import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import axios from "axios";
import "../../../style/styleForgotpass.css";
import ToastComponent from "../../../assets/toasty";
import { ToastContainer } from "react-toastify";
function ResetPass() {
	const { token } = useParams(); // Lấy token từ path parameters
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { t } = useTranslation();

	const [errors, setErrors] = useState({});

	const validate = () => {
		let formErrors = {};

		// Validate password
		if (!password) {
			formErrors.password = t('registerValid.password1');
		} else if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/.test(
				password
			)
		) {
			formErrors.password =
				t('registerValid.password2')
		}

		// Validate rePassword
		if (!confirmPassword) {
			formErrors.confirmPassword = t('changePass.confirmNewPassword1');
		} else if (confirmPassword !== password) {
			formErrors.confirmPassword = t('changePass.confirmNewPassword2');
		}

		setErrors(formErrors);

		// Return true if no errors
		return Object.keys(formErrors).length === 0;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			ToastComponent("err", t('resetValidate.confirmPassErr'));
			return;
		}

		try {
			await axios.post(
				"http://localhost:8080/api/v1/customer/reset-password",
				null,
				{
					params: {
						token,
						newPassword: password,
					},
				}
			);

			ToastComponent("success", t('resetValidate.successful'));
			setTimeout(() => {
				window.location.href = "/carrentsg";
			}, 4000);
		} catch (error) {
			ToastComponent("err", t('resetValidate.failed'));
		}
	};
	return (
		<div class="container-fluid p-0">
			<div class="forgot-container">
				<div class="forgot-form">
					<form onSubmit={handleSubmit}>
						<div class="form-item">
							<h5 className="item-title">{t('enter_new_password')}</h5>
							<div class="item-form">
								<div class="mb-0">
									<input
										name="newpw"
										type="password"
										class="form-control"
										placeholder={t('enter_new_password')}
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										required
									/>
								</div>
								<div class="form-error ${errorMessage==null?'d-lg-none':'' }">
									<span class="error-item">
										{/* <p>${errorMessage}</p> */}
									</span>
								</div>
								<div class="mt-3">
									<input
										name="confirmpw"
										type="password"
										class="form-control"
										placeholder={t('confirm_password')} value={confirmPassword}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
										required
									/>
								</div>
								<div class="form-error ${errorMessage1==null?'d-lg-none':'' }">
									<span class="error-item">
										{/* <p>${errorMessage1}</p> */}
									</span>
								</div>
								<div class="form-error ${errorMessage2==null?'d-lg-none':'' }">
									<span class="error-item">
										{/* <p>${errorMessage2}</p> */}
									</span>
								</div>
								<div class="form-btn">
									<button
										class="btn btn-success"
										type="submit"
									>
										<i
											class="bx bx-right-arrow-alt"
											style={{ color: "#ffffff" }}
										></i>
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ResetPass;
