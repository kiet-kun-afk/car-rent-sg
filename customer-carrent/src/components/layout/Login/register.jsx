import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import ToastComponent from '../../../assets/toasty';
import '../../../style/styleLogin.css';


function registerClick() {

	var checkbox = document.getElementById("checkDetail");
	var btn = document.getElementById("register-submit");
	if (checkbox.checked == true) {
		btn.disabled = false;
	} else {
		btn.disabled = true;
	}
}

function Register() {
	const navigate = useNavigate();

	const [customer, setCustomer] = useState({
		email: "",
		phoneNumber: "",
		fullName: "",
		password: "",
		rePassword: "",
	})

	const { email, phoneNumber, fullName, password, rePassword } = customer
	const onInputChange = (e) => {
		setCustomer({ ...customer, [e.target.name]: e.target.value })
	}

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append('email', email);
			formData.append('phoneNumber', phoneNumber);
			formData.append('fullName', fullName);
			formData.append('password', password);
			formData.append('rePassword', rePassword);

			const res = await axios.post("http://localhost:8080/api/v1/customer/register", formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			console.log(res.data)
		
			ToastComponent('success', 'Đăng ký thành công !');
			window.location.reload();

		} catch (error) {			
			ToastComponent('err', 'Đăng ký thất bại !');
			console.log(error);
		}
	}

	return (
		<div className="modal fade" id="regisWindow" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-body p-0">
						<div className="d-flex flex-row-reverse p-2">
							<button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close"><i className="fa-regular fa-circle-xmark fa-xl"></i></button>
						</div>
						<div className="form-item">
							<div className="input-box">
								<h5 className="item-title">Đăng ký</h5>
								<form onSubmit={handleRegister}>
									<div className="item-form">
										<div>
											<div className="input-field">
												<input type="text-login" className="input-form" id="sdt" name='phoneNumber' value={phoneNumber} onChange={(e) => onInputChange(e)} required autoComplete="off" />
												<label htmlFor="sdt"><i className="fa-solid fa-phone"></i> Số điện thoại</label>
											</div>
											{/* <errors className="text-danger" path="username" /> */}
											<div className="form-error ${errorMessageU==null?'d-lg-none':'' }">
												{/* <span className="error-item1">
												<p>${errorMessageU}</p>
											</span>*/}
											</div>
										</div>
										{/* <div className="row">
											<div className="col-sm-6">
												<div className="mb-3">
													<input path="firstname" className="form-control" placeholder="Họ" />
													<errors className="text-danger" path="firstname" />
												</div>
											</div>
											<div className="col-sm-6">
												<div className="mb-3">
													<input path="lastname" className="form-control" placeholder="Tên" />
													<errors className="text-danger" path="lastname" />
												</div>
											</div>
										</div> */}
										<div >
											<div className="input-field">
												<input type="text-login" className="input-form" id="email" name='email' value={email} onChange={(e) => onInputChange(e)} required autoComplete="off"/>
												<label htmlFor="email"><i className="fa-solid fa-envelope"></i> Email</label>
											</div>
											{/* <errors className="text-danger" path="email" /> */}
											<div className="form-error ${errorMessageE==null?'d-lg-none':'' }">
												{/* <span className="error-item1">
												<p>${errorMessageE}</p>
											</span>*/}
											</div>
										</div>
										<div>
											<div className="input-field">
												<input type="text-login" className="input-form" id="fullName" name='fullName' value={fullName} onChange={(e) => onInputChange(e)}  required />
												<label htmlFor="fullName"><i className="fa-solid fa-user"></i> Họ và tên</label>
											</div>
											{/* <errors className="text-danger" path="phonenumber" /> */}
											<div className="form-error ${errorMessageS==null?'d-lg-none':'' }">
												{/* <span className="error-item1">
												<p>${errorMessageS}</p>
											</span>*/}
											</div>
										</div>
										<div>
											<div className="input-field">
												<input type="password" className="input-form" name='password' id="password" value={password} onChange={(e) => onInputChange(e)}  required />
												<label htmlFor="password"><i className="fa-solid fa-lock"></i> Mật Khẩu</label>
											</div>
											{/* <errors className="text-danger" path="password" /> */}
										</div>
										<div>
											<div className="input-field">
												<input type="password" className="input-form" id="rePassword" name='rePassword'  value={rePassword} onChange={(e) => onInputChange(e)}  required />
												<label htmlFor="rePassword"><i className="fa-solid fa-unlock"></i> Xác nhận mật Khẩu</label>
											</div>
											<div className="form-error ${errorMessageP==null?'d-lg-none':'' }">
												{/* <span className="error-item1">
												<p>${errorMessageP}</p>
											</span>								 */}
											</div>
										</div>
										<div className="form-check">
											<div className="input-field-checkinput">
												<input id="checkDetail" onClick={registerClick} type="checkbox" className="form-check-input" />
												<span className="form-check-label">Tôi đồng ý với chính sách của CarR. <a href="https://www.mioto.vn/privacy" style={{ color: "#198754" }}>Chi tiết</a></span>
											</div>
										</div>
										<div className="input-field mt-3 mb-3">
											<button className="btn btn-success btn-submit" id="register-submit" disabled>Đăng ký</button>
										</div>
										<div className="form-suggest-row">
											<div className="suggest-item">
												<a className="btn btn-outline-success"><i className="fa-brands fa-google"></i> Google</a>
											</div>
											<div className="suggest-item">
												<a className="btn btn-outline-success"><i className="fa-brands fa-facebook"></i> Facebook</a>
											</div>
										</div>
										{/* 
										<div className="form-btn">
											<button id="btn-register" className="btn btn-success" disabled><i className='bx bx-right-arrow-alt' style={{ color: "#ffffff" }}></i></button>
										</div> */}
										{/* <div className="form-suggest">
											<span className="suggest-item">
												<a href="/carrentsg/login">Bạn Đã Có Tài Khoản?</a>
											</span>
										</div> */}
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div >
			<ToastContainer/>
		</div >
	);
}

export default Register;