import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';


import axiosConfig from "../../config/axiosConfig";
import { ToastContainer } from "react-toastify";
import ToastComponent from "../../assets/toasty";
import { AddressAPI } from "../../assets/addressAPI";

import Header from "./common/header";
import Footer from "./common/footer";

import "../../style/styleDetailCustomer.css";

function DetailCustomer() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const language = queryParams.get('lng');
    if (language) {
      i18n.changeLanguage(language); // Thay đổi ngôn ngữ theo URL
    }
  }, [location, i18n]);

  const navigate = useNavigate();
  const errRef = useRef(null);
  const [customer, setCustomer] = useState(null);
  const customerAccount = localStorage.getItem("token");

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const onFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const onDobChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split("T")[0]; // Chuyển đổi thành chuỗi định dạng YYYY-MM-DD
    setDob(formattedDate);
    console.log(date);
    console.log(formattedDate);
  };

  const onGenderChange = (e) => {
    setGender(e.target.value === "true"); // Convert string to boolean
  };

  const onPhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    validatePhone(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value)
  };

  const onPictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kiểm tra kích thước ảnh
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Kiểm tra nếu ảnh lớn hơn 300x350px
      const maxWidth = 300;
      const maxHeight = 350;

      if (width > maxWidth || height > maxHeight) {
        // Tính toán kích thước mới giữ nguyên tỷ lệ
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        // Tạo canvas để resize ảnh
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Chuyển canvas thành base64
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });
          setAvatar(resizedFile);

          // Đọc ảnh đã resize và cập nhật state
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfilePicture(reader.result);
          };
          reader.readAsDataURL(resizedFile);
        }, file.type);
      } else {
        // Nếu ảnh đã có kích thước nhỏ hơn hoặc bằng 300x350px, không cần resize
        setAvatar(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePicture(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  };


  const updateInfor = async (e) => {
    e.preventDefault();
    console.log(fullName, gender, dob);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("gender", gender);
      formData.append("birthDate", dob);

      if (customerAccount) {
        const res = await axiosConfig.put(
          "http://localhost:8080/api/v1/customers/update-information",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      ToastComponent("success", t('customersDetailsValid.inforSuccess'));
      setTimeout(() => {
        window.location.href = "/carrentsg/customer/infor";
      }, 4000);
    } catch (error) {
      ToastComponent("err", t('customersDetailsValid.inforFailure'));
      console.log(error);
    }
  };

  const [errorPhone, setErrorPhone] = useState('');
  const validatePhone = (value) => {
    // Định dạng số GPLX ô tô với 12 hoặc 9 chữ số
    const regex = /^(0\d{9})$/;

    if (!regex.test(value)) {
      setErrorPhone(t('customersDetailsValid.validPhone1'));
    } else if (!value) {
      setErrorPhone(t('customersDetailsValid.validPhone2'));
    } else {
      setErrorPhone(''); // Xóa lỗi nếu định dạng đúng
    }
  };

  const updatePhone = async (e) => {
    e.preventDefault();
    if (!errorPhone && phoneNumber) {
      try {
        if (customerAccount) {
          const res = await axiosConfig.put(
            `http://localhost:8080/api/v1/customers/update-phone-number`,
            null,
            {
              params: {
                phoneNumber: phoneNumber,
              },
            }
          );
        }

        ToastComponent(
          "success",
          t('customersDetailsValid.phoneSuccess')
        );
        setTimeout(() => {
          handleLogout();
        }, 4000);
      } catch (error) {
        console.log(error);
      }
    }

  };

  const [errorEmail, setErrorEmail] = useState('');
  const validateEmail = (value) => {
    // Định dạng số GPLX ô tô với 12 hoặc 9 chữ số
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!regex.test(value)) {
      setErrorEmail(t('customersDetailsValid.validEmail1'));
    } else if (!value) {
      setErrorEmail(t('customersDetailsValid.validEmail2'));
    } else {
      setErrorEmail(''); // Xóa lỗi nếu định dạng đúng
    }
  };

  const updateEmail = async (e) => {
    e.preventDefault();
    if (!errorEmail && email) {
      try {
        if (customerAccount) {
          const res = await axiosConfig.put(
            `http://localhost:8080/api/v1/customers/update-email`,
            null,
            {
              params: {
                email: email,
              },
            }
          );
        }

        ToastComponent(
          "success",
          t('customersDetailsValid.emailSuccess')
        );
        setTimeout(() => {
          handleLogout();
        }, 4000);
      } catch (error) {
        //ToastComponent("err", "Vui lòng kiểm tra lại email !");
        console.log(error);
      }
    }

  };

  const updateImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      if (customerAccount) {
        const res = await axiosConfig.put(
          `http://localhost:8080/api/v1/customers/update-avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      ToastComponent("success", t('customersDetailsValid.avaSuccess'));
      setTimeout(() => {
        window.location.href = "/carrentsg/customer/infor";
      }, 4000);
    } catch (error) {
      ToastComponent("err", t('customersDetailsValid.avaFailure'));
      console.log(error);
    }
  };

  var allSideMenu = document.querySelectorAll(".sidebar .sidebar-item p");
  allSideMenu.forEach((item) => {
    var a = item.parentElement;

    item.addEventListener("click", function () {
      allSideMenu.forEach((i) => {
        i.parentElement.classList.remove("active");
        //console.log(i);
      });
      a.classList.add("active");
    });
  });

  const findCustomer = async () => {
    try {
      const response = await axiosConfig.get(
        "http://localhost:8080/api/v1/customers/current-customer"
      );
      setCustomer(response.data.data);
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  };

  const handleLogout = () => {
    window.location.href = "/carrentsg";
    localStorage.removeItem("token");
    setCustomer(null);
    //ToastComponent('info', 'Hẹn gặp lại bạn !');
  };

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");
  const [rememberName, setRememberName] = useState("");
  const [customerAddress, setCustomerAddress] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    if (customerAccount) {
      findCustomer();
    }
  }, []);

  const handleProvinceChange = (event) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    setSelectedDistrict("");
    setSelectedWard("");
    setWards([]);

    const selectedProvince = cities.find(
      (province) => province.Name === provinceId
    );
    setDistricts(selectedProvince ? selectedProvince.Districts : []);
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard("");

    const selectedDistrict = districts.find(
      (district) => district.Name === districtId
    );
    setWards(selectedDistrict ? selectedDistrict.Wards : []);
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  const handleStreet = (value) => {
    setStreet(value);
  };

  const handleRememberName = (value) => {
    setRememberName(value);
  };

  const handleChangeAddress = async (event) => {
    event.preventDefault();
    const addressData = {
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
      street: street,
      rememberName: rememberName,
    };
    try {
      await axiosConfig.put(
        `http://localhost:8080/api/v1/address/update-customer-address`,
        addressData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      ToastComponent("success", t('customersDetailsValid.addressSuccess'));
      setTimeout(() => {
        window.location.href = "/carrentsg/customer/infor";
      }, 4000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        setErrorMessage(error.response.data.data);
      } else {
        setErrorMessage(t('customersDetailsValid.addressFailure1'));
      }
      ToastComponent("err", t('customersDetailsValid.addressFailure1'));
      console.error("Không thể cập nhật địa chỉ", error);
    }
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
      <Header />
      <section className="body">
        <div className="account-section sec space">
          <div className="m-container">
            <div className="account-container">
              <div className="sidebar-account">
                <div>
                  <div style={{ paddingBottom: "0px" }}></div>
                  <div
                    className="sidebar-account-sticky"
                    style={{ transform: "translateZ(0px)" }}
                  >
                    <div className="title">
                      <h1>{t("greeting")}</h1>
                    </div>
                    <div className="sidebar">
                      <Link to="/carrentsg/customer/infor">
                        <div
                          className="sidebar-item active"
                          aria-current="page"
                        >
                          <div className="wrap-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.76 10.86C13.3782 10.86 14.69 9.54819 14.69 7.93C14.69 6.31181 13.3782 5 11.76 5C10.1418 5 8.83 6.31181 8.83 7.93C8.83 9.54819 10.1418 10.86 11.76 10.86Z"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M5.84 19.0001V17.3301C5.84 15.3801 7.42 13.8101 9.36 13.8101H14.63C16.58 13.8101 18.15 15.3901 18.15 17.3301V19.0001"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                            </svg>
                          </div>
                          <p>{t("my_account")}</p>
                        </div>
                      </Link>
                      <Link to="/carrentsg/customer/trip">
                        <div className="sidebar-item">
                          <div className="wrap-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.14 21.2H6.85999C5.71999 21.2 4.79999 20.28 4.79999 19.14V4.74994C4.79999 3.60994 5.71999 2.68994 6.85999 2.68994H17.14C18.28 2.68994 19.2 3.60994 19.2 4.74994V19.14C19.19 20.28 18.27 21.2 17.14 21.2Z"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M7.89001 6.85999H8.92001"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M12 6.85999H16.11"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M7.89001 12H8.92001"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M12 12H16.11"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M7.89001 17.14H8.92001"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M12 17.14H16.11"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                            </svg>
                          </div>
                          <p>{t("my_rental_application")}</p>
                        </div>
                      </Link>
                      <Link to="/carrentsg/customer/changepass">
                        <div className="sidebar-item">
                          <div className="wrap-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                            </svg>
                          </div>
                          <p>{t("change_password")}</p>
                        </div>
                      </Link>
                      <Link
                        data-bs-toggle="modal"
                        data-bs-target="#customerLogout"
                      >
                        <div className="sidebar-item">
                          <div className="wrap-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2.74907H18.12C18.9125 2.71374 19.6868 2.99377 20.2734 3.52788C20.86 4.06199 21.2111 4.8067 21.25 5.59907V18.3991C21.2111 19.1914 20.86 19.9362 20.2734 20.4703C19.6868 21.0044 18.9125 21.2844 18.12 21.2491H12"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M14.9993 12H2.7793"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M2.75 12L6.75 16"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M2.75 12L6.75 8"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                            </svg>
                          </div>
                          <p>{t("sign_out")}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {customer ? (
                <div className="content-account">
                  <Outlet />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
      <Footer />

      {/* Modal Infor-Customer */}
      <div
        className="modal fade"
        id="updateCustomer"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="d-flex flex-row-reverse p-2">
                <button
                  type="button"
                  className="btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa-regular fa-circle-xmark fa-xl"></i>
                </button>
              </div>
              <div className="form-item">
                <div className="input-box">
                  <h4 className="text-center mb-3">{t("update_info")}</h4>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">{t('full_name')}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={fullName || ""}
                        onChange={onFullNameChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">{t('birth_date')}</label>
                      <input
                        type="date"
                        className="form-control"
                        value={dob || "2000-01-01"}
                        onChange={onDobChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">{t('gender')}</label>
                      <select
                        className="form-select"
                        value={gender}
                        onChange={onGenderChange}
                      >
                        <option value={true}>{t('male')}</option>
                        <option value={false}>{t('female')}</option>
                      </select>
                    </div>
                    <div className="input-field mt-3">
                      <button
                        type="submit"
                        className="btn-submit"
                        onClick={updateInfor}
                      >
                        {t('update')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Phone-Customer */}
      <div
        className="modal fade"
        id="updatePhone"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="d-flex flex-row-reverse p-2">
                <button
                  type="button"
                  className="btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa-regular fa-circle-xmark fa-xl"></i>
                </button>
              </div>
              <div className="form-item">
                <div className="input-box">
                  <h4 className="text-center mb-3">{t("update_phone")}</h4>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">{t("phone_number")}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phoneNumber}
                        onChange={onPhoneChange}
                      />
                    </div>
                    {errorPhone && <div className="text-danger mt-2">{errorPhone}</div>}
                    <div className="input-field mt-3">
                      <button
                        type="submit"
                        className="btn-submit"
                        onClick={updatePhone}
                      >
                        {t('update')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Email-Customer */}
      <div
        className="modal fade"
        id="updateEmail"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="d-flex flex-row-reverse p-2">
                <button
                  type="button"
                  className="btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa-regular fa-circle-xmark fa-xl"></i>
                </button>
              </div>
              <div className="form-item">
                <div className="input-box">
                  <h4 className="text-center mb-3">{t("update_email")}</h4>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">{t("email")}</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={onEmailChange}
                      />
                    </div>
                    {errorEmail && <div className="text-danger mt-2">{errorEmail}</div>}
                    <div className="input-field mt-3">
                      <button
                        type="submit"
                        className="btn-submit"
                        onClick={updateEmail}
                      >
                        {t("update")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Infor-Address */}
      <div
        className="modal fade"
        id="updateAddress"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="d-flex flex-row-reverse p-2">
                <button
                  type="button"
                  className="btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa-regular fa-circle-xmark fa-xl"></i>
                </button>
              </div>
              <div className="form-item">
                <div className="input-box">
                  <div className="content-item">
                    <div className="content-title">
                      <h4>{t('address')}</h4>
                    </div>
                    <div className="content-item address-list">
                      <div className="content">
                        <form onSubmit={handleChangeAddress}>
                          <div className="address-type m-3">
                            <div className="mb-3">
                              <label className="form-label">{t('remember_name')}</label>
                              <input
                                value={rememberName}
                                onChange={(e) =>
                                  handleRememberName(e.target.value)
                                }
                                type="text"
                                className="form-control"
                                placeholder={t('address_placeholder')}
                                required
                              />
                            </div>
                          </div>
                          <div className="row m-3">
                            <div className="address-type col-sm-4 ps-0">
                              <div className="type-title mb-2">
                                <p>{t('city')}</p>
                              </div>
                              <div className="custom-select">
                                <select
                                  className="form-select"
                                  id="province"
                                  value={selectedProvince}
                                  onChange={handleProvinceChange}
                                >
                                  <option value="">{t('select_city')}</option>
                                  {cities.map((province) => (
                                    <option
                                      key={province.Id}
                                      value={province.Name}
                                    >
                                      {province.Name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="address-type col-sm-4">
                              <div className="type-title mb-2">
                                <p>{t('district')}</p>
                              </div>
                              <div className="custom-select">
                                <select
                                  className="form-select"
                                  id="district"
                                  value={selectedDistrict}
                                  onChange={handleDistrictChange}
                                  disabled={!selectedProvince}
                                >
                                  <option value="">{t('select_district')}</option>
                                  {districts.map((district) => (
                                    <option
                                      key={district.Id}
                                      value={district.Name}
                                    >
                                      {district.Name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="address-type col-sm-4 pe-0">
                              <div className="type-title mb-2">
                                <p>{t('ward')}</p>
                              </div>
                              <div className="custom-select">
                                <select
                                  className="form-select"
                                  id="ward"
                                  value={selectedWard}
                                  onChange={handleWardChange}
                                  disabled={!selectedDistrict}
                                >
                                  <option value="">{t('select_ward')}</option>
                                  {wards.map((ward) => (
                                    <option key={ward.Id} value={ward.Name}>
                                      {ward.Name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="address-type m-3">
                            <div className="mb-3">
                              <label className="form-label">{t('street')}</label>
                              <input
                                value={street}
                                onChange={(e) => handleStreet(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder={t('street_placeholder')}
                                required
                              />
                            </div>
                          </div>
                          <div className="apply-button d-flex justify-content-end m-3">
                            <button
                              className="btn btn-danger btn--m m-2"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              type="button"
                            >
                              {t('cancel')}
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success btn--m m-2"
                            >
                              {t('submit')}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Image */}
      <div
        className="modal fade"
        id="updateImg"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center">
            <div className="modal-body p-0">
              <div className="d-flex flex-row-reverse p-2">
                <button
                  type="button"
                  className="btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa-regular fa-circle-xmark fa-xl"></i>
                </button>
              </div>
              <div className="form-item">
                <div className="input-box">
                  <div className="content-item">
                    <div className="content-title">
                      <h4>{t('updateAva')}</h4>
                    </div>
                    <div className="content-item address-list">
                      <div className="content">
                        <div className="fileContainer">
                          <button className="chooseFile">{t('selectAva')}</button>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={onPictureChange}
                          />
                        </div>
                        {profilePicture ? (
                          <>
                            <div className="avatar-container mx-auto ">
                              <img
                                src={profilePicture}
                                className="img-fluid rounded d-block"
                              />
                            </div>
                            <div className="input-field mt-3">
                              <button
                                type="submit"
                                className="btn-submit"
                                onClick={updateImage}
                              >
                                {t("update")}
                              </button>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Logout */}
      <div
        className="modal fade"
        id="customerLogout"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center">
            <div className="modal-body p-0">
              <div className="d-flex flex-row-reverse p-2">
                <button
                  type="button"
                  className="btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa-regular fa-circle-xmark fa-xl"></i>
                </button>
              </div>
              <div className="form-item">
                <div className="input-box">
                  <div className="content-item">
                    <div className="content-title">
                      <h4>{t("sign_out")}</h4>
                    </div>
                    <div className="content-item address-list">
                      <div className="content">
                        <div className="address-type m-3">
                          <p>{t("sign_out_quest")}</p>
                        </div>
                        <div className="input-field mt-3">
                          <button
                            type="submit"
                            className="btn-submit"
                            onClick={handleLogout}
                          >
                            {t("sign_out")}
                          </button>
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
  );
}

export default DetailCustomer;
