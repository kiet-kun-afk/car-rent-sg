import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../config/axiosConfig";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./header";

import "../styles/style.css";
import "../styles/styleKH.css";
import "../styles/styleBB.css";

import "../adminJS/dashboard";

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
      navigate("/admin/login");
    }
  };

  const [records, setRecords] = useState([]);
  const loadListRecords = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/records/list-delivery-record-not-return-yet"
    );

    setRecords(result.data.data);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/admin/login");
    localStorage.removeItem("token");
  };

  const userAccount = localStorage.getItem("token");
  const userRoles = localStorage.getItem("roles");

  useEffect(() => {
    if (userAccount) {
      fetchUser();
      loadListRecords();
    }
  }, []);

  // if (user == null ) {
  //   return navigate("/admin/login");
  // }

  return (
    <div id="mainboard" className="mainboard">
      {/* <!-- SIDEBAR --> */}

      <section id="sidebar">
        <Link className="brand" to="/admin/trangchu">
          <img
            id="brand-img"
            className="brand-img"
            src="../img/logoCarrent.png"
            alt="icon"
          />
          {/* <!-- <span className="brand-name">CARRENTSG</span> --> */}
        </Link>
        <ul className="side-menu top">
          <li id="side-menu-trangchu" className="active">
            <Link to="/admin/trangchu">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Trang Chủ</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/xe">
              <i className="bx bx-car"></i>
              <span className="text">Danh Sách Xe</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/khachhang">
              <i className="bx bx-user"></i>
              <span className="text">Khách Hàng</span>
            </Link>
          </li>
          {/* <li>
            <Link to="/admin/hoadon">
              <i className="bx bx-task"></i>
              <span className="text">Đơn Hàng</span>
            </Link>
          </li> */}
          <li>
            <Link to="/admin/donthue">
              <i className="bx bx-receipt"></i>
              <span className="text">Đơn Thuê</span>
            </Link>
          </li>
          {records.length > 0 && (
            <li>
              <Link to="/admin/giaoxe">
                <i className="bx bx-receipt"></i>
                <div className="position-relative">
                  <span className="text">Biên Bản Bàn Giao</span>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {records.length}
                  </span>
                </div>
              </Link>
            </li>
          )}
          <li>
            <Link to="/admin/traxe">
              <i className="bx bx-receipt"></i>
              <span className="text">Biên Bản Trả Xe</span>
            </Link>
          </li>
          {userRoles === "ADMIN_ROLE" ? (
            <>
              <li>
                <Link to="/admin/thongke">
                  <i className="bx bx-line-chart"></i>
                  <span className="text">Thống kê</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/bieudo">
                  <i className="bx bx-line-chart"></i>
                  <span className="text">Theo dõi giao dịch</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/nhanvien">
                  <i className="bx bxs-user-circle"></i>
                  <span className="text">Nhân Sự</span>
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
        <ul className="side-menu">
          <li>
            <p id="line" className="line"></p>
          </li>
          <li>
            <Link to="/admin/doimatkhau">
              <i className="bx bxs-cog"></i>
              <span className="text">Đổi Mật Khẩu</span>
            </Link>
          </li>
          <li>
            <a className="logout" onClick={handleLogout}>
              <i className="bx bx-log-out"></i>
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
  );
}

export default Mainboard;
