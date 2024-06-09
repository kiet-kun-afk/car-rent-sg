import React from 'react';

import '../../../style/styleLogin.css';

function Login() {
	return (
		<div className="modal fade" id="loginWindow" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-body p-0">
						<div className="d-flex flex-row-reverse p-2">
							<button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close"><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
						</div>
						<div className="form-item">
							<div className="input-box">
								<h5 className="item-title">Đăng nhập</h5>
								<form action="">
									<div className="input-field">
										<input type="text-login" className="input-form" id="username" required autoComplete="off" />
										<label htmlFor="username">Số điện thoại hoặc email</label>
									</div>
									<div className="input-field">
										<input type="password" className="input-form" id="password" required />
										<label htmlFor="password">Mật Khẩu</label>
									</div>
									<div className="form-suggest-right">
										<span className="suggest-item">
											<a href="/carrentsg/register">Quên mật khẩu ?</a>
										</span>
									</div>
									<div className="input-field mt-3">
										<input type="submit" className="btn-submit" id="login-submit" value="Đăng nhập" />
									</div>
									<div className="form-suggest">
										<span className="suggest-item">
											Bạn chưa là thành viên? <a href="/carrentsg/forgotpassword">Đăng ký ngay</a>
										</span>
									</div>
									<div className="form-suggest-row">
										<div className="suggest-item">
											<a className="btn btn-outline-success"><i className="fa-brands fa-google"></i> Google</a>
										</div>
										<div className="suggest-item">
											<a className="btn btn-outline-success"><i className="fa-brands fa-facebook"></i> Facebook</a>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;