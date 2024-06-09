import React, { useEffect, useState} from 'react';
import axios from 'axios';

import '../../../style/styleLogin.css';
import { useNavigate } from 'react-router-dom';

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
	let navigate = useNavigate();

	const [customer, setCustomer]=useState({
		email: "",
		phoneNumber: "",
		password: "",
		rePassword: "",
	})

	const{email,phoneNumber, password, rePassword}=customer

	const onInputChange = (e) => {
		setCustomer({...customer, [e.target.name]: e.target.value})
		// console.log(customer);
	}

	const onLogin= async (e)=>{
		e.preventDefault();
		const formData = new FormData();
		formData.append('email', email);
		formData.append('phoneNumber', phoneNumber);
		formData.append('password', password);
		formData.append('rePassword', rePassword);
		await axios.post("http://localhost:8080/api/v1/customer/signup", formData,{
			headers: {
                'Content-Type':'multipart/form-data'
            }
		}).then(response => console.log(response.data));
		navigate("/carrentsg");
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
								<form onSubmit={onLogin}>
									<div className="item-form">
										<div>
											<div className="input-field">
												<input type="text-login" className="input-form" id="sdt" name='phoneNumber' value={phoneNumber} onChange={(e)=>onInputChange(e)} required autoComplete="off" />
												<label htmlFor="sdt">Số điện thoại</label>
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
												<input type="text-login" className="input-form" id="email" name='email' value={email} onChange={(e)=>onInputChange(e)} required />
												<label htmlFor="email">Email</label>
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
												<input type="text-login" className="input-form" name='fullName' id="username" required />
												<label htmlFor="username">Họ và tên</label>
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
												<input type="password" className="input-form" name='password' value={password} onChange={(e)=>onInputChange(e)} id="password" required />
												<label htmlFor="password">Mật Khẩu</label>
											</div>
											{/* <errors className="text-danger" path="password" /> */}
										</div>
										<div>
											<div className="input-field">
												<input type="password" className="input-form" name='rePassword' value={rePassword} onChange={(e)=>onInputChange(e)} id="confpassword" required />
												<label htmlFor="confpassword">Xác nhận mật Khẩu</label>
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
		</div >
	);
}

export default Register;