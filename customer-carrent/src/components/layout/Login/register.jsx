import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';

import ToastComponent from "../../../assets/toasty";

import "../../../style/styleLogin.css";

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
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [customer, setCustomer] = useState({
    email: "",
    phoneNumber: "",
    fullName: "",
    password: "",
    rePassword: "",
  });

  const { email, phoneNumber, fullName, password, rePassword } = customer;
  const onInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};

    // Validate email
    if (!email) {
      formErrors.email = t('registerValid.email1');
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      formErrors.email = t('registerValid.email2');
    }

    // Validate phone number (example for a 10-digit number)
    if (!phoneNumber) {
      formErrors.phoneNumber = t('registerValid.phone1');
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      formErrors.phoneNumber = t('registerValid.phone2');
    }

    // Validate full name
    if (!fullName) {
      formErrors.fullName = t('registerValid.fullName1');
    } else if (fullName.length < 2) {
      formErrors.fullName = t('registerValid.fullName2');
    }

    // Validate password
    if (!password) {
      formErrors.password = t('registerValid.password1');
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/.test(
        password
      )
    ) {
      formErrors.password =
        t('registerValid.password2');
    }

    // Validate rePassword
    if (!rePassword) {
      formErrors.rePassword = t('registerValid.confirmPassword1');
    } else if (rePassword !== password) {
      formErrors.rePassword = t('registerValid.confirmPassword2');
    }

    setErrors(formErrors);

    // Return true if no errors
    return Object.keys(formErrors).length === 0;
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("fullName", fullName);
        formData.append("password", password);
        formData.append("rePassword", rePassword);

        const res = await axios.post(
          "http://localhost:8080/api/v1/customer/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res.data);

        ToastComponent("success", "Đăng ký thành công !");
        window.location.reload();
      } catch (error) {
        ToastComponent("err", "Đăng ký thất bại !");
        console.log(error);
      }
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form contains errors.");
    }
  };

  return (
    <div
      className="modal fade"
      id="regisWindow"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
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
                <h5 className="item-title">{t('register')}</h5>
                <form onSubmit={handleRegister}>
                  <div className="item-form">
                    <div>
                      <div className="input-field">
                        <input
                          type="text-login"
                          className="input-form"
                          id="sdt"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={(e) => onInputChange(e)}
                          required
                          autoComplete="off"
                        />
                        <label htmlFor="sdt">
                          <i className="fa-solid fa-phone"></i> {t('phone_number')}
                        </label>
                      </div>
                      <div className="form-error {errors.phoneNumber==null?'d-lg-none':'' }">
                        <span className="error-item1">
                          <p>
                            {errors.phoneNumber}
                          </p>
                        </span>
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
                    <div>
                      <div className="input-field">
                        <input
                          type="text-login"
                          className="input-form"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => onInputChange(e)}
                          required
                          autoComplete="off"
                        />
                        <label htmlFor="email">
                          <i className="fa-solid fa-envelope"></i>{t('email')}
                        </label>
                      </div>
                      <div className="form-error {errors.email==null?'d-lg-none':'' }">
                        <span className="error-item1">
                          <p>{errors.email}</p>
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="input-field">
                        <input
                          type="text-login"
                          className="input-form"
                          id="fullName"
                          name="fullName"
                          value={fullName}
                          onChange={(e) => onInputChange(e)}
                          required
                        />
                        <label htmlFor="fullName">
                          <i className="fa-solid fa-user"></i> {t('full_name')}
                        </label>
                      </div>
                      <div className="form-error {errors.fullName==null?'d-lg-none':'' }">
                        <span className="error-item1">
                          <p>{errors.fullName}</p>
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="input-field">
                        <input
                          type="password"
                          className="input-form"
                          name="password"
                          id="password"
                          value={password}
                          onChange={(e) => onInputChange(e)}
                          required
                        />
                        <label htmlFor="password">
                          <i className="fa-solid fa-lock"></i> {t('password')}
                        </label>
                      </div>
                      <div className="form-error {errors.password==null?'d-lg-none':'' }">
                        <span className="error-item1">
                          <p>{errors.password}</p>
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="input-field">
                        <input
                          type="password"
                          className="input-form"
                          id="rePassword"
                          name="rePassword"
                          value={rePassword}
                          onChange={(e) => onInputChange(e)}
                          required
                        />
                        <label htmlFor="rePassword">
                          <i className="fa-solid fa-unlock"></i> {t('confirm_password')}
                        </label>
                      </div>
                      <div className="form-error {errors.rePassword==null?'d-lg-none':'' }">
                        <span className="error-item1">
                          <p>{errors.rePassword}</p>
                        </span>
                      </div>
                    </div>
                    <div className="form-check">
                      <div className="input-field-checkinput">
                        <input
                          id="checkDetail"
                          onClick={registerClick}
                          type="checkbox"
                          className="form-check-input"
                        />
                        <span className="form-check-label">
                          {t('terms_agreement')}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="input-field mt-3 mb-3">
                      <button
                        className="btn btn-success btn-submit"
                        id="register-submit"
                        disabled
                      >
                        {t('register_button')}
                      </button>
                    </div>
                    <div className="form-suggest-row">
                      <div className="suggest-item">
                        <a
                          onClick={handleGoogleLogin}
                          className="btn btn-outline-success"
                        >
                          <i className="fa-brands fa-google"></i> Google
                        </a>
                      </div>
                      <div className="suggest-item">
                        <a
                          onClick={handleGithubLogin}
                          className="btn btn-outline-success"
                        >
                          <i className="fa-brands fa-google"></i> Github
                        </a>
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
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
