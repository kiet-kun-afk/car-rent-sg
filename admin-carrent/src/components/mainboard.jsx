import React from 'react';

import { Link, Outlet } from 'react-router-dom';

import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './header';

import '../styles/style.css';
import '../styles/styleKH.css';

import '../adminJS/dashboard';

function mainboard() {
    const sNotify = () =>
        toast.success('Success !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    const wNotify = () =>
        toast.warn('Something not right !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    const errNotify = () =>
        toast.error('Error !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });;
    const iNotify = () =>
        toast.info('Hello !', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });;


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
                            <i class='bx bx-car'></i>
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
                    <li>
                        <Link to='/admin/bieudo'>
                            <i className='bx bx-line-chart'></i>
                            <span className="text">Biểu Đồ</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin/nhanvien'>
                            <i className='bx bxs-user-circle' ></i>
                            <span className="text">Nhân Sự</span>
                        </Link>
                    </li>
                </ul>
                <ul className="side-menu">
                    <li>
                        <p id="line" className="line"></p>
                    </li>
                    <li>
                        <a href="#" onClick={errNotify}>
                            <i className='bx bxs-cog' ></i>
                            <span className="text">Cài Đặt</span>
                        </a>
                    </li>
                    <li>
                        <Link className="logout" to='/'>
                            <i className='bx bx-log-out'></i>
                            <span className="text">Đăng Xuất</span>
                        </Link>
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover                             
            />
        </div>
    )
}

export default mainboard;
