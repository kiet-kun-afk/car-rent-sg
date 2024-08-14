import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "../../../src/config/axiosConfig";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KhachHang() {
  const [customers, setCustomers] = useState([]);
  const [customersWithPhone, setcustomersWithPhone] = useState(null);
  const [addresss, setAddresss] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

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

  const loadListCustomer = async () => {
    const result1 = await axios.get(
      "http://localhost:8080/api/v1/customers/all"
    );
    console.log(result1.data);

    setCustomers(result1.data.data);
  };

  const loadListCustomerPhonenumber = async (phoneNumber) => {
    const result1 = await axios.get(
      `http://localhost:8080/api/v1/customers/${phoneNumber}`
    );
    // console.log(result1.data.data);

    setcustomersWithPhone(result1.data.data);
    console.log(customersWithPhone);
  };

  const findCustomerAddress = async () => {
    try {
      const response = await axiosConfig.get(
        "http://localhost:8080/api/v1/address/get-customer-address"
      );
      setAddresss(response.data.data);
    } catch (error) {
      console.error("Error fetching customer address:", error);
    }
  };

  const DeleteCustomer = async (phoneNumber) => {
    try {
      const result1 = await axios.delete(
        `http://localhost:8080/api/v1/customers/delete/${phoneNumber}`
      );
      console.log(result1.data.message);

      var btnclose = document.getElementById("closebtn");
      btnclose.click();
      loadListCustomer();
    } catch (error) {}
  };

  const handleButtonClick = async (phoneNumber) => {
    await loadListCustomerPhonenumber(phoneNumber);
  };

  const DeleteButtonClick = async (phoneNumber) => {
    await DeleteCustomer(phoneNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCustomer = customers.filter((customer) => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    return (
      (customer.fullName &&
        customer.fullName.toLowerCase().includes(normalizedSearchQuery)) ||
      (customer.phoneNumber &&
        customer.phoneNumber.toLowerCase().includes(normalizedSearchQuery))
    );
  });

  useEffect(() => {
    loadListCustomer();
  }, []);

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

              <form
                action=""
                id="search-box"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  id="search-text"
                  value={searchQuery}
                  onChange={handleSearchChange}
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
                  {filteredCustomer.map((customer, index) => (
                    <tr key={customer.customer_id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-start">
                        {customer.fullName ? customer.fullName : "Họ và tên"}
                      </td>
                      <td>{formatDate(customer.birthDate)}</td>
                      <td className="text-center">
                        {customer.gender ? "Nam" : "Nữ"}
                      </td>
                      <td className="text-center">{customer.phoneNumber}</td>
                      <td className="text-start">{customer.email}</td>
                      <td className="text-start">{customer.street}</td>
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
                          className="btn btn-light"
                          data-bs-toggle="modal"
                          data-bs-target="#chitietKH"
                          onClick={() =>
                            handleButtonClick(customer.phoneNumber)
                          }
                        >
                          <i className="fa-solid fa-eye"></i>
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
          className="modal fade"
          id="chitietKH"
          tabindex="-1"
          aria-labelledby="chitietKHLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title " id="chitietKHLabel">
                  Chi tiết khách hàng
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  id="closebtn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container-custom">
                  <div className="row">
                    <div className="col-md-6 ">
                      <div className="profile-info">
                        <img
                          src={`${
                            customersWithPhone
                              ? customersWithPhone.avatarImage
                              : "avt"
                          }`}
                          alt="Profile Picture"
                        />
                      </div>
                      <div className="profile-details">
                        <h3>
                          {customersWithPhone
                            ? customersWithPhone.fullName
                            : "Người Dùng"}
                        </h3>
                        <div className="row m-0">
                          <div className="col-sm-9">
                            <p>
                              {" "}
                              Tham Gia:{" "}
                              {customersWithPhone
                                ? formatDate(customersWithPhone.updatedAt)
                                : "Ngày Tham Gia"}
                            </p>
                          </div>
                          <div className="col-sm-3 p-0 d-flex align-items-center justify-content-center">
                            <span>
                              {customersWithPhone ? (
                                customersWithPhone.status ? (
                                  <span className="badge text-bg-success">
                                    Hoạt Động{" "}
                                  </span>
                                ) : (
                                  <span className="badge text-bg-danger">
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
                    <div className="col-md-6 contact-info">
                      <div className="contact-detail">
                        <div className="form-group mt-3">
                          <label for="gplx">Số điện thoại</label>
                          <input
                            type="text"
                            id="gplx"
                            value={
                              customersWithPhone
                                ? customersWithPhone.phoneNumber
                                : "Số điện thoại"
                            }
                            className="form-control"
                            readonly
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label for="name">Email</label>
                          <input
                            type="text"
                            id="name"
                            value={
                              customersWithPhone
                                ? customersWithPhone.email
                                : "email"
                            }
                            className="form-control"
                            readonly
                          />
                        </div>
                        <div className="row mt-3">
                          <div className="col-sm-6">
                            <div className="form-group">
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
                                className="form-control"
                                readonly
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label for="dob">Ngày sinh</label>
                              <input
                                type="text"
                                id="dob"
                                value={
                                  customersWithPhone
                                    ? formatDate(customersWithPhone.birthDate)
                                    : "birthdate"
                                }
                                className="form-control"
                                readonly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <label for="gplx">Địa chỉ</label>
                          <input
                            type="text"
                            id="address"
                            value={
                              customersWithPhone
                                ? customersWithPhone.street +
                                  ", " +
                                  customersWithPhone.ward +
                                  ", " +
                                  customersWithPhone.district +
                                  ", " +
                                  customersWithPhone.province
                                : "gender"
                            }
                            className="form-control"
                            readonly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container-custom">
                  <div className="header-custom">
                    <h3>Giấy phép lái xe</h3>
                  </div>
                  {/* <!-- <div className="alert-custom">
                                        Lưu ý: để tránh phát sinh vấn đề trong quá trình thuê xe, người đặt xe trên Mioto (đã xác
                                        thực GPLX) đồng thời phải là người nhận xe.
                                    </div> --> */}
                  <div className="row m-0 license-content">
                    <div className="col-md-4 left">
                      <img
                        className="img-fluid rounded mx-auto"
                        src={`${
                          customersWithPhone
                            ? customersWithPhone.avatarImage
                            : "avt"
                        }`}
                        alt="Upload Icon"
                      />
                    </div>
                    <div className="col-md-8 ps-4 right">
                      <div className="form-group">
                        <label for="gplx">Số GPLX</label>
                        <input
                          type="text"
                          id="gplx"
                          value={
                            customersWithPhone
                              ? customersWithPhone.idCard
                              : "idCard"
                          }
                          className="form-control"
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label for="name">Họ và tên</label>
                        <input
                          type="text"
                          id="name"
                          value={
                            customersWithPhone
                              ? customersWithPhone.fullName
                              : "Người Dùng"
                          }
                          className="form-control"
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label for="dob">Ngày sinh</label>
                        <input
                          type="text"
                          id="dob"
                          value={
                            customersWithPhone
                              ? formatDate(customersWithPhone.birthDate)
                              : "gender"
                          }
                          className="form-control"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                <button
                  type="button"
                  className="btn btn-success"
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
