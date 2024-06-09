import React, { useState, useEffect } from "react";
import axios from "axios";

import '../styles/styleLogin.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     loadUsers();
    // }, [])

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/user/all");
        console.log(result);
    }

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${username}`);
        setUsers(result.data);
        console.log(users);
    }

    console.log(username);
    console.log(password);


    const loginClick = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === '123') {
            window.location.href = '/admin/trangchu';
        } else {
            alert('Sai tài khoản hoặc mật khẩu');
        }
    }

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
                                <form action="">
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
                                        <input type="submit" className="btn-submit" id="login-submit" value="ĐĂNG NHẬP"
                                            onClick={loginClick} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Login;