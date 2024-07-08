import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { color } from "@mui/system";
import { colors } from "@mui/material";

function KhachHang() {
  const sNotify = () =>
    toast.success("Success !", {
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
    toast.error("Error !", {
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

  const [customersWithPhone, setcustomersWithPhone] = useState(null);

  // chuyển kiểu date
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
  //

  const [customers, setCustomer] = useState([]);
  const loadListCustomer = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/customers/all"
    );
    console.log(result.data.data);

    setCustomer(result.data.data);
    console.log(customers);
  };

  useEffect(() => {
    loadListCustomer();
  }, []);

  const loadListCustomerPhonenumber = async (phoneNumber) => {
    const result1 = await axios.get(
      `http://localhost:8080/api/v1/customers/${phoneNumber}`
    );
    console.log(result1.data.data);

    setcustomersWithPhone(result1.data.data);
    console.log(customersWithPhone);
  };

  const DeleteCustomer = async (phoneNumber) => {
    try {
      const result1 = await axios.delete(
        `http://localhost:8080/api/v1/customers/delete/${phoneNumber}`
      );
      console.log(result1.data.message);
      sNotify();
      var btnclose = document.getElementById("closebtn");
      btnclose.click();
      loadListCustomer();
    } catch (error) {
      errNotify();
    }
  };

  const handleButtonClick = async (phoneNumber) => {
    await loadListCustomerPhonenumber(phoneNumber);
  };

  const DeleteButtonClick = async (phoneNumber) => {
    await DeleteCustomer(phoneNumber);
  };

  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Khách Hàng</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Khách hàng
                </a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <i className="bx bxs-cloud-download"></i>
            <span className="text">Download PDF</span>
          </a>
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Danh sách khách hàng</h3>

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
                  <a href="#">Sắp xếp A-Z</a>
                  <a href="#">Sắp xếp Z-A</a>
                </div>
              </div>
            </div>
            <div className="table-responsive rounded">
              <table className="table table-hover text-center m-0">
                <thead>
                  <tr>
                    <th>STT</th>
                    {/* <th>Mã KH</th> */}
                    <th>Họ Tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới Tính</th>
                    <th>Số Điện Thoại</th>
                    <th>Email</th>
                    <th>Địa Chỉ</th>
                    <th className="th-status">Trạng Thái</th>
                    <th>Chi Tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={customer.customer_id}>
                      <td>{index + 1}</td>
                      <td>{customer.fullName}</td>
                      <td>{formatDate(customer.birthDate)}</td>
                      <td>{customer.gender ? "Nam" : "Nữ"}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.email}</td>
                      <td>{customer.address.street}</td>
                      <td className="status completed">
                        <span>
                          {customer.status ? (
                            <span style={{ color: "green", fontSize: "16px" }}>
                              Hoạt Động{" "}
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              Không Hoạt Động
                            </span>
                          )}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-light"
                          data-bs-toggle="modal"
                          data-bs-target="#chitietKH"
                          onClick={() =>
                            handleButtonClick(customer.phoneNumber)
                          }
                        >
                          <i class="fa-solid fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal new */}
        <div
          class="modal fade"
          id="chitietKH"
          tabindex="-1"
          aria-labelledby="chitietKHLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="chitietKHLabel">
                  Chi tiết khách hàng
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  id="closebtn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="container-custom">
                  <div class="row">
                    <div class="col-md-6 ">
                      <div class="profile-info">
                        <img
                          src={`../img/${
                            customersWithPhone
                              ? customersWithPhone.avatarImage
                              : "avt"
                          }`}
                          alt="Profile Picture"
                        />
                      </div>
                      <div class="profile-details">
                        <h3>
                          {customersWithPhone
                            ? customersWithPhone.fullName
                            : "Người Dùng"}
                        </h3>
                        <div class="row m-0">
                          <div class="col-sm-9">
                            <p>
                              {" "}
                              Tham Gia:{" "}
                              {customersWithPhone
                                ? formatDate(customersWithPhone.updatedAt)
                                : "Ngày Tham Gia"}
                            </p>
                          </div>
                          <div class="col-sm-3 p-0 d-flex align-items-center justify-content-center">
                            <span>
                              {customersWithPhone ? (
                                customersWithPhone.status ? (
                                  <span class="badge text-bg-success">
                                    Hoạt Động{" "}
                                  </span>
                                ) : (
                                  <span class="badge text-bg-danger">
                                    Ngưng Hoạt Động
                                  </span>
                                )
                              ) : (
                                "Người Dùng"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 contact-info">
                      <div class="contact-detail">
                        <div class="form-group mt-3">
                          <label for="gplx">Số điện thoại</label>
                          <input
                            type="text"
                            id="gplx"
                            value={
                              customersWithPhone
                                ? customersWithPhone.phoneNumber
                                : "Số điện thoại"
                            }
                            class="form-control"
                            readonly
                          />
                        </div>
                        <div class="form-group mt-3">
                          <label for="name">Email</label>
                          <input
                            type="text"
                            id="name"
                            value={
                              customersWithPhone
                                ? customersWithPhone.email
                                : "email"
                            }
                            class="form-control"
                            readonly
                          />
                        </div>
                        <div class="row mt-3">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label for="name">Giới tính</label>
                              <input
                                type="text"
                                id="name"
                                value={
                                  customersWithPhone
                                    ? customersWithPhone.gender
                                      ? "Nam"
                                      : "Nữ"
                                    : "gender"
                                }
                                class="form-control"
                                readonly
                              />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label for="dob">Ngày sinh</label>
                              <input
                                type="text"
                                id="dob"
                                value={
                                  customersWithPhone
                                    ? formatDate(customersWithPhone.birthDate)
                                    : "birthdate"
                                }
                                class="form-control"
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group mt-3">
                          <label for="gplx">Địa chỉ</label>
                          <input
                            type="text"
                            id="address"
                            value={
                              customersWithPhone
                                ? customersWithPhone.address.street +
                                  ", " +
                                  customersWithPhone.address.ward +
                                  ", " +
                                  customersWithPhone.address.district +
                                  ", " +
                                  customersWithPhone.address.province
                                : "gender"
                            }
                            class="form-control"
                            readonly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="container-custom">
                  <div class="header-custom">
                    <h2>Giấy phép lái xe</h2>
                  </div>
                  {/* <!-- <div class="alert-custom">
                                        Lưu ý: để tránh phát sinh vấn đề trong quá trình thuê xe, người đặt xe trên Mioto (đã xác
                                        thực GPLX) đồng thời phải là người nhận xe.
                                    </div> --> */}
                  <div class="row m-0 license-content">
                    <div class="col-md-4 left">
                      <img
                        class="img-fluid rounded mx-auto"
                        src={`../img/${
                          customersWithPhone
                            ? customersWithPhone.avatarImage
                            : "avt"
                        }`}
                        alt="Upload Icon"
                      />
                    </div>
                    <div class="col-md-8 ps-4 right">
                      <div class="form-group">
                        <label for="gplx">Số GPLX</label>
                        <input
                          type="text"
                          id="gplx"
                          value={
                            customersWithPhone
                              ? customersWithPhone.idCard
                              : "idCard"
                          }
                          class="form-control"
                          disabled
                        />
                      </div>
                      <div class="form-group">
                        <label for="name">Họ và tên</label>
                        <input
                          type="text"
                          id="name"
                          value={
                            customersWithPhone
                              ? customersWithPhone.fullName
                              : "Người Dùng"
                          }
                          class="form-control"
                          disabled
                        />
                      </div>
                      <div class="form-group">
                        <label for="dob">Ngày sinh</label>
                        <input
                          type="text"
                          id="dob"
                          value={
                            customersWithPhone
                              ? formatDate(customersWithPhone.birthDate)
                              : "gender"
                          }
                          class="form-control"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() =>
                    DeleteButtonClick(
                      customersWithPhone
                        ? customersWithPhone.phoneNumber
                        : "Số điện thoại"
                    )
                  }
                  disabled={!customersWithPhone || !customersWithPhone.status}
                >
                  Cập nhật trạng thái
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*end  */}
      </main>
    </>
  );
}

export default KhachHang;
