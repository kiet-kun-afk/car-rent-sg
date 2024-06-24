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

	const handleChangepass = async (e) => {
		e.preventDefault();
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
			ToastComponent("err", "Đổi mật khẩu thất bại !");
			console.log(error);
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
				<p>
					Vui lòng nhập mật khẩu hiện tại của bạn để thay đổi mật khẩu
				</p>
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
									onChange={(e) =>
										setOldPassword(e.target.value)
									}
								/>
							</div>
							<div
								className="wrap-svg"
								onClick={toggleOldPassword}
							>
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
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
									<path
										d="M20.2 14.9896C19.4 15.9496 18.45 16.7696 17.4 17.4096L6.58997 6.58957C8.17997 5.60957 10.02 5.05957 12 5.05957C15.27 5.05957 18.2 6.58957 20.2 9.00957C21.6 10.6896 21.6 13.3096 20.2 14.9896Z"
										stroke="black"
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
									<path
										d="M15.0799 11.9999C15.0799 12.8499 14.7299 13.6199 14.1799 14.1799L9.81995 9.81992C10.3699 9.25992 11.1499 8.91992 11.9999 8.91992C13.7099 8.91992 15.0799 10.2899 15.0799 11.9999Z"
										stroke="black"
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
									<path
										d="M2.75 2.75L6.59 6.59L9.82 9.82L14.18 14.18L17.41 17.41L21.25 21.25"
										stroke="black"
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
								</svg>
							</div>
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
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									style={{border: "none"}}
								/>
							</div>
							<div
								className="wrap-svg"
								onClick={toggleNewPassword}
							>
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
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
									<path
										d="M20.2 14.9896C19.4 15.9496 18.45 16.7696 17.4 17.4096L6.58997 6.58957C8.17997 5.60957 10.02 5.05957 12 5.05957C15.27 5.05957 18.2 6.58957 20.2 9.00957C21.6 10.6896 21.6 13.3096 20.2 14.9896Z"
										stroke="black"
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
									<path
										d="M15.0799 11.9999C15.0799 12.8499 14.7299 13.6199 14.1799 14.1799L9.81995 9.81992C10.3699 9.25992 11.1499 8.91992 11.9999 8.91992C13.7099 8.91992 15.0799 10.2899 15.0799 11.9999Z"
										stroke="black"
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
									<path
										d="M2.75 2.75L6.59 6.59L9.82 9.82L14.18 14.18L17.41 17.41L21.25 21.25"
										stroke="black"
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
								</svg>
							</div>
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
									onChange={(e) =>
										setConfirmNewPassword(e.target.value)
									}
								/>
							</div>
							<div
								className="wrap-svg"
								onClick={toggleRePassword}
							>
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
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
									<path
										d="M20.2 14.9896C19.4 15.9496 18.45 16.7696 17.4 17.4096L6.58997 6.58957C8.17997 5.60957 10.02 5.05957 12 5.05957C15.27 5.05957 18.2 6.58957 20.2 9.00957C21.6 10.6896 21.6 13.3096 20.2 14.9896Z"
										stroke="black"
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
									<path
										d="M15.0799 11.9999C15.0799 12.8499 14.7299 13.6199 14.1799 14.1799L9.81995 9.81992C10.3699 9.25992 11.1499 8.91992 11.9999 8.91992C13.7099 8.91992 15.0799 10.2899 15.0799 11.9999Z"
										stroke="black"
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
									<path
										d="M2.75 2.75L6.59 6.59L9.82 9.82L14.18 14.18L17.41 17.41L21.25 21.25"
										stroke="black"
										stroke-width="1.5"
										strokeLinecap="round"
									></path>
								</svg>
							</div>
						</div>
					</div>
					<div className="apply-button">
						<a
							className="btn btn--m btn-success"
							onClick={handleChangepass}
						>
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
