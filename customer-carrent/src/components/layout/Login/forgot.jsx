import React, { useState } from "react";
import axios from "axios";

import "../../../style/styleForgotpass.css";

function ForgotPass() {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(email);
			const response = await axios.post(
				`http://localhost:8080/api/v1/customer/forgot-password?email=${email}`
			);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div class="container-fluid p-0">
			<div class="forgot-container">
				<div class="d-flex" style={{ width: "1250px" }}>
					<div class="page-item">
						<div class="page-title me-auto p-2">
							<h1>QUÊN MẬT KHẨU</h1>
						</div>
					</div>

					<div class="p-2">
						<div class="forgot-form">
							<form onSubmit={handleSubmit}>
								<div class="form-item">
									<div class="forgot-title">
										<h1>Nhập Email</h1>
										<h5>
											Email được dùng để đăng ký tài
											khoản.
										</h5>
									</div>
									<div class="item-form">
										<div class="mb-3">
											<input
												name="email"
												type="text"
												class="form-control-forgot"
												placeholder="Email"
												onChange={(e) =>
													setEmail(e.target.value)
												}
											/>
										</div>
										<div class="form-error ${errorMessage==null?'d-lg-none':'' }">
											{/* <span class="error-item">
                                                <p>${errorMessage}</p>
                                            </span> */}
										</div>
										<div class="form-btn">
											<button class="btn btn-success">
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
			</div>
		</div>
	);
}

export default ForgotPass;
