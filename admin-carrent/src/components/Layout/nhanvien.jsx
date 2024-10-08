import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import ToastComponent from "../../assets/toasty";

import "react-datepicker/dist/react-datepicker.css";

function NhanVien() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [sortedStaffs, setSortedStaffs] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [staff, setStaff] = useState(null);
  const [errors, setErrors] = useState({});

  const [images, setImages] = useState({
    avatarImg: null,
    frontSide: null,
    backSide: null,
  });

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState(null);
  const [idCard, setIdCard] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");

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

  const loadListStaff = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/staffs");
    console.log(result.data.data);

    setStaffs(result.data.data);
    setSortedStaffs(result.data.data);
  };

  const loadStaff = async (staffID) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/staffs/${staffID}`
      );
      setStaff(res.data.data);
      console.log(res.data.data);
      console.log(res.data.data.avatarImg);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadListStaff();
  }, []);

  const DeleteStaff = async (staffID) => {
    try {
      const result2 = await axios.delete(
        `http://localhost:8080/api/v1/staffs/${staffID}`
      );
      console.log(result2.data.message);
      // sNotify();
      var btnclose = document.getElementById("closebtn");
      btnclose.click();
      loadListStaff();
    } catch (error) {
      // errNotify();
    }
  };

  const sortAZ = () => {
    const sortedData = [...staffs].sort((a, b) =>
      a.fullName.localeCompare(b.fullName)
    );
    setSortedStaffs(sortedData);
  };

  const sortZA = () => {
    const sortedData = [...staffs].sort((a, b) =>
      b.fullName.localeCompare(a.fullName)
    );
    setSortedStaffs(sortedData);
  };
  const getFilteredStaffs = () => {
    return sortedStaffs.filter(
      (staff) =>
        (staff.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.phoneNumber.includes(searchTerm)) &&
        staff.fullName.toLowerCase().includes(nameFilter.toLowerCase()) &&
        staff.phoneNumber.includes(phoneFilter)
    );
  };

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

  // thêm nhân viên

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleRadioChange = (e) => {
    const selectedGender = e.target.id === "male" ? true : false;
    setGender(selectedGender);
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages({
      ...images,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(district);
      const formData = new FormData();
      for (const key in images) {
        formData.append(key, images[key]);
      }

      formData.append("fullname", fullname);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("birthday", birthday);
      formData.append("idCard", idCard);
      formData.append("issueDate", issueDate);
      formData.append("expiryDate", expiryDate);
      formData.append("gender", gender);
      formData.append("street", street);
      formData.append("ward", ward);
      formData.append("district", district);
      formData.append("province", province);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/staff/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        var btnclose = document.getElementById("closecreate");
        btnclose.click();
        loadListStaff();
        ToastComponent("success", "Đăng ký nhân viên thành công !");
        console.log(response.data);
      } catch (error) {
        console.error("There was an error submitting the form!", error);
        ToastComponent("error", "Đăng ký nhân viên thất bại!");
      }
    }
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
  const DeleteButtonClick = async (email) => {
    await DeleteStaff(email);
  };

  const validate = () => {
    let formErrors = {};

    //validate hinh đại diện
    if (!images.avatarImg) {
      formErrors.avatarImg = "Hình đại diện không được để trống.";
    }

    // vailidate fullname
    if (!fullname) {
      formErrors.fullname = "Tên nhân viên không được để trống.";
    } else if (fullname.length < 3) {
      formErrors.fullname = "Tên nhân viên phải có ít nhất 3 kí tự.";
    }

    // validate số điện thoại
    if (!phoneNumber) {
      formErrors.phoneNumber = "Số điện thoại không được để trống.";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      formErrors.phoneNumber = "Số điện thoại không hợp lệ.";
    }

    // validate email
    if (!email) {
      formErrors.email = "email không được để trống";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      formErrors.email = "email không hợp lệ";
    }

    // validate ngày sinh
    if (!birthday) {
      formErrors.birthday = "Ngày sinh không được để trống.";
    } else {
      // Kiểm tra nếu ngày sinh là ngày trong tương lai
      const today = new Date();
      const selectedDate = new Date(birthday);

      if (selectedDate > today) {
        formErrors.birthday = "Ngày sinh không thể là ngày trong tương lai.";
      }
    }

    // validate giới tính
    if (!gender) {
      formErrors.gender = "Giới tính không được để trống.";
    }

    // vadidate mặt trước
    if (!images.frontSide) {
      formErrors.frontSide = "Giới tính không được để trống.";
    }

    // vadidate mặt sau
    if (!images.backSide) {
      formErrors.backSide = "Giới tính không được để trống.";
    }

    // validate số CMND
    if (!idCard) {
      formErrors.idCard = "Số CMND không được để trống.";
    } else if (!/^[0-9]{12}$/.test(idCard)) {
      formErrors.idCard = "Số CMND phải có 12 chữ số.";
    }

    // validate ngày cấp
    if (!issueDate) {
      formErrors.issueDate = "Ngày cấp CMND không được để trống.";
    }

    // validate ngày hết hạn
    if (!expiryDate) {
      formErrors.expiryDate = "Ngày hết hạn CMND không được để trống.";
    }

    // validate địa chỉ
    if (!street) {
      formErrors.street = "Địa chỉ không được để trống.";
    } else if (street.length < 5) {
      formErrors.street = "Địa chỉ phải có ít nhất 5 kí tự.";
    }
    if (!ward) {
      formErrors.ward = "Phường/xã không được để trống.";
    } else if (ward.length < 5) {
      formErrors.ward = "Phường/xã phải có ít nhất 5 kí tự.";
    }
    if (!district) {
      formErrors.district = "Quận/huyện không được để trống.";
    } else if (district.length < 5) {
      formErrors.district = "Quận/huyện phải có ít nhất 5 kí tự.";
    }
    if (!province) {
      formErrors.province = "Tỉnh/thành phố không được để trống.";
    } else if (province.length < 5) {
      formErrors.province = "Tỉnh/thành phố phải có ít nhất 5 kí tự.";
    }

    setErrors(formErrors);

    // Return true if no errors
    return Object.keys(formErrors).length === 0;
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
          <a className="btn-download-green">
            <i className="bx bxs-cloud-download"></i>
            <button
              class="btn text-white "
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
              <form
                action=""
                id="search-box"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  id="search-text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Bạn cần tìm kiếm gì nhỉ?"
                />
                <button
                  id="search-btn"
                  onClick={() => setSearchTerm(searchTerm)}
                >
                  <i className="bx bx-search"></i>
                </button>
              </form>

              <div className="dropdown">
                <button className="dropbtn">
                  <i className="bx bx-filter"></i>
                </button>
                <div className="dropdown-content">
                  <a href="#" onClick={sortAZ}>
                    Từ A - Z
                  </a>
                  <a href="#" onClick={sortZA}>
                    Từ Z - A
                  </a>
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
                  {getFilteredStaffs().map((staff, index) => (
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
                          <span
                            style={{
                              color: "green",
                              fontSize: "16px",
                            }}
                          >
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
                  id="closebtn"
                ></button>
              </div>
              {staff ? (
                <div className="modal-body">
                  <div className="container-custom">
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="profile-info">
                          <img src={staff.avatarImage} alt="avt" />
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
                                staff.street &&
                                staff.ward &&
                                staff.district &&
                                staff.province
                                  ? `${staff.street}, ${staff.ward}, ${staff.district}, ${staff.province}`
                                  : "Chưa cập nhật địa chỉ"
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
                            value={staff.fullName}
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
                                value={staff.citizenCard.idCard}
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
                                value={staff.citizenCard.issueDate}
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
                            value={"Công An" + " " + staff.province}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 left">
                        <img
                          className="img-fluid rounded mx-auto"
                          src={staff.citizenCard.frontImage}
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
                            src="https://n1-cstg.mioto.vn/m/avatars/avatar-3.png"
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
                          src="https://n1-cstg.mioto.vn/m/avatars/avatar-3.png"
                          alt="Upload Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                {/* <button type="button" className="btn btn-success">
                  Cập nhật thông tin
                </button> */}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeleteButtonClick(staff.email)}
                  disabled={!staff || !staff.status}
                >
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
                  id="closecreate"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="container-custom">
                    <div className="row">
                      <div className="col-md-6">
                        <h5>Thông Tin Nhân Viên</h5>
                        <div className="form-group mt-3">
                          <label htmlFor="frontImage">Hình Đại Diện</label>
                          <input
                            type="file"
                            name="avatarImg"
                            className="form-control"
                            onChange={handleImageChange}
                          />
                          <div className="form-error {errors.avatarImg==null?'d-lg-none':'' }">
                            <span className="error-item1 text-danger">
                              <p>{errors.avatarImg}</p>
                            </span>
                          </div>
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="describe">Họ và tên</label>
                          <input
                            type="text"
                            id="fullname"
                            className="form-control"
                            value={fullname}
                            onChange={(e) => handleChange(e, setFullname)}
                          />
                          <div className="form-error {errors.fullname==null?'d-lg-none':'' }">
                            <span className="error-item1 text-danger">
                              <p>{errors.fullname}</p>
                            </span>
                          </div>
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="features">Số Điện Thoại</label>
                          <input
                            type="text"
                            id="phonenumber"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => handleChange(e, setPhoneNumber)}
                          />
                          <div className="form-error {errors.phoneNumber==null?'d-lg-none':'' }">
                            <span className="error-item1 text-danger">
                              <p>{errors.phoneNumber}</p>
                            </span>
                          </div>
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="features">Email</label>
                          <input
                            type="text"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => handleChange(e, setEmail)}
                          />
                          <div className="form-error {errors.email==null?'d-lg-none':'' }">
                            <span className="error-item1 text-danger">
                              <p>{errors.email}</p>
                            </span>
                          </div>
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="features">Ngày Sinh</label>
                          <input
                            type="date"
                            id="birthday"
                            className="form-control"
                            value={birthday}
                            onChange={(e) => handleChange(e, setBirthday)}
                          />
                          <div className="form-error {errors.birthday==null?'d-lg-none':'' }">
                            <span className="error-item1 text-danger">
                              <p>{errors.birthday}</p>
                            </span>
                          </div>
                        </div>
                        <label htmlFor="fuelType">Giới Tính</label>
                        <div className="form-group d-flex mt-3">
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              id="male"
                              name="gender"
                              onChange={handleRadioChange}
                            />
                            <label htmlFor="male">Nam</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              id="female"
                              name="gender"
                              onChange={handleRadioChange}
                            />
                            <label htmlFor="diesel">Nữ</label>
                          </div>
                        </div>
                        <div className="form-error {errors.gender==null?'d-lg-none':'' }">
                          <span className="error-item1 text-danger">
                            <p>{errors.gender}</p>
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 contact-info">
                        <div className="contact-detail">
                          <h5>Thông Tin căn cước </h5>
                          <div className="form-group mt-3">
                            <label htmlFor="frontImage">Hình Mặt Trước</label>
                            <input
                              type="file"
                              name="frontSide"
                              className="form-control"
                              onChange={handleImageChange}
                            />
                            <div className="form-error {errors.frontSide==null?'d-lg-none':'' }">
                              <span className="error-item1 text-danger">
                                <p>{errors.frontSide}</p>
                              </span>
                            </div>
                          </div>

                          <div className="form-group mt-3">
                            <label htmlFor="frontImage">Hình Mặt Sau</label>
                            <input
                              type="file"
                              name="backSide"
                              className="form-control"
                              onChange={handleImageChange}
                            />
                            <div className="form-error {errors.backSide==null?'d-lg-none':'' }">
                              <span className="error-item1 text-danger">
                                <p>{errors.backSide}</p>
                              </span>
                            </div>
                          </div>

                          <div className="form-group mt-3">
                            <label htmlFor="carName">Số thẻ</label>
                            <input
                              type="text"
                              id="idCard"
                              className="form-control"
                              value={idCard}
                              onChange={(e) => handleChange(e, setIdCard)}
                            />
                            <div className="form-error {errors.idCard==null?'d-lg-none':'' }">
                              <span className="error-item1 text-danger">
                                <p>{errors.idCard}</p>
                              </span>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="numberOfSeat">Ngày Cấp</label>
                                <input
                                  type="date"
                                  id="issueDate"
                                  className="form-control"
                                  value={issueDate}
                                  onChange={(e) =>
                                    handleChange(e, setIssueDate)
                                  }
                                />
                                <div className="form-error {errors.issueDate==null?'d-lg-none':'' }">
                                  <span className="error-item1 text-danger">
                                    <p>{errors.issueDate}</p>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="transmission">
                                  Ngày Hết Hạn
                                </label>
                                <input
                                  type="date"
                                  id="expiryDate"
                                  className="form-control"
                                  value={expiryDate}
                                  onChange={(e) =>
                                    handleChange(e, setExpiryDate)
                                  }
                                />
                                <div className="form-error {errors.expiryDate==null?'d-lg-none':'' }">
                                  <span className="error-item1 text-danger">
                                    <p>{errors.expiryDate}</p>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <h5 class="mt-5">Thông tin địa chỉ</h5>

                          <div class="row">
                            <div class="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="street">Tên Đường</label>
                                <input
                                  type="text"
                                  id="street"
                                  name="street"
                                  className="form-control"
                                  value={street}
                                  onChange={(e) => handleChange(e, setStreet)}
                                />
                                <div className="form-error {errors.street==null?'d-lg-none':'' }">
                                  <span className="error-item1 text-danger">
                                    <p>{errors.street}</p>
                                  </span>
                                </div>
                              </div>

                              <div className="form-group  mt-3">
                                <label htmlFor="ward">Tên Phường</label>
                                <input
                                  type="text"
                                  id="ward"
                                  name="ward"
                                  className="form-control"
                                  value={ward}
                                  onChange={(e) => handleChange(e, setWard)}
                                />
                                <div className="form-error {errors.ward==null?'d-lg-none':'' }">
                                  <span className="error-item1 text-danger">
                                    <p>{errors.ward}</p>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div class="col-sm-6 ">
                              <div className="form-group">
                                <label htmlFor="district">Tên Quận</label>
                                <input
                                  type="text"
                                  id="district"
                                  name="district"
                                  className="form-control"
                                  value={district}
                                  onChange={(e) => handleChange(e, setDistrict)}
                                />
                                <div className="form-error {errors.district==null?'d-lg-none':'' }">
                                  <span className="error-item1 text-danger">
                                    <p>{errors.district}</p>
                                  </span>
                                </div>
                              </div>

                              <div className="form-group  mt-3">
                                <label htmlFor="province">Tên Thành Phố</label>
                                <input
                                  type="text"
                                  id="province"
                                  name="province"
                                  className="form-control"
                                  value={province}
                                  onChange={(e) => handleChange(e, setProvince)}
                                />
                                <div className="form-error {errors.province==null?'d-lg-none':'' }">
                                  <span className="error-item1 text-danger">
                                    <p>{errors.province}</p>
                                  </span>
                                </div>
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
