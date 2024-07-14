import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function TraXe() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [nowDate, setnowDate] = useState("");
  const chooseDate = (date) => {
    setSelectedDate(date);
  };

  function getNgayThangNam(dateString) {
    // Chuyển đổi chuỗi ngày tháng năm sang đối tượng Date
    const date = new Date(dateString);

    // Lấy ngày, tháng và năm
    const ngay = date.getDate();
    const thang = date.getMonth() + 1;
    const nam = date.getFullYear();

    // Cắt chuỗi ngày tháng năm
    const ngayThangNam = `${ngay}/${thang}/${nam}`;

    // Trả về chuỗi ngày tháng năm đã cắt
    return ngayThangNam;
  }

  function getCurrentDate() {
    // Lấy ngày hiện tại
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần +1
    const dd = String(today.getDate()).padStart(2, "0");
    // Định dạng ngày theo chuẩn yyyy-mm-dd
    const currentDate = `${yyyy}-${mm}-${dd}`;

    // Đặt giá trị mặc định cho input
    setnowDate(currentDate);
  }

  const [staffs, setStaffs] = useState([]);
  const loadListStaff = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/staffs");
    console.log(result.data.data);

    setStaffs(result.data.data);
  };

  const handleCarID = (e) => {
    const staffID = e.currentTarget.getAttribute("data-id");
    console.log(staffID);
    if (staffID) {
      loadStaff(staffID);
    } else {
      alert("Please enter a user ID");
    }
  };

  const [staff, setStaff] = useState(null);
  const loadStaff = async (staffID) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/staffs/${staffID}`
      );
      setStaff(res.data.data);
      console.log(staff);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadListStaff();
  }, []);

  const formatDate = (localdatetime) => {
    // Tạo một đối tượng Date từ localdatetime
    const date = new Date(localdatetime);

    // Lấy ra ngày, tháng và năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Định dạng lại thành dd/MM/yyyy
    const formattedDate = `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;

    return formattedDate;
  };

  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Biên Bản Trả Xe</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Biên Bản Bàn Trả Xe
                </a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <i class="fa-solid fa-plus"></i>
            <span className="text">Thêm mới</span>
          </a>
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Danh sách biên bản trả xe</h3>
              <form action="" id="search-box">
                <input
                  type="text"
                  id="search-text"
                  placeholder="Bạn cần tìm kiếm gì nhỉ?"
                />
                <button id="search-btn">
                  <i className="bx bx-search"></i>
                </button>
              </form>

              <div className="dropdown">
                <button className="dropbtn">
                  <i className="bx bx-filter"></i>
                </button>
                <div className="dropdown-content">
                  <a href="#">Sắp xếp trạng thái</a>
                  <a href="#">Sắp xếp giá thuê giảm</a>
                  <a href="#">Sắp xếp giá thuê tăng</a>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive rounded">
              <table className="table table-hover text-center m-0">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ngày lập biên bản</th>
                    <th>Người lập biên bản</th>
                    <th>Khách hàng</th>
                    <th>Chi Tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {staffs.map((staff, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td className="text-center">dd/MM/yyyy</td>
                      <td className="text-start">{staff.fullName? staff.fullName : "Nhân viên" }</td>
                      <td>Khách hàng</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-light"
                          data-id={staff.email}
                          onClick={handleCarID}
                          data-bs-toggle="modal"
                          data-bs-target="#bienbanTX"
                        >
                          <i className="fa-regular fa-address-card"></i>
                        </button>
                      </td>
                      {/* <td><Button variant="light" onClick={handleOpen}><i className="fa-regular fa-address-card"></i></Button></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="bienbanTX"
          tabIndex="-1"
          aria-labelledby="bienbanTX"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Chi tiết biên bản bàn giao</h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              {staff ? (
                <div className="modal-body">
                  <div className="container-custom">
                    <div className="row">
                      <div className="col-md-6 contact-info">
                        <div className="header-custom-1">
                          <h5>Bên cho thuê</h5>
                        </div>
                        <div className="contact-detail">
                          <div className="form-group mt-3">
                            <label htmlFor="name">Họ và tên</label>
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              value={
                                staff.fullName ? staff.fullName : "Nhân viên"
                              }
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="gplx">Số điện thoại</label>
                            <input
                              type="text"
                              id="gplx"
                              className="form-control"
                              value={staff.phoneNumber}
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="name">Ngày giao </label>
                            <input
                              type="date"
                              className="form-control"
                              id="nowDate"
                              name="nowDate"
                              value={nowDate}
                              onChange={(e) => setnowDate(e.target.value)}
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="name">Địa điểm giao xe</label>
                            <input
                              type="text"
                              id="address"
                              className="form-control"
                              value={
                                staff.address ? "Quận 12, TP.HCM" : "TP.HCM"
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 contact-info">
                        <div className="header-custom-1">
                          <h5>Bên thuê</h5>
                        </div>
                        <div className="contact-detail">
                          <div className="form-group mt-3">
                            <label htmlFor="name">Họ và tên</label>
                            <input
                              type="text"
                              placeholder="Họ và tên khách hàng"
                              id="name"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="gplx">Số điện thoại</label>
                            <input
                              type="text"
                              placeholder="Số điện thoại khách hàng"
                              id="gplx"
                              className="form-control"
                            />
                          </div>
                          <div className="row mt-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="name">Số CCCD</label>
                                <input
                                  type="text"
                                  placeholder="Số CCCD"
                                  id="gplx"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="dob">Ngày cấp</label>
                                <input
                                  type="date"
                                  id="dob"
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="name">Địa chỉ</label>
                            <input
                              type="text"
                              placeholder="Địa chỉ khách hàng"
                              id="address"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container-custom">
                    <div className="header-custom">
                      <h4>Xe</h4>
                    </div>
                    <div className="row m-0 license-content">
                      {/* Thông tin xe */}
                      <div className="header-custom-1">
                        <h5>Thông tin xe</h5>
                      </div>
                      <div className="row m-0">
                        <div className="col-sm-6 ps-0 pe-3 ">
                          <div className="form-group">
                            <label htmlFor="gplx">Xe</label>
                            <input
                              placeholder="Tên xe"
                              type="text"
                              id="gplx"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 ps-3 pe-0">
                          <div className="form-group">
                            <label htmlFor="dob">Biển Số</label>
                            <input
                              placeholder="Biển số xe"
                              type="text"
                              id="gplx"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tình trạng xe */}
                      <div className="header-custom-1">
                        <h5>Tình trạng xe</h5>
                      </div>
                      <div className="row m-0">
                        <div className="col-sm-6 ps-0 pe-3 ">
                          <div className="form-group">
                            <label htmlFor="gplx">Ngoại thất</label>
                            <textarea
                              placeholder="Ngoại thất xe"
                              type="text"
                              id="gplx"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 ps-3 pe-0">
                          <div className="form-group">
                            <label htmlFor="dob">Nội thất</label>
                            <textarea
                              placeholder="Nội thất xe"
                              type="text"
                              id="gplx"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hồ sơ xe */}
                      <div className="header-custom-1">
                        <h5>Bộ hồ sơ xe</h5>
                      </div>
                      <div className="form-group mt-1">
                        <label htmlFor="name">Giấy đăng kí ô tô</label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Giấy Tờ Xe"
                        />
                      </div>

                      <div className="form-group mt-1">
                        <label htmlFor="dob">Giấy chứng nhận bảo hiểm</label>
                        <input
                          type="text"
                          id="dob"
                          className="form-control"
                          placeholder="Bảo hiểm xe"
                        />
                      </div>

                      <div className="form-group mt-1">
                        <label htmlFor="dob">Giấy đăng kiểm xe</label>
                        <input
                          type="text"
                          id="dob"
                          className="form-control"
                          placeholder="Giấy tờ đăng kiểm xe"
                        />
                      </div>

                      {/* Thanh toán */}
                      <div className="header-custom-1">
                        <h5>Thanh toán</h5>
                      </div>
                      <div className="form-group mt-1">
                        <label htmlFor="dob">Tiền còn lại</label>
                        <input
                          type="text"
                          id="dob"
                          className="form-control"
                          placeholder="Số tiền còn lại cần phải thanh toán"
                        />
                      </div>
                      <div className="row m-0 pt-1">
                        <div className="col-sm-6 ps-0 pe-3 ">
                          <div className="form-group">
                            <label htmlFor="gplx">Chi phí phát sinh 1</label>
                            <input
                              placeholder="Trầy xước, hư hại, xe ám mùi hôi..."
                              type="text"
                              id="gplx"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 ps-3 pe-0">
                          <div className="form-group">
                            <label htmlFor="dob">Chi phí phát sinh 2</label>
                            <input
                              placeholder="Quá hạn, thuê thêm ngày..."
                              type="text"
                              id="gplx"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="modal-body">
                  <div className="container-custom">
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="profile-info">
                          <img
                            src="../img/avatar-4.png"
                            alt="Profile Picture"
                          />
                        </div>
                        <div className="profile-details">
                          <div className="row">
                            <div className="col-sm-8">
                              <h3>Người dùng</h3>
                              <p>Tham gia: dd/MM/yyyy</p>
                            </div>
                            <div className="col-sm-4 p-0 d-flex align-items-center justify-content-center">
                              <div>
                                <span className="badge text-bg-success">
                                  Hoạt động
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 contact-info">
                        <div className="contact-detail">
                          <div className="form-group mt-3">
                            <label htmlFor="gplx">Số điện thoại</label>
                            <input
                              type="text"
                              id="gplx"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="name">Email</label>
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                            />
                          </div>
                          <div className="row mt-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="name">Giới tính</label>
                                {/* <input type="text" id="name" value="Nam" className="form-control" /> */}
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                >
                                  <option value="1">Nam</option>
                                  <option value="2">Nữ</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="dob">Ngày sinh</label>
                                <input
                                  type="date"
                                  id="dob"
                                  className="form-control"
                                />
                                {/* <DatePicker selected={selectedDate} onChange={chooseDate} dateFormat="dd/MM/yyyy" /> */}
                                {/* <div className="input-group">
                                                                <input type="datetime-local" id="dob" className="form-control" />
                                                                <span className="input-group-text"><i className="fa-solid fa-calendar-days"></i></span>
                                                            </div> */}
                              </div>
                            </div>
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="name">Địa chỉ</label>
                            <input
                              type="text"
                              id="address"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container-custom">
                    <div className="header-custom">
                      <h4>Căn cước công dân</h4>
                    </div>
                    <div className="row m-0 license-content">
                      <div className="col-md-8 ps-0 pe-3  right">
                        <div className="form-group">
                          <label htmlFor="name">Họ và tên</label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                          />
                        </div>
                        <div className="row mt-3">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="gplx">Số CCCD</label>
                              <input
                                type="text"
                                id="gplx"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="dob">Ngày sinh</label>
                              <input
                                type="date"
                                id="dob"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="dob">Nơi cấp</label>
                          <input
                            type="text"
                            id="dob"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 left">
                        <img
                          className="img-fluid rounded mx-auto"
                          src="../img/avatar-4.png"
                          alt="Upload Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                <button type="button" className="btn btn-success">
                  <i className="fa-solid fa-check"></i> Lưu
                </button>
                {/* <button type="button" className="btn btn-danger">
                  Vô hiệu hóa tài khoản
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default TraXe;
