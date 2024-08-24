import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axiosConfig from "../../../config/axiosConfig";
import { ToastContainer } from "react-toastify";
import ToastComponent from "../../../assets/toasty";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import iconUser from "../../images/avatar-4.png";

function InforCustomer() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const language = queryParams.get('lng');
    if (language) {
      i18n.changeLanguage(language); // Thay đổi ngôn ngữ theo URL
    }
  }, [location, i18n]);
  const [customer, setCustomer] = useState(null);
  const [addresss, setAddresss] = useState(null);

  const [idGPLX, setidGPLX] = useState("");
  const [gplxFront, setGPLXFront] = useState("");
  const [gplxBack, setGPLXBack] = useState("");
  const [issueDate, setissueDate] = useState("");
  const [expiryDate, setexpiryDate] = useState("");
  const [category, setCategory] = useState("");

  const [error, setError] = useState('');


  const [profileGPLXFront, setProfileGPLXFront] = useState("");
  const [profileGPLXBack, setProfileGPLXBack] = useState("");


  const [driverlincense, setDriverlincense] = useState(null);

  const customerAccount = localStorage.getItem("token");
  //console.log(idGPLX)

  const onSoGPLXChange = (e) => {
    validateGPLX(e.target.value);
    setidGPLX(e.target.value);
  };

  const onPictureGPLXFrontChange = (e) => {
    setProfileGPLXFront(driverlincense ? driverlincense.frontImage : "");
    const file = e.target.files[0];
    setGPLXFront(file);
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileGPLXFront(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onPictureGPLXBackChange = (e) => {
    setProfileGPLXBack(driverlincense ? driverlincense.backImage : "");
    const file = e.target.files[0];
    setGPLXBack(file);
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileGPLXBack(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onissueChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split("T")[0]; // Chuyển đổi thành chuỗi định dạng YYYY-MM-DD
    setissueDate(formattedDate);
    console.log(date);
    console.log(formattedDate);
  };

  const onexpiryChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split("T")[0]; // Chuyển đổi thành chuỗi định dạng YYYY-MM-DD
    setexpiryDate(formattedDate);
    console.log(date);
    console.log(formattedDate);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  const errRef = useRef(null);
  const findCustomer = async () => {
    try {
      const response = await axiosConfig.get(
        "http://localhost:8080/api/v1/customers/current-customer"
      );
      setCustomer(response.data.data);
      console.log(customer);
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
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

  const findCustomerDriver = async () => {
    try {
      const response = await axiosConfig.get(
        `http://localhost:8080/api/v1/driver-licenses/your-driver-license`
      );
      setDriverlincense(response.data.data);
      console.log(driverlincense);
    } catch (error) {
      console.error("Error fetching customer address:", error);
    }
  };

  const validateGPLX = (value) => {
    // Định dạng số GPLX ô tô với 12 hoặc 9 chữ số
    const regex = /^(?:\d{12}|\d{9})$/;

    if (!regex.test(value)) {
      setError('Số GPLX không hợp lệ. Vui lòng nhập 9 hoặc 12 chữ số.');
    } else {
      setError(''); // Xóa lỗi nếu định dạng đúng
    }
  };

  const handleUpdateGPLX = async (e) => {
    e.preventDefault();
    if (!error && idGPLX) {
      const formData = new FormData();
      formData.append("idCard", idGPLX);
      formData.append("frontImage", gplxFront);
      formData.append("backImage", gplxBack);
      formData.append("issueDate", issueDate);
      formData.append("expiryDate", expiryDate);
      formData.append("category", category);
      if (customerAccount) {
        try {
          const response = await axiosConfig.post(
            `http://localhost:8080/api/v1/driver-licenses/assign-license`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          ToastComponent("success", t('inforCusValid.successfull'));
          setTimeout(() => {
            window.location.href = "/carrentsg/customer/infor";
          }, 4000);
        } catch (error) {
          ToastComponent("err", t('inforCusValid.failed'));
          console.log(error);
        }
      }
    }

  };

  useEffect(() => {
    if (customerAccount) {
      findCustomer();
      findCustomerAddress();
      findCustomerDriver();
      if (driverlincense) {
        setidGPLX(driverlincense.idCard);
      } else {
      }
      console.log(idGPLX);
    }
  }, []);

  var editBTN = document.getElementById("editGPLX");
  var confirmBTN = document.getElementById("confirmGPLX");
  var soGPLX = document.getElementById("soGPLX");

  const handleEdit = () => {
    confirmBTN.classList.remove("editbtnDiss");
    editBTN.classList.remove("editbtnActive");
    editBTN.classList.add("editbtnDiss");

    soGPLX.removeAttribute("readOnly");
    //tenGPLX.removeAttribute("readOnly");
  };

  const handleCancel = () => {
    confirmBTN.classList.add("editbtnDiss");
    editBTN.classList.remove("editbtnDiss");
    editBTN.classList.add("editbtnActive");

    soGPLX.setAttribute("readOnly", true);
    //soGPLX.value = "";
    //tenGPLX.setAttribute("readOnly", true);
    //tenGPLX.value = "";
  };

  const formatDate = (localdatetime) => {
    // Tạo một đối tượng Date từ localdatetime
    const date = new Date(localdatetime);

    // Lấy ra ngày, tháng và năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Định dạng lại thành dd/MM/yyyy
    const formattedDate = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month
      }/${year}`;

    return formattedDate;
  };
  return (
    <>
      {customer ? (
        <>
          <div className="content-item user-profile">
            <div className="title">
              <div className="title-edit ps-4">
                <h5>{t("account_info")}</h5>
                <div className="wrap-svg">
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#updateCustomer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z"
                        stroke="black"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M10.2344 4.08789L11.9144 5.76788"
                        stroke="black"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="avatar-box">
                <div
                  className="avatar avatar--xl circle-img has-edit"
                  data-bs-toggle="modal"
                  data-bs-target="#updateImg"
                >
                  <img
                    loading="lazy"
                    src={
                      customer.avatarImage == null
                        ? iconUser
                        : customer.avatarImage
                    }
                    alt={customer.fullName}
                  />
                </div>
                <h6>{customer.fullName}</h6>
                <p className="note">
                  {t("join_date")}: {formatDate(customer.createdAt)}
                </p>
              </div>
              <div className="info-user">
                <div className="info-box">
                  <div className="info-box__item">
                    <p>{t("birth_date")} </p>
                    <p className="main">
                      {customer.birthDate
                        ? formatDate(customer.birthDate)
                        : "--/--/----"}
                    </p>
                  </div>
                  <div className="info-box__item">
                    <p>{t('gender')}</p>
                    <p className="main">{customer.gender ? t('male') : t('female')}</p>
                  </div>
                </div>
                <div className="info-desc">
                  <div className="info-desc__item">
                    <div className="title-item">{t('phone_number')}</div>
                    <div className="name">
                      {customer.phoneNumber}
                      <div className="wrap-svg">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#updatePhone"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z"
                              stroke="black"
                              strokeLinecap="round"
                            ></path>
                            <path
                              d="M10.2344 4.08789L11.9144 5.76788"
                              stroke="black"
                              strokeLinecap="round"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="info-desc__item">
                    <div className="title-item">{t('email')}</div>
                    <div className="name">
                      {customer.email}
                      <div className="wrap-svg">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#updateEmail"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z"
                              stroke="black"
                              strokeLinecap="round"
                            ></path>
                            <path
                              d="M10.2344 4.08789L11.9144 5.76788"
                              stroke="black"
                              strokeLinecap="round"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="info-desc__item">
                    <div className="title-item">{t('address')}</div>
                    <div className="name">
                      {addresss
                        ? addresss.street +
                        ", " +
                        addresss.ward +
                        ", " +
                        addresss.district
                        : t('nonUpdate')}
                      <div className="wrap-svg">
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#updateAddress"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z"
                              stroke="black"
                              strokeLinecap="round"
                            ></path>
                            <path
                              d="M10.2344 4.08789L11.9144 5.76788"
                              stroke="black"
                              strokeLinecap="round"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-note"></div>
          </div>
          <div className="content-item driver-license">
            <div className="title">
              <div className="title-item">
                <h6>{t('driver_license')}</h6>
              </div>
              <div className="d-flex flex-row editbtnDiss" id="confirmGPLX">
                <div className="p-2">
                  <a className="btn btn-outline-dark" onClick={handleCancel}>
                    {t('cancel')}
                  </a>
                </div>
                <div className="p-2">
                  <a className="btn btn-success" onClick={handleUpdateGPLX}>
                    {t('confirm')}
                  </a>
                </div>
              </div>
              <a
                className="btn btn-outline-secondary editbtnActive"
                id="editGPLX"
                onClick={handleEdit}
              >
                {t('edit')} <i className="fa-regular fa-pen-to-square"></i>
              </a>
            </div>
            <div className="row m-0">
              {/* Hình ảnh GPLX */}
              <div className="col-sm-6 col-md-6 col-lg-6 ps-0">
                <div className="content">
                  {/* GPLX Trước */}
                  <div className="info-license position-relative mt-5">
                    <label className="info-license__img border border-secondary-subtle ">
                      <div className="fix-img">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onPictureGPLXFrontChange}
                        />
                        <img
                          loading="lazy"
                          className="img-license"
                          src={
                            profileGPLXFront
                              ? profileGPLXFront
                              : "data:image/png;base64,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"
                          }
                        />
                      </div>
                    </label>
                    <div className="info-license__title text-center">
                      <p>{t('font')}</p>
                    </div>
                  </div>
                  {/* GPLX Sau */}
                  <div className="info-license position-relative mt-5">
                    <label className="info-license__img border border-secondary-subtle ">
                      <div className="fix-img">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onPictureGPLXBackChange}
                        />
                        <img
                          loading="lazy"
                          className="img-license"
                          src={
                            profileGPLXBack
                              ? profileGPLXBack
                              : "data:image/png;base64,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"
                          }
                        />
                      </div>
                    </label>
                    <div className="info-license__title text-center">
                      <p>{t('back')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin GPLX */}
              <div className="col-sm-6 col-md-6 col-lg-6 pe-0">
                <div className="content">
                  <div className="info-license-100">
                    <div className="custom-input">
                      <div className="wrap-info">
                        <div className="title-status">
                          <p>{t('license_number')}</p>
                        </div>
                        <div className="desc text-success"></div>
                      </div>
                      <div className="">
                        <div className="wrap-text">
                          <input
                            id="soGPLX"
                            value={
                              driverlincense ? driverlincense.idCard : idGPLX
                            }
                            onChange={onSoGPLXChange}
                            className="form-control"
                            type="text"
                            name="licenseNumber"
                            placeholder={t('license_number_placeholder')}
                            readOnly="true"
                            required
                          />
                        </div>
                      </div>
                      {error && <div className="text-danger mt-2">{error}</div>}
                    </div>

                    {/* Tên - Hạng GPLX */}
                    <div className="row m-0">
                      <div className="col-sm-6 col-md-6 col-lg-6 ps-0">
                        <div className="custom-input">
                          <div className="wrap-info">
                            <div className="title-status">
                              <p>{t('full_name')}</p>
                            </div>
                            <div className="desc text-success"></div>
                          </div>
                          <div className="">
                            <div className="wrap-text">
                              <input
                                id="tenGPLX"
                                defaultValue={customer.fullName}
                                className="form-control"
                                type="text"
                                name="licenseName"
                                placeholder={t('fullname_placeholder')}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-6 pe-0">
                        <div className="custom-input">
                          <div className="wrap-info">
                            <div className="title-status">
                              <p>{t('licenseRank')}</p>
                            </div>
                            <div className="desc text-success"></div>
                          </div>
                          <div className="">
                            <div className="wrap-text">
                              <select id="licenseType" className="form-select">
                                <option value="">{t('selectionRank')}</option>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ngày cấp - Ngày hết hạn */}
                    <div className="row m-0">
                      <div className="col-sm-6 col-md-6 col-lg-6 ps-0">
                        <div className="custom-input">
                          <div className="wrap-info">
                            <div className="title-status">
                              <p>{t('dateOfIssue')}</p>
                            </div>
                            <div className="desc text-success"></div>
                          </div>
                          <div className="">
                            <div className="wrap-text">
                              <input
                                className="form-control"
                                type="date"
                                value={driverlincense ? driverlincense.issueDate : issueDate || "2024-01-01"}
                                onChange={onissueChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-6 pe-0">
                        <div className="custom-input">
                          <div className="wrap-info">
                            <div className="title-status">
                              <p>{t('expirationDate')}</p>
                            </div>
                            <div className="desc text-success"></div>
                          </div>
                          <div className="">
                            <div className="wrap-text">
                              <input
                                className="form-control"
                                type="date"
                                value={driverlincense ? driverlincense.expiryDate : expiryDate || "2024-01-01"}
                                onChange={onexpiryChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default InforCustomer;
