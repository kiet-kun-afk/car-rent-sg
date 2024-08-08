import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "../../config/axiosConfig";

import ToastComponent from "../../assets/toasty";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function formatVND(value) {
  // Check if value is a number
  if (typeof value !== "number") {
    return "";
  }

  // Convert value to a string with two decimal places
  const formattedValue = value.toFixed(2).toString();

  // Add thousands separators
  const parts = formattedValue.split(".");
  const formattedPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formattedPart}`;
}

function HopDong() {
  // const [modalShow, setModalShow] = React.useState(false);
  // const handleOpen = () => setModalShow(true);
  // const handleClose = () => setModalShow(false);
  const [Contracts, setContracts] = useState([]);

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

  //Định dạng ngày
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

  // Định dạng ẩn số điện thoại
  const maskPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length > 4) {
      return (
        phoneNumber.slice(0, -4).replace(/./g, "*") + phoneNumber.slice(-4)
      );
    }
    return phoneNumber; // return the original phone number if it's less than or equal to 4 digits
  };

  const LoadListContract = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/v1/contracts/all"
    );
    console.log(response.data.data);
    setContracts(response.data.data);
  };

  const [contract, setContractById] = useState("");
  const LoadContractById = async (ContractId) => {
    const result1 = await axios.get(
      `http://localhost:8080/api/v1/contracts/find-contract/${ContractId}`
    );
    console.log(result1.data.data);

    setContractById(result1.data.data);
    // console.log(ContractsWithPhone);
  };

  const DeleteContract = async (ContractId) => {
    try {
      const result2 = await axios.put(
        `http://localhost:8080/api/v1/contracts/confirm/${ContractId}`
      );
      var btnclose = document.getElementById("closebtn");
      btnclose.click();
      LoadListContract();
      ToastComponent("success", "Xác nhận thành công !");
      console.log(result2.data.message);
    } catch (error) {
      ToastComponent("err", "Xác nhận thất bại!");
    }
  };

  const handleButtonClick = async (ContractId) => {
    await LoadContractById(ContractId);
  };

  const DeleteButtonClick = async (ContractId) => {
    await DeleteContract(ContractId);
  };

  const [user, setUser] = useState(null);

  const handleListDelivery = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/v1/contracts/all-not-delivery-yet"
    );
    console.log(response.data.data);
    setContracts(response.data.data);
  };

  const fetchUser = async () => {
    try {
      const response = await axiosConfig.get(
        "http://localhost:8080/api/v1/staffs/current-staff"
      );
      setUser(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const [nowDate, setNowDate] = useState("");

  useEffect(() => {
    LoadListContract();
    const currentDate = new Date();
    setNowDate(formatDate(currentDate));
  }, []);

  const listDelivery = (e) => {
    handleListDelivery();
  };

  const loadStaff = (e) => {
    fetchUser();
  };

  const [address, setAddress] = useState("");
  const [interior, setInterior] = useState("");
  const [exterior, setExterior] = useState("");
  const [fuelNumber, setFuelNumber] = useState(0);
  const [kilometerNumber, setKiloNumber] = useState(0);
  const [fileRegistration, setFileRegistration] = useState(null);
  const [fileInsurance, setFileInsurance] = useState(null);
  const [fileCertificate, setFileCertificate] = useState(null);

  const handleAddress = (address) => {
    setAddress(address.target.value);
  };

  const handleInputExterior = (interior) => {
    setInterior(interior.target.value);
  };

  const handleInputInterior = (exterior) => {
    setExterior(exterior.target.value);
  };

  const handleInputKilometer = (kilometer) => {
    setKiloNumber(kilometer.target.value);
  };

  const handleInputFuel = (fuelNumber) => {
    setFuelNumber(fuelNumber.target.value);
  };

  const setDocumentRegistration = (e) => {
    const file = e.target.files[0];
    setFileRegistration(file);
  };
  const setDocumentInsurance = (e) => {
    const file = e.target.files[0];
    setFileInsurance(file);
  };
  const setDocumentCertificate = (e) => {
    const file = e.target.files[0];
    setFileCertificate(file);
  };

  const account = localStorage.getItem("token");

  const handleCreateDelivery = async (contractId) => {
    const formData = new FormData();
    formData.append("address", address);
    formData.append("interior", interior);
    formData.append("exterior", exterior);
    formData.append("kilometerNumber", kilometerNumber);
    formData.append("fuelNumber", fuelNumber);

    // Chỉ thêm tệp vào formData nếu nó tồn tại
    // if (fileRegistration) {
    // 	formData.append("registrationDocument", fileRegistration);
    // } else {
    // 	formData.append("registrationDocument", null);
    // }

    // if (fileInsurance) {
    // 	formData.append("insuranceDocument", fileInsurance);
    // } else {
    // 	formData.append("insuranceDocument", null);
    // }

    // if (fileCertificate) {
    // 	formData.append("certificateOfRegistration", fileCertificate);
    // } else {
    // 	formData.append("certificateOfRegistration", null);
    // }

    // Cách code khác
    formData.append("registrationDocument", fileRegistration ?? null);
    formData.append("insuranceDocument", fileInsurance ?? null);
    formData.append("certificateOfRegistration", fileCertificate ?? null);

    if (account) {
      try {
        const res = await axiosConfig.post(
          `http://localhost:8080/api/v1/records/create-delivery-record/${contractId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        var btnClose = document.getElementById("closeBGX");
        btnClose.click();
        LoadListContract();
        ToastComponent("success", "Tạo biên bản bàn giao thành công!");
      } catch (error) {
        console.error("Failed to create delivery record", error);
      }
    }
  };

  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Hợp Đồng</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Hợp đồng
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
              <h3>Hợp đồng thuê xe</h3>
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

            <div className="table-responsive rounded">
              <table className="table table-hover text-center m-0">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Thời Gian Tạo</th>
                    <th>Mã HĐ</th>
                    <th>Loại Thanh Toán</th>
                    <th>Khách Hàng</th>
                    <th>Số Điện Thoại</th>
                    <th>Xe Được Thuê</th>
                    <th>Biển Số Xe</th>
                    <th>Ngày Bắt Đầu</th>
                    <th>Ngày Kết Thúc</th>
                    <th>Chi Phí Thuê</th>
                    <th>Số Ngày Thuê</th>
                    <th>Tiền Cọc</th>
                    <th>Tổng Tiền</th>
                    <th className="th-status">Trạng Thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {Contracts.map((contract, index) => (
                    <tr key={contract.contractId}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {formatDate(contract.createDate)}
                      </td>
                      <td className="text-center">{contract.contractId}</td>
                      <td className="text-center">{contract.wayToPay}</td>
                      <td className="text-start">{contract.customerName}</td>
                      <td className="text-center">{contract.customerPhone}</td>
                      <td className="text-start">{contract.carName}</td>
                      <td className="text-center">
                        {contract.carRegistrationPlate}
                      </td>
                      <td className="text-center">
                        {formatDate(contract.startDate)}
                      </td>
                      <td className="text-center">
                        {formatDate(contract.endDate)}
                      </td>
                      <td className="text-end">
                        {formatVND(contract.rentCost)}
                      </td>
                      <td className="text-center">{contract.numberDay}</td>
                      <td className="text-end">
                        {formatVND(contract.deposit)}
                      </td>
                      <td className="text-end">
                        {formatVND(contract.totalRentCost)}
                      </td>
                      <td className="status completed">
                        <span>
                          {contract.statusPayment ? (
                            <span style={{ color: "green", fontSize: "16px" }}>
                              Thành Công
                            </span>
                          ) : contract.staffId == null ? (
                            <span style={{ color: "red" }}>Chưa xác nhận</span>
                          ) : (
                            <span style={{ color: "orange" }}>
                              Đang Chờ Thanh Toán
                            </span>
                          )}
                        </span>
                      </td>

                      <td>
                        {contract.statusPayment ? (
                          <button
                            disabled={true}
                            type="button"
                            class="btn btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#chitietHD"
                            variant="light"
                            onClick={() =>
                              handleButtonClick(contract.contractId)
                            }
                          >
                            <i class="fa-solid fa-eye"></i>
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#chitietHD"
                            variant="light"
                            onClick={() =>
                              handleButtonClick(contract.contractId)
                            }
                          >
                            <i class="fa-solid fa-eye"></i>
                          </button>
                        )}
                        {contract.canDelivery & !contract.statusPayment ? (
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {
                              loadStaff();
                              handleButtonClick(contract.contractId);
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#bienbanBGX"
                          >
                            <i className="fa-regular fa-address-card"></i>
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Model create delivery */}
        <div
          className="modal fade"
          id="bienbanBGX"
          tabIndex="-1"
          aria-labelledby="bienbanBGX"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Tạo biên bản bàn giao</h2>
                <button
                  id="closeBGX"
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container-custom">
                  <div className="row">
                    <div className="col-md-6 contact-info">
                      <div className="header-custom-1">
                        <h5>Bên Giao</h5>
                      </div>
                      <div className="contact-detail">
                        <div className="form-group mt-3">
                          <label htmlFor="name">Họ và tên</label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={user?.fullName || ""}
                            disabled
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="gplx">Số điện thoại</label>
                          <input
                            type="text"
                            id="gplx"
                            className="form-control"
                            value={user?.phoneNumber || ""}
                            disabled
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="name">Ngày giao</label>
                          <input
                            type="text"
                            className="form-control"
                            id="nowDate"
                            name="nowDate"
                            value={nowDate}
                            readOnly
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="name">Địa điểm giao xe</label>
                          <input
                            onChange={handleAddress}
                            type="text"
                            id="address"
                            className="form-control"
                            placeholder="Nhập địa điểm giao xe"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 contact-info">
                      <div className="header-custom-1">
                        <h5>Bên Nhận</h5>
                      </div>
                      <div className="contact-detail">
                        <div className="form-group mt-3">
                          <label htmlFor="name">Họ và tên</label>
                          <input
                            type="text"
                            placeholder="Họ và tên khách hàng"
                            id="name"
                            className="form-control"
                            value={contract.customerName}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="gplx">Số điện thoại</label>
                          <input
                            type="text"
                            placeholder="Số điện thoại khách hàng"
                            id="gplx"
                            className="form-control"
                            value={contract.customerPhone}
                          />
                        </div>
                        <div className="row mt-3">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="name">Số GPLX</label>
                              <input
                                type="text"
                                placeholder="Số GPLX"
                                id="gplx"
                                className="form-control"
                                value={contract.driverLicense?.idCard || ""}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="dob">Ngày cấp</label>
                              <input
                                type="text"
                                id="dob"
                                className="form-control"
                                value={
                                  contract.driverLicense?.licenseIssuedDate
                                }
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
                            value={
                              contract.addressResponse
                                ? contract.addressResponse.street +
                                  ", " +
                                  contract.addressResponse.ward +
                                  ", " +
                                  contract.addressResponse.district
                                : ""
                            }
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
                            value={contract.carName}
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
                            value={contract.carRegistrationPlate}
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
                            onChange={handleInputExterior}
                            placeholder="Nhập trạng thái ngoại thất xe trước khi giao"
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
                            onChange={handleInputInterior}
                            placeholder="Nhập trạng thái nội thất xe trước khi giao"
                            type="text"
                            id="gplx"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-sm-6 ps-0 pe-3 ">
                        <div className="form-group">
                          <label htmlFor="gplx">Số xăng khi giao</label>
                          <input
                            onChange={handleInputFuel}
                            placeholder="Nhập số lít xăng trước khi giao"
                            type="number"
                            id="gplx"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 ps-3 pe-0">
                        <div className="form-group">
                          <label htmlFor="dob">Số KM khi giao</label>
                          <input
                            onChange={handleInputKilometer}
                            placeholder="Nhập số KM trước khi giao"
                            type="number"
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
                        onChange={setDocumentRegistration}
                        type="file"
                        id="name"
                        className="form-control"
                        placeholder="Giấy Tờ Xe"
                      />
                    </div>

                    <div className="form-group mt-1">
                      <label htmlFor="dob">Giấy chứng nhận bảo hiểm</label>
                      <input
                        onChange={setDocumentInsurance}
                        type="file"
                        id="dob"
                        className="form-control"
                        placeholder="Bảo hiểm xe"
                      />
                    </div>

                    <div className="form-group mt-1">
                      <label htmlFor="dob">Giấy đăng kiểm xe</label>
                      <input
                        onChange={setDocumentCertificate}
                        type="file"
                        id="dob"
                        className="form-control"
                        placeholder="Giấy tờ đăng kiểm xe"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                <button
                  onClick={() => handleCreateDelivery(contract.contractId)}
                  type="button"
                  className="btn btn-success"
                >
                  <i className="fa-solid fa-check"></i> Tạo biên bản bàn giao
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Model new */}
        <div
          class="modal fade"
          id="chitietHD"
          tabindex="-1"
          aria-labelledby="chitietHDLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="chitietHDLabel">
                  Chi Tiết Hợp Đồng
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closebtn"
                ></button>
              </div>

              {/* body */}
              <div class="modal-body">
                <div class="container-custom">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="profile-details">
                        <div class="form-group">
                          <label for="mahopdong">Mã hợp đồng</label>
                          <input
                            type="text"
                            id="mahopdong"
                            value={
                              contract ? contract.contractId : "mã hợp đồng"
                            }
                            class="form-control"
                            readOnly
                          />
                        </div>

                        <div class="form-group mt-3">
                          <label for="name">Thời Gian Tạo</label>
                          <input
                            type="text"
                            value={formatDate(
                              contract ? contract.createDate : "ngày tạo"
                            )}
                            class="form-control"
                          />
                        </div>

                        <div class="form-group mt-3">
                          <label for="name">Tổng Tiền Hợp Đồng</label>
                          <input
                            type="text"
                            value={
                              contract ? contract.totalRentCost : "tổng tiền"
                            }
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="profile-details">
                        <div class="form-group">
                          <label for="name">Tên Khách Hàng</label>
                          <input
                            type="text"
                            value={
                              contract
                                ? contract.customerName
                                : "tên khách hàng"
                            }
                            class="form-control"
                          />
                        </div>

                        <div class="form-group mt-3">
                          <label for="name">Số Điện Thoại</label>
                          <input
                            type="text"
                            value={
                              contract
                                ? contract.customerPhone
                                : "số điện thoại"
                            }
                            class="form-control"
                          />
                        </div>

                        <div class="form-group mt-3">
                          <label for="name">Tiền Khách Cọc</label>
                          <input
                            type="text"
                            value={formatVND(
                              contract ? contract.deposit : "tiền cọc "
                            )}
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*  */}

                <div class="container-custom">
                  <div class="header-custom mt-3">
                    <h2>Thông Tin Xe Được Thuê</h2>
                  </div>

                  <div class="row">
                    <div class="col-md-4 left">
                      <img
                        class="img-fluid rounded mx-auto"
                        src={`${contract ? contract.imgCar : "avt"}`}
                        alt="Upload Icon"
                      />
                    </div>

                    <div class="col-md-8 ps4 right">
                      <div class="form-group">
                        <label for="name">Tên Xe</label>
                        <input
                          type="text"
                          value={contract ? contract.carName : " Tên xe "}
                          class="form-control"
                        />
                      </div>

                      <div class="form-group mt-3">
                        <label for="name">Biển Số</label>
                        <input
                          type="text"
                          value={
                            contract
                              ? contract.carRegistrationPlate
                              : " Biển số"
                          }
                          class="form-control"
                        />
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group mt-3">
                            <label for="name">Ngày Bắt Đầu Thuê</label>
                            <input
                              type="text"
                              value={formatDate(
                                contract ? contract.startDate : "Ngày bắt đầu"
                              )}
                              class="form-control"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group mt-3">
                            <label for="name">Ngày Kết Thúc Thuê</label>
                            <input
                              type="text"
                              value={formatDate(
                                contract ? contract.endDate : "Ngày kết thúc"
                              )}
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group mt-3">
                            <label for="name">Chi Phí Thuê</label>
                            <input
                              type="text"
                              value={formatVND(
                                contract ? contract.rentCost : "Chi phí thuê"
                              )}
                              class="form-control"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group mt-3">
                            <label for="name">Số Ngày Được Thuê</label>
                            <input
                              type="text"
                              value={
                                contract ? contract.numberDay : "số ngày thuê "
                              }
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end body */}

              <div class="modal-footer justify-content-between">
                <div class="row">
                  {contract.staffId == null ? (
                    <button
                      type="button"
                      class="btn btn-success text-end"
                      onClick={() =>
                        DeleteButtonClick(
                          contract ? contract.contractId : "mã hợp đồng"
                        )
                      }
                    >
                      Xác Nhận Hợp Đồng
                    </button>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HopDong;
