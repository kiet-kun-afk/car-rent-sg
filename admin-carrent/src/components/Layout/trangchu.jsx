import React from "react";

function TrangChu() {
    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Trang chủ</h1>
                    </div>
                    <a href="#" className="btn-download">
                        <i className='bx bxs-cloud-download' ></i>
                        <span className="text">Download PDF</span>
                    </a>
                </div>

                <ul className="box-info">
                    <li>
                        <i className='bx bxs-calendar-check' ></i>
                        <span className="text">
                            <h3>7979</h3>
                            <p>Đơn Hàng Mới</p>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-group' ></i>
                        <span className="text">
                            <h3>2024</h3>
                            <p>Khách Hàng</p>
                        </span>
                    </li>
                    <li>
                        <i className='bx bxs-dollar-circle' ></i>
                        <span className="text">
                            <h3>1.000.000</h3>
                            <p>Doanh Thu</p>
                        </span>
                    </li>
                </ul>


                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Đơn Hàng Gần Đây</h3>
                            <i className='bx bx-search' ></i>
                            <i className='bx bx-filter' ></i>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tài khoản</th>
                                    <th>Ngày đặt hàng</th>
                                    <th>Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="../img/avatar_dattran.png" />
                                        <p>Dat Tran</p>
                                    </td>
                                    <td>01-06-2024</td>
                                    <td><span className="status completed">Đã xử lý</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="../img/avatar_dattran.png" />
                                        <p>Dat Tran</p>
                                    </td>
                                    <td>01-06-2024</td>
                                    <td><span className="status pending">Chưa xử lý</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="../img/avatar_dattran.png" />
                                        <p>Dat Tran</p>
                                    </td>
                                    <td>01-06-2024</td>
                                    <td><span className="status process">Đang xử lý</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="../img/avatar_dattran.png" />
                                        <p>Dat Tran</p>
                                    </td>
                                    <td>01-06-2024</td>
                                    <td><span className="status pending">Chưa xử lý</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="../img/avatar_dattran.png" />
                                        <p>Dat Tran</p>
                                    </td>
                                    <td>01-06-2024</td>
                                    <td><span className="status completed">Đã xử lý</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="todo">
                        <div className="head">
                            <h3>Khác</h3>
                            <i className='bx bx-plus' ></i>
                            <i className='bx bx-filter' ></i>
                        </div>
                        <ul className="todo-list">
                            <li className="completed">
                                <p>Abc</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                            <li className="completed">
                                <p>Abc</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                            <li className="not-completed">
                                <p>Abc</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                            <li className="completed">
                                <p>Abc</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                            <li className="not-completed">
                                <p>Abc</p>
                                <i className='bx bx-dots-vertical-rounded' ></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </>

    )
}

export default TrangChu;