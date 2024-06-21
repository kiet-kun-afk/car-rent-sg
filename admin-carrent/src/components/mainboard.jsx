import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosConfig from "../config/axiosConfig";

import { Link, Outlet } from 'react-router-dom';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './header';

import '../styles/style.css';
import '../styles/styleKH.css';

import '../adminJS/dashboard';

function Mainboard() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await axiosConfig.get(
                "http://localhost:8080/api/v1/staffs/current-staff"
            );
            setUser(response.data.data);
        } catch (error) {
            console.error("Failed to fetch user", error);
        }
    }

    const handleLogout = () => {
        setUser(null);
        navigate("/admin/login");
        localStorage.removeItem('token');
    };

    const userAccount = localStorage.getItem('token');
    const userRoles = localStorage.getItem('roles');

    useEffect(() => {
        if (userAccount) {
            fetchUser();
        }

    }, []);

    return (
        <div id="mainboard" className="mainboard">
            {/* <!-- SIDEBAR --> */}

            <section id="sidebar">
                <Link className="brand" to='/admin/trangchu'>
                    <img id="brand-img" className="brand-img" src='../img/logoCarrent.png' alt="icon" />
                    {/* <!-- <span className="brand-name">CARRENTSG</span> --> */}
                </Link>
                <ul className="side-menu top">
                    <li id='side-menu-trangchu' className="active">
                        <Link to='/admin/trangchu'>
                            <i className='bx bxs-dashboard' ></i>
                            <span className="text">Trang Chủ</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/xe'>
                            <i className='bx bx-car'></i>
                            <span className="text">Danh Sách Xe</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/khachhang'>
                            <i className='bx bx-user'></i>
                            <span className="text">Khách Hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/hoadon'>
                            <i className='bx bx-task'></i>
                            <span className="text">Đơn Hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/hopdong'>
                            <i className='bx bx-receipt'></i>
                            <span className="text">Hợp Đồng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/thongke'>
                            <i className='bx bx-line-chart'></i>
                            <span className="text">Thống kê</span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to='/admin/bieudo'>
                            <i className='bx bx-line-chart'></i>
                            <span className="text">Biểu Đồ</span>
                        </Link>
                    </li> */}
                    {
                        userRoles === 'ADMIN_ROLE' ? (
                            <>
                                 <li>
                                    <Link to='/admin/nhanvien'>
                                        <i className='bx bxs-user-circle' ></i>
                                        <span className="text">Nhân Sự</span>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>                               
                            </>
                        )
                    }

                </ul>
                <ul className="side-menu">
                    <li>
                        <p id="line" className="line"></p>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-cog' ></i>
                            <span className="text">Cài Đặt</span>
                        </a>
                    </li>
                    <li>
                        <a className="logout" onClick={handleLogout} >
                            <i className='bx bx-log-out'></i>
                            <span className="text">Đăng Xuất</span>
                        </a>
                    </li>
                </ul>
            </section>
            {/* <!-- SIDEBAR --> */}


            {/* <!-- CONTENT -->  */}
            <section id="content">
                {/* <!-- NAVBAR -->  */}
                <Header />
                {/* <!-- NAVBAR -->  */}

                {/* <!-- MAIN -->  */}
                <Outlet />
                {/* <!-- MAIN --> */}
                {/* */}
            </section>
            {/* <!-- CONTENT --> */}
            <ToastContainer />
        </div>
    )
}

export default Mainboard;
