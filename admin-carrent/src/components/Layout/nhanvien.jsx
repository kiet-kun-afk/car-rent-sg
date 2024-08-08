import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function NhanVien() {
  const [selectedDate, setSelectedDate] = useState(null);
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
            <h1>Nhân Viên</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Nhân viên
                </a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <i className="bx bxs-cloud-download"></i>
            <button
              class="btn "
              data-bs-toggle="modal"
              data-bs-target="#createStaff"
            >
              Thêm Nhân Viên
            </button>
          </a>
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Danh sách nhân viên</h3>
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
                    <th>Họ Tên</th>
                    <th>Giới Tính</th>
                    <th>Số Điện Thoại</th>
                    <th>Email</th>
                    <th className="th-status">Trạng Thái</th>
                    <th>Chi Tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {staffs.map((staff, index) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-start">
                        {staff.fullName ? staff.fullName : "Họ và tên"}
                      </td>
                      <td className="text-center">
                        {staff.gender ? "Nam" : "Nữ"}
                      </td>
                      <td className="text-center">{staff.phoneNumber}</td>
                      <td className="text-start">{staff.email}</td>
                      <td className="text-center">
                        {staff.status ? (
                          <span style={{ color: "green", fontSize: "16px" }}>
                            Hoạt động
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>Khóa</span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-light"
                          data-id={staff.email}
                          onClick={handleCarID}
                          data-bs-toggle="modal"
                          data-bs-target="#chitietNV"
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
          id="chitietNV"
          tabIndex="-1"
          aria-labelledby="chitietNVLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="chitietNVLabel">
                  Chi tiết nhân viên
                </h1>
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
                              <h3>{staff.fullName}</h3>
                              <p>Tham gia: {formatDate(staff.createdAt)}</p>
                            </div>
                            <div className="col-sm-4 p-0 d-flex align-items-center justify-content-center">
                              <div>
                                <span className="badge text-bg-success">
                                  {staff.status ? "Hoạt động" : "Khóa"}
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
                              value={staff.phoneNumber}
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="name">Email</label>
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              value={staff.email}
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
                                  <option value="1">
                                    {staff.gender ? "Nam" : "Nữ"}
                                  </option>
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
                                  value={staff.birthDate}
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
                              value={
                                staff.address ? "Quận 12, TP.HCM" : "TP.HCM"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container-custom">
                    <div className="header-custom">
                      <h2>Căn cước công dân</h2>
                    </div>
                    {/* <!-- <div className="alert-custom">
                                        Lưu ý: để tránh phát sinh vấn đề trong quá trình thuê xe, người đặt xe trên Mioto (đã xác
                                        thực GPLX) đồng thời phải là người nhận xe.
                                    </div> --> */}
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
                      <h2>Căn cước công dân</h2>
                    </div>
                    {/* <!-- <div className="alert-custom">
                                        Lưu ý: để tránh phát sinh vấn đề trong quá trình thuê xe, người đặt xe trên Mioto (đã xác
                                        thực GPLX) đồng thời phải là người nhận xe.
                                    </div> --> */}
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
                  Cập nhật thông tin
                </button>
                <button type="button" className="btn btn-danger">
                  Vô hiệu hóa tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <ChitietNV show={modalShow} onHide={() => setModalShow(false)} /> */}

        {/* modal create nv  */}

        <div
          class="modal fade"
          id="createStaff"
          tabindex="-1"
          aria-labelledby="CreateNewStaffLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title" id="createStaff">
                  Thêm Mới Nhân Viên
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  id="closebtn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <form>
                <div className="modal-body">
                  <div className="container-custom">
                    <div className="row">
                      <div className="col-md-6">
                        <h5>Thông Tin Nhân Viên</h5>
                        <div className="form-group mt-3">
                          <label htmlFor="frontImage">Hình Đại Diện</label>
                          <input
                            type="file"
                            name="frontImage"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="describe">Họ và tên</label>
                          <input
                            type="text"
                            id="describe"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="features">Số Điện Thoại</label>
                          <input
                            type="text"
                            id="features"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="features">Email</label>
                          <input
                            type="text"
                            id="features"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="features">Ngày Sinh</label>
                          <input
                            type="date"
                            id="features"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="features">Chức Vụ</label>
                          <input
                            type="text"
                            id="features"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-6 contact-info">
                        <div className="contact-detail">
                          <h5>Thông Tin căn cước </h5>
                          <div className="form-group mt-3">
                            <label htmlFor="frontImage">Hình Mặt Trước</label>
                            <input
                              type="file"
                              name="frontImage"
                              className="form-control"
                            />
                          </div>

                          <div className="form-group mt-3">
                            <label htmlFor="frontImage">Hình Mặt Sau</label>
                            <input
                              type="file"
                              name="frontImage"
                              className="form-control"
                            />
                          </div>

                          <div className="form-group mt-3">
                            <label htmlFor="carName">Số thẻ</label>
                            <input
                              type="text"
                              id="carName"
                              className="form-control"
                            />
                          </div>
                          <div className="row mt-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="numberOfSeat">Ngày Cấp</label>
                                <input
                                  type="date"
                                  id="numberOfSeat"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="transmission">
                                  Ngày Hết Hạn
                                </label>
                                <input
                                  type="date"
                                  id="transmission"
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>

                          <h5 class="mt-5">Thông tin địa chỉ</h5>

                          <div class="row">
                            <div class="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="transmission">Tên Đường</label>
                                <input
                                  type="text"
                                  id="transmission"
                                  className="form-control"
                                />
                              </div>

                              <div className="form-group  mt-3">
                                <label htmlFor="transmission">
                                  Tên Phường{" "}
                                </label>
                                <input
                                  type="text"
                                  id="transmission"
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div class="col-sm-6 ">
                              <div className="form-group">
                                <label htmlFor="transmission">Tên Quận</label>
                                <input
                                  type="text"
                                  id="transmission"
                                  className="form-control"
                                />
                              </div>

                              <div className="form-group  mt-3">
                                <label htmlFor="transmission">
                                  Tên Thành Phố{" "}
                                </label>
                                <input
                                  type="text"
                                  id="transmission"
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-success">
                    Thêm Nhân Viên
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default NhanVien;

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';

// function ChitietNV(props) {
//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Chi Tiết Nhân Viên
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                         <Form.Label>Email address</Form.Label>
//                         <Form.Control type="email" placeholder="name@example.com" />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//                         <Form.Label>Example textarea</Form.Label>
//                         <Form.Control as="textarea" rows={3} />
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={props.onHide}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }
