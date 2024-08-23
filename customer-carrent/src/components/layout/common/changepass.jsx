import axios from "axios";
import axiosConfig from "../../../config/axiosConfig";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import ToastComponent from "../../../assets/toasty";

function Changepassword() {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const customerAccount = localStorage.getItem("token");
  const [errors, setErrors] = useState({});
  const [errorPass, setErrorPass] = useState(false);

  const validate = () => {
    let formErrors = {};

    // Validate reNewPassword
    if (!oldPassword) {
      formErrors.oldPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    // Validate newPassword
    if (!newPassword) {
      formErrors.newPassword = "Mật khẩu mới không được để trống";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/.test(
        newPassword
      )
    ) {
      formErrors.newPassword =
        "Mật khẩu phải chứa ít nhất 1 ký tự hoa, 1 ký tự thường, 1 ký tự số, 1 ký tự đặc biệt và độ dài từ 6 đến 18 ký tự";
    }

    // Validate reNewPassword
    if (!confirmNewPassword) {
      formErrors.confirmNewPassword = "Vui lòng xác nhận mật khẩu";
    } else if (confirmNewPassword !== newPassword) {
      formErrors.confirmNewPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(formErrors);

    // Return true if no errors
    return Object.keys(formErrors).length === 0;
  };

  const [checkOld, setCheckOld] = useState("");

  const handleChangepass = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formData = new FormData();
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
        formData.append("confirmNewPassword", confirmNewPassword);
        if (customerAccount) {
          const res = await axiosConfig.put(
            "http://localhost:8080/api/v1/customers/change-password",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        ToastComponent("success", "Đổi mật khẩu thành công !");
        setTimeout(() => {
          window.location.href = "/carrentsg/customer/infor";
        }, 4000);
      } catch (error) {
        setErrorPass(true);
        setCheckOld("Mật khẩu cũ không trùng khớp");
        console.log(error);
      }
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form contains errors.");
    }
  };

  const [oldpasswordShow, setOldPasswordShow] = useState(false);
  const [newpasswordShow, setNewPasswordShow] = useState(false);
  const [repasswordShow, setRePasswordShow] = useState(false);
  const toggleOldPassword = () => {
    setOldPasswordShow(!oldpasswordShow);
  };
  const toggleNewPassword = () => {
    setNewPasswordShow(!newpasswordShow);
  };
  const toggleRePassword = () => {
    setRePasswordShow(!repasswordShow);
  };
  return (
    <>
      <div className="content-title">
        <h4>Đổi mật khẩu</h4>
        <p>Vui lòng nhập mật khẩu hiện tại của bạn để thay đổi mật khẩu</p>
      </div>
      <div className="content-item change-pw">
        <div className="title">
          <h5>Nhập mật khẩu</h5>
        </div>
        <div className="content">
          <div className="custom-input">
            <div className="wrap-info">
              <div className="title-status">
                <p>Mật khẩu hiện tại</p>
              </div>
              <div className="desc "></div>
            </div>
            <div className="wrap-input ">
              <div className="wrap-text">
                <input
                  className="form-control border-0 p-0"
                  type={oldpasswordShow ? "text" : "password"}
                  name="ip_pw"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div onClick={toggleOldPassword}>
                {oldpasswordShow ? (
                  <div className="wrap-svg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http:www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.52 18.6297C13.71 18.8397 12.87 18.9397 12 18.9397C8.73 18.9397 5.8 17.4097 3.8 14.9897C2.4 13.2997 2.4 10.6897 3.8 9.00969C3.96 8.80969 4.14 8.61969 4.32 8.42969"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M20.2 14.9896C19.4 15.9496 18.45 16.7696 17.4 17.4096L6.58997 6.58957C8.17997 5.60957 10.02 5.05957 12 5.05957C15.27 5.05957 18.2 6.58957 20.2 9.00957C21.6 10.6896 21.6 13.3096 20.2 14.9896Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M15.0799 11.9999C15.0799 12.8499 14.7299 13.6199 14.1799 14.1799L9.81995 9.81992C10.3699 9.25992 11.1499 8.91992 11.9999 8.91992C13.7099 8.91992 15.0799 10.2899 15.0799 11.9999Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M2.75 2.75L6.59 6.59L9.82 9.82L14.18 14.18L17.41 17.41L21.25 21.25"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <div className="wrap-svg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.2 9.01006C21.6 10.7001 21.6 13.3001 20.2 14.9901C18.2 17.4001 15.27 18.9401 12 18.9401C8.73001 18.9401 5.81 17.4101 3.8 14.9901C2.4 13.3001 2.4 10.7001 3.8 9.01006C5.8 6.60006 8.73001 5.06006 12 5.06006C15.27 5.06006 18.19 6.59006 20.2 9.01006Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M20.2 9.01006C21.6 10.7001 21.6 13.3001 20.2 14.9901C18.2 17.4001 15.27 18.9401 12 18.9401C8.73001 18.9401 5.81 17.4101 3.8 14.9901C2.4 13.3001 2.4 10.7001 3.8 9.01006C5.8 6.60006 8.73001 5.06006 12 5.06006C15.27 5.06006 18.19 6.59006 20.2 9.01006Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M11.9999 15.0802C13.7009 15.0802 15.0799 13.7012 15.0799 12.0002C15.0799 10.2991 13.7009 8.92017 11.9999 8.92017C10.2989 8.92017 8.91992 10.2991 8.91992 12.0002C8.91992 13.7012 10.2989 15.0802 11.9999 15.0802Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="title-status {errors.oldPassword==null || checkOld.length > 0 ?'d-lg-none':'' }">
              <span className="error-item1">
                <p>
                  {errors.oldPassword}
                  {checkOld}
                </p>
              </span>
            </div>
          </div>
          <div className="custom-input">
            <div className="wrap-info">
              <div className="title-status">
                <p>Mật khẩu mới</p>
              </div>
              <div className="desc "></div>
            </div>
            <div className="wrap-input ">
              <div className="wrap-text">
                <input
                  className="form-control border-0 p-0"
                  type={newpasswordShow ? "text" : "password"}
                  name="ip_reset_pw"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ border: "none" }}
                />
              </div>
              <div onClick={toggleNewPassword}>
                {newpasswordShow ? (
                  <div className="wrap-svg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http:www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.52 18.6297C13.71 18.8397 12.87 18.9397 12 18.9397C8.73 18.9397 5.8 17.4097 3.8 14.9897C2.4 13.2997 2.4 10.6897 3.8 9.00969C3.96 8.80969 4.14 8.61969 4.32 8.42969"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M20.2 14.9896C19.4 15.9496 18.45 16.7696 17.4 17.4096L6.58997 6.58957C8.17997 5.60957 10.02 5.05957 12 5.05957C15.27 5.05957 18.2 6.58957 20.2 9.00957C21.6 10.6896 21.6 13.3096 20.2 14.9896Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M15.0799 11.9999C15.0799 12.8499 14.7299 13.6199 14.1799 14.1799L9.81995 9.81992C10.3699 9.25992 11.1499 8.91992 11.9999 8.91992C13.7099 8.91992 15.0799 10.2899 15.0799 11.9999Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M2.75 2.75L6.59 6.59L9.82 9.82L14.18 14.18L17.41 17.41L21.25 21.25"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <div className="wrap-svg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.2 9.01006C21.6 10.7001 21.6 13.3001 20.2 14.9901C18.2 17.4001 15.27 18.9401 12 18.9401C8.73001 18.9401 5.81 17.4101 3.8 14.9901C2.4 13.3001 2.4 10.7001 3.8 9.01006C5.8 6.60006 8.73001 5.06006 12 5.06006C15.27 5.06006 18.19 6.59006 20.2 9.01006Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M20.2 9.01006C21.6 10.7001 21.6 13.3001 20.2 14.9901C18.2 17.4001 15.27 18.9401 12 18.9401C8.73001 18.9401 5.81 17.4101 3.8 14.9901C2.4 13.3001 2.4 10.7001 3.8 9.01006C5.8 6.60006 8.73001 5.06006 12 5.06006C15.27 5.06006 18.19 6.59006 20.2 9.01006Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M11.9999 15.0802C13.7009 15.0802 15.0799 13.7012 15.0799 12.0002C15.0799 10.2991 13.7009 8.92017 11.9999 8.92017C10.2989 8.92017 8.91992 10.2991 8.91992 12.0002C8.91992 13.7012 10.2989 15.0802 11.9999 15.0802Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="title-status {errors.newPassword==null?'d-lg-none':'' }">
              <span className="error-item1">
                <p>{errors.newPassword}</p>
              </span>
            </div>
          </div>
          <div className="custom-input">
            <div className="wrap-info">
              <div className="title-status">
                <p>Xác nhận mật khẩu mới</p>
              </div>
              <div className="desc "></div>
            </div>
            <div className="wrap-input ">
              <div className="wrap-text">
                <input
                  className="form-control border-0 p-0"
                  type={repasswordShow ? "text" : "password"}
                  name="ip_reset_pw_confirm"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <div onClick={toggleRePassword}>
                {repasswordShow ? (
                  <div className="wrap-svg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http:www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.52 18.6297C13.71 18.8397 12.87 18.9397 12 18.9397C8.73 18.9397 5.8 17.4097 3.8 14.9897C2.4 13.2997 2.4 10.6897 3.8 9.00969C3.96 8.80969 4.14 8.61969 4.32 8.42969"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M20.2 14.9896C19.4 15.9496 18.45 16.7696 17.4 17.4096L6.58997 6.58957C8.17997 5.60957 10.02 5.05957 12 5.05957C15.27 5.05957 18.2 6.58957 20.2 9.00957C21.6 10.6896 21.6 13.3096 20.2 14.9896Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M15.0799 11.9999C15.0799 12.8499 14.7299 13.6199 14.1799 14.1799L9.81995 9.81992C10.3699 9.25992 11.1499 8.91992 11.9999 8.91992C13.7099 8.91992 15.0799 10.2899 15.0799 11.9999Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M2.75 2.75L6.59 6.59L9.82 9.82L14.18 14.18L17.41 17.41L21.25 21.25"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <div className="wrap-svg">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.2 9.01006C21.6 10.7001 21.6 13.3001 20.2 14.9901C18.2 17.4001 15.27 18.9401 12 18.9401C8.73001 18.9401 5.81 17.4101 3.8 14.9901C2.4 13.3001 2.4 10.7001 3.8 9.01006C5.8 6.60006 8.73001 5.06006 12 5.06006C15.27 5.06006 18.19 6.59006 20.2 9.01006Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M20.2 9.01006C21.6 10.7001 21.6 13.3001 20.2 14.9901C18.2 17.4001 15.27 18.9401 12 18.9401C8.73001 18.9401 5.81 17.4101 3.8 14.9901C2.4 13.3001 2.4 10.7001 3.8 9.01006C5.8 6.60006 8.73001 5.06006 12 5.06006C15.27 5.06006 18.19 6.59006 20.2 9.01006Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M11.9999 15.0802C13.7009 15.0802 15.0799 13.7012 15.0799 12.0002C15.0799 10.2991 13.7009 8.92017 11.9999 8.92017C10.2989 8.92017 8.91992 10.2991 8.91992 12.0002C8.91992 13.7012 10.2989 15.0802 11.9999 15.0802Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="title-status {errors.confirmNewPassword==null?'d-lg-none':'' }">
              <span className="error-item1">
                <p>{errors.confirmNewPassword}</p>
              </span>
            </div>
          </div>
          <div className="apply-button">
            <a className="btn btn--m btn-success" onClick={handleChangepass}>
              Xác nhận
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default Changepassword;
