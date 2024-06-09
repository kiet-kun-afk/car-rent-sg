import React from 'react';
import 'bootstrap/dist/js/bootstrap.min.js'

function Header() {
    return (
        <div className="c-header">
            <div className="c-container">
                <div className="header-menu">
                    <nav className="navbar navbar-expand-lg p-0" style={{width: '1280px'}}>
                        <div className="container-fluid p-0">
                            <a className="navbar-brand" href="/carrentsg">
                                <div className="header-logo">
                                    <img src="../img/logoCarrent.png" />
                                </div>
                            </a>
                            <button className="navbar-toggler me-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse flex-row-reverse ms-auto" id="navbarTogglerDemo03">
                                <ul className="navbar-nav align-items-center m-0 ">
                                    <li className="nav-item">
                                        <a href="/carrentsg/car">Xe Cho Thuê</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#">Về CarrentSG</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#">Chuyến Của Tôi</a>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link vertical-line"></div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="profile">
                                            <div className="notification">
                                                <i className="fa-regular fa-bell" style={{ fontSize: "1.3rem" }}></i>
                                            </div>
                                            <a href="/">
                                                <div className="profile-avatar">
                                                    <img src="../img/avatar-4.png" alt="" />
                                                </div>
                                            </a>
                                            <div className="dropdown">
                                                <button className="btn border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                                    <span className="name"></span>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="">Quản Lý Tài Khoản</a></li>
                                                    <li><a className="dropdown-item" href="">Đăng Xuất</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/carrentsg/register" data-bs-toggle="modal" data-bs-target="#regisWindow">Đăng Ký</a>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-outline-success" href="/carrentsg/login" data-bs-toggle="modal" data-bs-target="#loginWindow">Đăng Nhập</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                {/* <div className="header-menu">
                    <a href="@{/car/home}">Quản Lý Xe</a>
                    <a href="@{/car/dsxe}">Xe Cho Thuê</a>
                    <a href="#">Về CarR</a>
                    <a href="#">Trở Thành Đối Tác</a>
                    <a href="#">Chuyến Của Tôi</a>
                    <div className="vertical-line"></div>
                    <div className="profile">
                        <div className="notification">
                            <i className="fa-regular fa-bell" style={{ fontSize: "1.3rem" }}></i>
                        </div>
                        <a href="/">
                            <div className="profile-avatar">
                                <img src="../img/avatar_dattran.png" alt="" />
                            </div>
                        </a>
                        <div className="dropdown">
                            <a className="btn border-0 dropdown-toggle" href="" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <span className="name"></span>
                            </a>

                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="">Quản Lý Tài Khoản</a></li>
                                <li><a className="dropdown-item" href="">Đăng Xuất</a></li>
                            </ul>
                        </div>
                    </div>
                    <a href="">Đăng Ký</a>
                    <a className="btn btn-light btn-login" href="">Đăng Nhập</a>
                </div> */}
            </div>
        </div>
    );
}

export default Header;