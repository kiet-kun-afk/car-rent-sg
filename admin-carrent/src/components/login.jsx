import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer} from 'react-toastify';

import ToastComponent from '../assets/toasty';

import '../styles/styleLogin.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append("emailOrPhoneNumber", username);
			formData.append("password", password);

			const response = await axios.post(
				"http://localhost:8080/api/v1/staff/login",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			const { token, roles } = response.data.data;
			localStorage.setItem("token", token);
			localStorage.setItem("roles", roles);
			navigate("/admin/trangchu");
			//ToastComponent('success', 'Đăng nhập thành công !');
		} catch (error) {
			ToastComponent('error', 'Tài khoản hoặc mật khẩu chưa chính xác !');
			//console.log(error);
		}
	};
    // const loginClick = (e) => {
    //     e.preventDefault();
    //     if (username === 'admin' && password === '123') {
    //         window.location.href = '/admin/trangchu';
    //     } else {
    //         ToastComponent('error','Tài khoản hoặc mật khẩu chưa chính xác!')
    //     }
    // }

    return (
        <div className="wrapper">
            <div className="main-form">
                    <div className="mainlayout">
                        <div className="col-md-6 side-image">
                            <div className="text-login">
                                <p>Best company for developers - CarRentSG</p>
                            </div>
                        </div>
                        <div className="col-md-6 side-text">
                            <div className="input-box">
                                <img src="../img/logoCarrent.png" alt="" />
                                <header>ĐĂNG NHẬP</header>
                                <form onSubmit={handleLogin}>
                                    <div className="input-field">
                                        <input type="text-login" className="input-form" id="username" required autoComplete="off"
                                            value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <label htmlFor="username">Tài Khoản</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="password" className="input-form" id="password" required
                                            value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <label htmlFor="password">Mật Khẩu</label>
                                    </div>
                                    <div className="input-field mt-3">
                                        <input type="submit" className="btn-submit" id="login-submit" value="ĐĂNG NHẬP"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer /> 
            </div>
    );
}

export default Login;