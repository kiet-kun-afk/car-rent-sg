import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../style/styleForgotpass.css";
import ToastComponent from "../../../assets/toasty";
function ResetPass() {
	const { token } = useParams(); // Lấy token từ path parameters
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			ToastComponent("err", "Xác nhận mật khẩu không đúng!");
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

			ToastComponent("success", "Đổi mật khẩu thành công!");
			setTimeout(() => {
				window.location.href = "/carrentsg";
			}, 4000);
		} catch (error) {
			ToastComponent("err", "Đổi mật thất bại!");
		}
	};
	return (
		<div class="container-fluid p-0">
			<div class="forgot-container">
				<div class="forgot-form">
					<form onSubmit={handleSubmit}>
						<div class="form-item">
							<h5 class="item-title">Nhập Mật Khẩu Mới</h5>
							<div class="item-form">
								<div class="mb-0">
									<input
										name="newpw"
										type="password"
										class="form-control"
										placeholder="Mật Khẩu Mới"
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
										placeholder="Xác Nhận "
										value={confirmPassword}
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
