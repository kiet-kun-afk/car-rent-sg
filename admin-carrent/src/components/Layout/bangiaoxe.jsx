import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosConfig from "../../config/axiosConfig";
import ToastComponent from "../../assets/toasty";
import "react-datepicker/dist/react-datepicker.css";

function GiaoXe() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [nowDate, setNowDate] = useState("");
  const chooseDate = (date) => {
    setSelectedDate(date);
  };

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

  // function getNgayThangNam(dateString) {
  // 	// Chuyển đổi chuỗi ngày tháng năm sang đối tượng Date
  // 	const date = new Date(dateString);

  // 	// Lấy ngày, tháng và năm
  // 	const ngay = date.getDate();
  // 	const thang = date.getMonth() + 1;
  // 	const nam = date.getFullYear();

  // 	// Cắt chuỗi ngày tháng năm
  // 	const ngayThangNam = `${ngay}/${thang}/${nam}`;

  // 	// Trả về chuỗi ngày tháng năm đã cắt
  // 	return ngayThangNam;
  // }

  function getCurrentDate() {
    // Lấy ngày hiện tại
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần +1
    const dd = String(today.getDate()).padStart(2, "0");
    // Định dạng ngày theo chuẩn yyyy-mm-dd
    const currentDate = `${yyyy}-${mm}-${dd}`;

    // Đặt giá trị mặc định cho input
    setNowDate(currentDate);
  }

  const [records, setRecords] = useState([]);
  const loadListRecords = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/records/list-delivery-record-not-return-yet"
      );
      console.log(result.data.data);

      setRecords(result.data.data);
    } catch (error) {
      navigate("/admin/login");
    }
  };

  const getRecord = (e) => {
    const recordId = e.currentTarget.getAttribute("data-id");
    console.log(recordId);
    if (recordId) {
      loadRecord(recordId);
    } else {
      alert("Please enter an id");
    }
  };

  const [record, setRecord] = useState(null);
  const loadRecord = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/records/get-delivery-record/${id}`
      );
      setRecord(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadListRecords();
    getCurrentDate();
  }, []);

  const [user, setUser] = useState(null);

  const loadStaff = (e) => {
    fetchUser();
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

  const [address, setAddress] = useState("");
  const [interior, setInterior] = useState("");
  const [exterior, setExterior] = useState("");
  const [fuelNumber, setFuelNumber] = useState(0);
  const [kilometerNumber, setKiloNumber] = useState(0);
  const [surcharges, setSurcharges] = useState(0);
  const [surcharges2, setSurcharges2] = useState(0);

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

  const handleSurcharges = (surcharges) => {
    setSurcharges(surcharges.target.value);
  };

  const handleSurcharges2 = (surcharges2) => {
    setSurcharges2(surcharges2.target.value);
  };

  const account = localStorage.getItem("token");

  const handleCreateReturn = async (id) => {
    const formData = new FormData();
    formData.append("address", address);
    formData.append("interior", interior);
    formData.append("exterior", exterior);
    formData.append("kilometerNumber", kilometerNumber);
    formData.append("fuelNumber", fuelNumber);
    formData.append("surcharges", surcharges);
    formData.append("surcharges2", surcharges2);

    if (account) {
      try {
        const res = await axiosConfig.post(
          `http://localhost:8080/api/v1/records/create-return-record/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        var btnClose = document.getElementById("closeReturn");
        btnClose.click();
        loadListRecords();
        ToastComponent("success", "Tạo biên bản trả xe thành công!");
      } catch (error) {
        console.error("Failed to create return record", error);
      }
    }
  };

  const formatDate = (localDatetime) => {
    // Tạo một đối tượng Date từ localDatetime
    const date = new Date(localDatetime);

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
            <h1>Biên Bản Bàn Giao Xe</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Biên Bản Bàn Giao Xe
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Danh sách biên bản bàn giao</h3>
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
                  {records.map((record, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td className="text-center">
                        {formatDate(record.createDate)}
                      </td>
                      <td className="text-center">
                        {record.staffName ? record.staffName : "Nhân viên"}
                      </td>
                      <td>{record.customerName}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-light"
                          data-id={record.id}
                          onClick={getRecord}
                          data-bs-toggle="modal"
                          data-bs-target="#bienbanBGX"
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
          id="bienbanBGX"
          tabIndex="-1"
          aria-labelledby="bienbanBGX"
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
                            value={record?.staffName || "Nhân viên"}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="gplx">Số điện thoại</label>
                          <input
                            type="text"
                            id="gplx"
                            className="form-control"
                            value={record?.staffPhoneNumber || "Số điện thoại"}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="name">Ngày giao </label>
                          <input
                            type="text"
                            className="form-control"
                            id="nowDate"
                            name="nowDate"
                            value={record ? formatDate(record.createDate) : ""}
                            onChange={(e) => setNowDate(e.target.value)}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="name">Địa điểm giao xe</label>
                          <input
                            type="text"
                            id="address"
                            className="form-control"
                            value={record?.address || "Địa chỉ"}
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
                            value={record?.customerName || "Họ tên người thuê"}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="gplx">Số điện thoại</label>
                          <input
                            type="text"
                            placeholder="Số điện thoại khách hàng"
                            id="gplx"
                            className="form-control"
                            value={
                              record?.customerPhoneNumber || "Số điện thoại"
                            }
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
                                value={record?.licenseNumber || "Chưa cập nhật"}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="issueCard">Ngày cấp</label>
                              <input
                                type="text"
                                id="issueCard"
                                className="form-control"
                                value={
                                  record?.licenseIssuedDate || "Chưa cập nhật"
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
                            value={record?.customerAddress || "Chưa cập nhật"}
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
                            value={record?.carName || "Tên xe"}
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
                            value={record?.registrationPlate || "Biển số"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-sm-6 ps-0 pe-3 ">
                        <div className="form-group">
                          <label htmlFor="gplx">Số xăng khi giao</label>
                          <input
                            placeholder="Số xăng"
                            type="text"
                            id="gplx"
                            className="form-control"
                            value={
                              record?.fuelNumber + " lít" || "Số lít nhiên liêu"
                            }
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 ps-3 pe-0">
                        <div className="form-group">
                          <label htmlFor="dob">Số KM khi giao</label>
                          <input
                            placeholder="Số KM"
                            type="text"
                            id="gplx"
                            className="form-control"
                            value={record?.kilometerNumber + " KM" || "Số KM"}
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
                            value={record?.exterior || "Tình trạng ngoại thất"}
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
                            value={record?.interior || "Tình trạng nội thất"}
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
                      <br />
                      <a href={record?.registrationDocument || "nothing"}>
                        Tải tài liệu
                      </a>
                    </div>

                    <div className="form-group mt-1">
                      <label htmlFor="dob">Giấy chứng nhận bảo hiểm</label>
                      <br />
                      <a href={record?.insuranceDocument || "nothing"}>
                        Tải tài liệu
                      </a>
                    </div>

                    <div className="form-group mt-1">
                      <label htmlFor="dob">Giấy đăng kiểm xe:</label>
                      <br />
                      <a href={record?.vehicleInspectionDocument || "nothing"}>
                        Tải tài liệu
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    loadStaff();
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#bienbantraxe"
                >
                  <i className="fa-solid fa-check"></i> Chuyển sang tạo biên bản
                  trả xe
                </button>
                {/* <button type="button" className="btn btn-danger">
                  Vô hiệu hóa tài khoản
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Modal tạo biên bản trả */}
        <div
          className="modal fade"
          id="bienbantraxe"
          tabIndex="-1"
          aria-labelledby="bienbantraxe"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Tạo biên bản bàn giao</h2>
                <button
                  id="closeReturn"
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
                        <h5>Bên cho thuê</h5>
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
                          <label htmlFor="name">Ngày trả</label>
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
                          <label htmlFor="name">Địa điểm trả xe</label>
                          <input
                            onChange={handleAddress}
                            type="text"
                            id="address"
                            className="form-control"
                            placeholder="Nhập địa điểm trả xe"
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
                            value={record?.customerName || ""}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="gplx">Số điện thoại</label>
                          <input
                            type="text"
                            placeholder="Số điện thoại khách hàng"
                            id="gplx"
                            className="form-control"
                            value={record?.customerPhoneNumber || ""}
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
                                value={record?.licenseNumber || ""}
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
                                value={record?.licenseIssuedDate || ""}
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
                            value={record?.customerAddress || ""}
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
                            value={record?.carName}
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
                            value={record?.registrationPlate}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-sm-6 ps-0 pe-3 ">
                        <div className="form-group">
                          <label htmlFor="gplx">Số xăng khi trả</label>
                          <input
                            type="text"
                            id="gplx"
                            className="form-control"
                            placeholder="Nhập số lít xăng khi trả"
                            onChange={handleInputFuel}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 ps-3 pe-0">
                        <div className="form-group">
                          <label htmlFor="dob">Số KM khi trả</label>
                          <input
                            placeholder="Nhập số KM khi trả"
                            type="text"
                            id="gplx"
                            className="form-control"
                            onChange={handleInputKilometer}
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
                            placeholder="Nhập trạng thái ngoại thất xe sau khi trả"
                            type="text"
                            id="gplx"
                            className="form-control"
                            onChange={handleInputExterior}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 ps-3 pe-0">
                        <div className="form-group">
                          <label htmlFor="dob">Nội thất</label>
                          <textarea
                            placeholder="Nhập trạng thái nội thất xe sau khi giao"
                            type="text"
                            id="gplx"
                            className="form-control"
                            onChange={handleInputInterior}
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
                      <br />
                      <a href={record?.registrationDocument || ""}>
                        Tải tài liệu
                      </a>
                    </div>

                    <div className="form-group mt-1">
                      <label htmlFor="dob">Giấy chứng nhận bảo hiểm</label>
                      <br />
                      <a href={record?.insuranceDocument || ""}>Tải tài liệu</a>
                    </div>

                    <div className="form-group mt-1">
                      <label htmlFor="dob">Giấy đăng kiểm xe:</label>
                      <br />
                      <a href={record?.vehicleInspectionDocument || ""}>
                        Tải tài liệu
                      </a>
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
                        value={formatVND(record?.contract.amount) + "VNĐ"}
                      />
                    </div>
                    <div className="row m-0 pt-1">
                      <div className="col-sm-6 ps-0 pe-3 ">
                        <div className="form-group">
                          <label htmlFor="gplx">Chi phí phát sinh 1</label>
                          <input
                            placeholder="Trầy xước, hư hại, xe ám mùi hôi..."
                            type="number"
                            id="gplx"
                            className="form-control"
                            onChange={handleSurcharges}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 ps-3 pe-0">
                        <div className="form-group">
                          <label htmlFor="dob">Chi phí phát sinh 2</label>
                          <input
                            placeholder="Quá hạn, thuê thêm ngày..."
                            type="number"
                            id="gplx"
                            className="form-control"
                            onChange={handleSurcharges2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                <button
                  onClick={() => handleCreateReturn(record.id)}
                  type="button"
                  className="btn btn-success"
                >
                  <i className="fa-solid fa-check"></i> Tạo biên bản trả xe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default GiaoXe;
