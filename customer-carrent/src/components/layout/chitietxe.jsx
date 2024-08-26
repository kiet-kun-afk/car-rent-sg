import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useParams } from "react-router-dom";
import Header from "./common/header";
import Footer from "./common/footer";
import Login from "./Login/login";
import Register from "./Login/register";

import { ToastContainer } from "react-toastify";
import ToastComponent from "../../assets/toasty";

import cccdImg from "../images/gplx_cccd.png";
import gplxImg from "../images/gplx_passport.png";
import { useAuth } from "../../config/AuthContext";
import "../../style/styleDetailCar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DetailCar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const language = queryParams.get('lng');
    if (language) {
      i18n.changeLanguage(language); // Thay đổi ngôn ngữ theo URL
    }
  }, [location, i18n]);
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countDate, setCountDate] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Hàm tính số ngày giữa hai ngày
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate - startDate + 1;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const handleCreateContract = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("wayToPay", "Tiền mặt");

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/contracts/create/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      ToastComponent("success", t('carDetail.carValidSuccess'));
      setTimeout(() => {
        navigate("/carrentsg/customer/trip");
      }, 4000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        setErrorMessage(error.response.data.data);
        //ToastComponent("err", error.response.data.data);
      } else {
        //ToastComponent("err", "Không thể tạo hợp đồng");
        setErrorMessage(t('carDetail.carValidFailure'));
      }
      //console.error("Không thể tạo hợp đồng", error);
    }
  };

  const handleRentClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };

  const [car, setCar] = useState(null);

  const { isLoggedIn } = useAuth();

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/cars/${id}`);
      setCar(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    if (startDate && endDate) {
      const days = calculateDays(startDate, endDate);
      setCountDate(days);
      setTotalPrice(days * car.rentCost);
    } else {
      setCountDate(0);
      setTotalPrice(0);
    }
  }, [startDate, endDate, ToastComponent]);

  function formatVND(value) {
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

  return (
    <div className="carrent-layout">
      {/* <!-- Header --> */}
      <div>
        <Header />
      </div>
      <div className="m-container">
        <section className="body mt-4">
          <div className="header-car">
            <div className="m-container">
              <a href="#outsfeatures">{t('features')}</a>
              <a href="#papers">{t('documents')}</a>
              <a href="#carmap">{t('location')}</a>
            </div>
          </div>
          {car ? (
            <div className="container-custom">
              <div className="row">
                <div className="col-md-8 left-img">
                  <img
                    src={`${car.frontImage}`}
                    alt="Car Image"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-4 right-img">
                  <img
                    src={`${car.backImage}`}
                    alt="Car Image"
                    className="img-fluid mb-2"
                  />
                  <img
                    src={`${car.rightImage}`}
                    alt="Car Image"
                    className="img-fluid mb-2"
                  />
                  <img
                    src={`${car.leftImage}`}
                    alt="Car Image"
                    className="img-fluid mb-2"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="line-page mt-3 mb-3"></div>
                  <div className="info-car-desc" id="carmap">
                    <div className="header-custom mt-3">
                      <h2>{car.carName}</h2>
                    </div>
                  </div>
                  <div className="line-page"></div>
                  <div className="info-car-desc line-bottom" id="outsfeatures">
                    <h6>{t("features")}</h6>
                    <div className="outstanding-features">
                      <div className="outstanding-features__item">
                        <div className="wrap-svg me-2">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.914 23.3289C10.9148 23.3284 10.9156 23.3279 10.9163 23.3274C10.9155 23.3279 10.9148 23.3284 10.914 23.3289ZM10.914 23.3289C10.914 23.3289 10.914 23.3289 10.914 23.3289L11.3128 23.9114M10.914 23.3289L11.3128 23.9114M11.3128 23.9114L10.9807 23.2882L20.6697 23.9458C20.6682 23.9484 20.6656 23.9496 20.6631 23.9479C20.655 23.9424 20.6343 23.9284 20.6014 23.9074C20.6014 23.9073 20.6014 23.9073 20.6013 23.9073C20.5141 23.8516 20.3413 23.7468 20.0921 23.6208C20.0919 23.6207 20.0918 23.6206 20.0917 23.6206C19.3397 23.2404 17.8926 22.6674 16.0003 22.6674C14.1715 22.6674 12.7584 23.2026 11.9869 23.5817L11.9929 23.5929M11.3128 23.9114L11.331 23.9456C11.3324 23.9483 11.3352 23.9495 11.3377 23.9478C11.3444 23.9432 11.3592 23.9332 11.3821 23.9184L11.9929 23.5929L11.9929 23.5929M11.9929 23.5929C11.9909 23.5892 11.9889 23.5855 11.9868 23.5818C11.6767 23.7342 11.4702 23.8614 11.3821 23.9184L11.9929 23.5929ZM10.6691 24.2983L10.6691 24.2983C10.7406 24.4324 10.8728 24.5792 11.0793 24.6538C11.3072 24.7361 11.5609 24.7039 11.7614 24.5667L11.7614 24.5667C11.7978 24.5418 13.4597 23.4174 16.0003 23.4174C18.5426 23.4174 20.205 24.5432 20.2393 24.5667L20.2393 24.5667C20.4389 24.7034 20.6938 24.7372 20.9245 24.6528C21.1293 24.5779 21.2557 24.4338 21.3233 24.3136L22.4886 22.2427L24.3242 23.0447L21.6934 28.584H9.99882L7.65051 23.0635L9.57427 22.2435L10.6691 24.2983ZM24.4348 22.8117L24.4345 22.8124L24.4348 22.8117Z"
                              stroke="#5FCF86"
                              strokeWidth="1.5"
                            ></path>
                            <path
                              d="M12.75 4.66675C12.75 3.97639 13.3096 3.41675 14 3.41675H18C18.6904 3.41675 19.25 3.97639 19.25 4.66675V7.00008C19.25 7.13815 19.1381 7.25008 19 7.25008H13C12.8619 7.25008 12.75 7.13815 12.75 7.00008V4.66675Z"
                              stroke="#5FCF86"
                              strokeWidth="1.5"
                            ></path>
                            <path
                              d="M9.33398 22.6668L9.90564 11.2336C9.95887 10.1692 10.8374 9.3335 11.9031 9.3335H20.0982C21.1639 9.3335 22.0424 10.1692 22.0957 11.2336L22.6673 22.6668"
                              stroke="#5FCF86"
                              strokeWidth="1.5"
                            ></path>
                            <path
                              d="M14.667 7.35815V9.8901"
                              stroke="#5FCF86"
                              strokeWidth="1.5"
                            ></path>
                            <path
                              d="M17.334 7.35815V9.8901"
                              stroke="#5FCF86"
                              strokeWidth="1.5"
                            ></path>
                          </svg>
                        </div>
                        <div className="title">
                          <p className="sub">{t("number_of_seats")}</p>
                          <p className="main" text="NUMBER SEATS">
                            <b>{car.numberOfSeat} {t("seats")}</b>
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="outstanding-features__item">
                          <div className="wrap-svg me-2">
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M25.9163 7.99992C25.9163 9.05846 25.0582 9.91659 23.9997 9.91659C22.9411 9.91659 22.083 9.05846 22.083 7.99992C22.083 6.94137 22.9411 6.08325 23.9997 6.08325C25.0582 6.08325 25.9163 6.94137 25.9163 7.99992Z"
                                stroke="#5FCF86"
                                strokeWidth="1.5"
                              ></path>
                              <circle
                                cx="23.9997"
                                cy="23.9999"
                                r="1.91667"
                                stroke="#5FCF86"
                                strokeWidth="1.5"
                              ></circle>
                              <path
                                d="M17.9163 7.99992C17.9163 9.05846 17.0582 9.91659 15.9997 9.91659C14.9411 9.91659 14.083 9.05846 14.083 7.99992C14.083 6.94137 14.9411 6.08325 15.9997 6.08325C17.0582 6.08325 17.9163 6.94137 17.9163 7.99992Z"
                                stroke="#5FCF86"
                                strokeWidth="1.5"
                              ></path>
                              <path
                                d="M17.9163 23.9999C17.9163 25.0585 17.0582 25.9166 15.9997 25.9166C14.9411 25.9166 14.083 25.0585 14.083 23.9999C14.083 22.9414 14.9411 22.0833 15.9997 22.0833C17.0582 22.0833 17.9163 22.9414 17.9163 23.9999Z"
                                stroke="#5FCF86"
                                strokeWidth="1.5"
                              ></path>
                              <circle
                                cx="7.99967"
                                cy="7.99992"
                                r="1.91667"
                                stroke="#5FCF86"
                                strokeWidth="1.5"
                              ></circle>
                              <path
                                d="M10.1025 26.6666V21.3333H7.99837C7.59559 21.3333 7.25184 21.4053 6.96712 21.5494C6.68066 21.6918 6.46278 21.894 6.31348 22.1562C6.16244 22.4166 6.08691 22.723 6.08691 23.0754C6.08691 23.4296 6.1633 23.7343 6.31608 23.9895C6.46886 24.243 6.69021 24.4374 6.98014 24.5728C7.26834 24.7083 7.6173 24.776 8.02702 24.776H9.43587V23.8697H8.20931C7.99403 23.8697 7.81521 23.8402 7.67285 23.7812C7.53049 23.7221 7.42459 23.6336 7.35514 23.5155C7.28396 23.3975 7.24837 23.2508 7.24837 23.0754C7.24837 22.8984 7.28396 22.7491 7.35514 22.6275C7.42459 22.506 7.53136 22.414 7.67546 22.3515C7.81782 22.2872 7.9975 22.2551 8.21452 22.2551H8.97493V26.6666H10.1025ZM7.22233 24.2395L5.89681 26.6666H7.1416L8.43848 24.2395H7.22233Z"
                                fill="#5FCF86"
                              ></path>
                              <path
                                d="M24 10.6665V15.9998M24 21.3332V15.9998M16 10.6665V21.3332M8 10.6665V15.4998C8 15.776 8.22386 15.9998 8.5 15.9998H24"
                                stroke="#5FCF86"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                            </svg>
                          </div>
                          <div className="title">
                            <p className="sub">{t("transmission")}</p>
                            <p className="main" text="TRANSACTION">
                              <b>{car.transmission}</b>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="outstanding-features__item">
                          <div className="wrap-svg me-2">
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24.3337 27.2499H7.66699C7.52892 27.2499 7.41699 27.138 7.41699 26.9999V12.4599C7.41699 12.3869 7.44888 12.3175 7.5043 12.27L14.652 6.14344L14.1639 5.574L14.652 6.14344C14.6973 6.1046 14.755 6.08325 14.8147 6.08325H24.3337C24.4717 6.08325 24.5837 6.19518 24.5837 6.33325V26.9999C24.5837 27.138 24.4717 27.2499 24.3337 27.2499Z"
                                stroke="#5FCF86"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M12.0001 5.33325L7.42285 9.46712"
                                stroke="#5FCF86"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M17.888 19.5212L16.7708 15.93C16.5378 15.1812 15.4785 15.1798 15.2436 15.928L14.1172 19.5164C13.7178 20.7889 14.6682 22.0833 16.0019 22.0833C17.3335 22.0833 18.2836 20.7927 17.888 19.5212Z"
                                stroke="#5FCF86"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M23.2503 3.66675V5.66675C23.2503 5.80482 23.1384 5.91675 23.0003 5.91675H14.667C14.5827 5.91675 14.5365 5.8916 14.5072 5.86702C14.4721 5.83755 14.44 5.78953 14.4245 5.72738C14.4089 5.66524 14.4147 5.60775 14.4318 5.56523C14.4461 5.52975 14.4749 5.48584 14.5493 5.44616L18.2993 3.44616C18.3356 3.42685 18.376 3.41675 18.417 3.41675H23.0003C23.1384 3.41675 23.2503 3.52868 23.2503 3.66675Z"
                                stroke="#5FCF86"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                            </svg>
                          </div>
                          <div className="title">
                            <p className="sub">{t("fuel")}</p>
                            <p className="main" text="FUEL TYPE">
                              <b>{car.fuelType}</b>
                            </p>
                          </div>
                        </div>
                      </div>

                      {car.fuelConsumption === null ||
                        car.fuelConsumption === "NULL" ? (
                        <div></div>
                      ) : (
                        <div>
                          <div className="outstanding-features__item">
                            <div className="wrap-svg me-2">
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.41667 24V23.25H6.66667H4.75V18.0833H6.66667H7.41667V17.3333V15.4167H9.33333H9.64399L9.86366 15.197L12.3107 12.75H24.5833V23.25H22.6667H22.356L22.1363 23.4697L19.6893 25.9167H7.41667V24Z"
                                  stroke="#5FCF86"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                ></path>
                                <path
                                  d="M24 21.3333H28"
                                  stroke="#5FCF86"
                                  strokeWidth="1.5"
                                ></path>
                                <path
                                  d="M24 18.6665H28"
                                  stroke="#5FCF86"
                                  strokeWidth="1.5"
                                ></path>
                                <path
                                  d="M15.417 7.33325C15.417 6.6429 15.9766 6.08325 16.667 6.08325H20.667C21.3573 6.08325 21.917 6.6429 21.917 7.33325V8.58325H15.417V7.33325Z"
                                  stroke="#5FCF86"
                                  strokeWidth="1.5"
                                ></path>
                                <path
                                  d="M17.333 9.33325V11.9999M19.9997 9.33325V11.9999"
                                  stroke="#5FCF86"
                                  strokeWidth="1.5"
                                ></path>
                                <path
                                  d="M4.66699 26.01L4.66699 15.3308"
                                  stroke="#5FCF86"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                ></path>
                                <path
                                  d="M27.3291 23.3384L27.3291 16.6704"
                                  stroke="#5FCF86"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                ></path>
                              </svg>
                            </div>
                            <div className="title">
                              <p className="sub">{t("energy_consumed")}</p>
                              <p className="main" text="FUEL CONSUMPTION">
                                <b>{car.fuelConsumption}</b>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="line-page mt-3 mb-3"></div>
                  <div className="info-car-desc" id="carmap">
                    <h6>{t('location')}</h6>
                    <div className="car-address">
                      <div className="address">
                        <i className="fa-solid fa-location-dot"></i>
                        <p>{car.branchName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="line-page"></div>
                  <div className="info-car-desc">
                    <h6>{t("describe")}</h6>
                    <pre>
                      <span text="DESCRIPTION">
                        {car.carName}, {car.categoryName}, {car.brandName}.
                      </span>
                    </pre>
                  </div>
                  <div className="info-car-desc" id="papers">
                    <h6 className="df-align-center">{t('rental_documents')}</h6>
                    <div className="required-papers">
                      <div className="required-papers__item">
                        <div className="type__item">
                          <div className="wrap-svg">
                            <svg
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.49967 1.33325C4.82634 1.33325 1.83301 4.32659 1.83301 7.99992C1.83301 11.6733 4.82634 14.6666 8.49967 14.6666C12.173 14.6666 15.1663 11.6733 15.1663 7.99992C15.1663 4.32659 12.173 1.33325 8.49967 1.33325ZM8.49967 6.05325C8.22634 6.05325 7.99967 5.83325 7.99967 5.55325C7.99967 5.27992 8.22634 5.05325 8.49967 5.05325C8.77967 5.05325 8.99967 5.27992 8.99967 5.55325C8.99967 5.83325 8.77967 6.05325 8.49967 6.05325ZM8.99967 10.3866C8.99967 10.6666 8.77301 10.8866 8.49967 10.8866C8.22634 10.8866 7.99967 10.6666 7.99967 10.3866V7.27992C7.99967 6.99992 8.22634 6.77992 8.49967 6.77992C8.77301 6.77992 8.99967 6.99992 8.99967 7.27992V10.3866Z"
                                fill="#666666"
                              ></path>
                            </svg>
                          </div>
                          <p className="font-12">{t('choose_one')}</p>
                        </div>
                        <div className="type-content">
                          <img loading="lazy" src={cccdImg} />
                          <div className="type-name">
                            <p>{t('cccd_chip')}</p>
                          </div>
                        </div>
                        <div className="type-content">
                          <img loading="lazy" src={gplxImg} />
                          <div className="type-name">
                            <p>{t('gplx')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 mb-3"></div>
                  <div className="info-car-desc">
                    <h6 className="df-align-center">{t('collateral')}</h6>
                    <div className="required-papers">
                      <p>{t('collateral_info')}</p>
                    </div>
                  </div>
                  <div className="mt-3 mb-3"></div>
                  <div className="info-car-desc">
                    <h6>{t('terms_and_conditions')}</h6>
                    <pre>
                      {t('terms_list', { returnObjects: true }).map((term, index) => (
                        <React.Fragment key={index}>
                          {term}
                          <br />
                        </React.Fragment>
                      ))}
                      <br />
                      {t('thank_you')}
                    </pre>
                  </div>
                  <div className="info-car-desc">
                    <h6>{t('cancel_policy')}</h6>
                    <div className="cancel-policy">
                      <div className="column title">
                        <div className="column__item case">
                          {t('time_of_cancellation')}
                        </div>
                        <div className="column__item">
                          {t('renter_cancellation')}                        </div>
                        <div className="column__item">
                          {t('owner_cancellation')}                          </div>
                      </div>
                      <div className="column">
                        <div className="column__item case">
                          {t('within_1_hour')}
                        </div>
                        <div className="column__item">
                          <div className="wrap-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z"
                                fill="#12B76A"
                              ></path>
                            </svg>
                          </div>
                          {t('full_refund')}
                        </div>
                        <div className="column__item">
                          <div className="wrap-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z"
                                fill="#12B76A"
                              ></path>
                            </svg>
                          </div>
                          {t('no_fee')}
                          <span>{t("system_rating")} 3*</span>
                        </div>
                      </div>
                      <div className="column">
                        <div className="column__item case">
                          {t('before_7_days')}
                        </div>
                        <div className="column__item">
                          <div className="wrap-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z"
                                fill="#12B76A"
                              ></path>
                            </svg>
                          </div>
                          {t('refund_70')}
                        </div>
                        <div className="column__item">
                          <div className="wrap-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z"
                                fill="#12B76A"
                              ></path>
                            </svg>
                          </div>
                          {t('compensation_30')}
                          <span>{t("system_rating")} 3*</span>
                        </div>
                      </div>
                      <div className="column">
                        <div className="column__item case">
                          {t('within_7_days')}
                        </div>
                        <div className="column__item">
                          <div className="wrap-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM14.67 13.39C14.97 13.69 14.96 14.16 14.67 14.45C14.52 14.59 14.33 14.67 14.14 14.67C13.95 14.67 13.75 14.59 13.61 14.44L12.25 13.07L10.9 14.44C10.75 14.59 10.56 14.67 10.36 14.67C10.17 14.67 9.98 14.59 9.84 14.45C9.54 14.16 9.53999 13.69 9.82999 13.39L11.2 12L9.82999 10.61C9.53999 10.31 9.54 9.84 9.84 9.55C10.13 9.26 10.61 9.26 10.9 9.56L12.25 10.93L13.61 9.56C13.9 9.26 14.37 9.26 14.67 9.55C14.96 9.84 14.97 10.31 14.67 10.61L13.3 12L14.67 13.39Z"
                                fill="#F04438"
                              ></path>
                            </svg>
                          </div>
                          {t('no_refund')}
                        </div>
                        <div className="column__item">
                          <div className="wrap-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM14.67 13.39C14.97 13.69 14.96 14.16 14.67 14.45C14.52 14.59 14.33 14.67 14.14 14.67C13.95 14.67 13.75 14.59 13.61 14.44L12.25 13.07L10.9 14.44C10.75 14.59 10.56 14.67 10.36 14.67C10.17 14.67 9.98 14.59 9.84 14.45C9.54 14.16 9.53999 13.69 9.82999 13.39L11.2 12L9.82999 10.61C9.53999 10.31 9.54 9.84 9.84 9.55C10.13 9.26 10.61 9.26 10.9 9.56L12.25 10.93L13.61 9.56C13.9 9.26 14.37 9.26 14.67 9.55C14.96 9.84 14.97 10.31 14.67 10.61L13.3 12L14.67 13.39Z"
                                fill="#F04438"
                              ></path>
                            </svg>
                          </div>
                          {t('compensation_100')}
                          <span>{t("system_rating")} 2*</span>
                        </div>
                      </div>
                      <div className="desc-note">
                        <p>{t('note')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="line-page mt-3 mb-3"></div>
                </div>
                <div className="col-md-4">
                  <div
                    className="rent-box"
                    id="cardetail"
                    style={{ position: "relative" }}
                  >
                    <div className="price">
                      <h4>
                        <span id="priceRent">{t('rentCostPerDay', { cost: formatVND(car.rentCost) })}</span>
                      </h4>
                    </div>
                    <button
                      id="openModal"
                      type="button"
                      className="btn btn-primary hidden"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Open modal
                    </button>
                    <form onSubmit={handleCreateContract}>
                      <div
                        className="date-time-form justify-content-center flex-wrap "
                        id="chooseDate"
                      >
                        <div className="form-item">
                          <label>{t('receiveCar')}</label>
                          <div className="wrap-date-time justify-content-center">
                            <div className="wrap-date">
                              <input
                                id="startDate"
                                type="datetime-local"
                                className="form-control"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="line-page mb-2"></div>
                        <div className="form-item">
                          <label>{t('returnCar')}</label>
                          <div className="wrap-date-time justify-content-center">
                            <div className="wrap-date">
                              <input
                                id="endDate"
                                type="datetime-local"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        {errorMessage != "" ? (
                          <div className="form-error m-2">
                            <span className="error-item1">
                              <div className="line-page mb-2"></div>
                              <p>{errorMessage}</p>
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="dropdown-form">
                        <label>{t('rentalLocation')}</label>
                        <div className="wrap-form ">
                          <span className="value">{car.branchName}</span>
                        </div>
                      </div>
                      <div className="price-container">
                        <div className="price-item">
                          <p className="df-align-center">{t('unitPrice')}</p>
                          <p className="cost">
                            <span id="priceRent1" text="RENT AMOUNT"></span>
                            {t('rentCostPerDay', { cost: formatVND(car.rentCost) })}
                          </p>
                        </div>
                        <div className="line-page"></div>
                        <div className="price-item">
                          <p>{t('total')}</p>
                          <p className="cost">
                            <span id="priceRent2" text="RENT AMOUNT"></span>
                            {formatVND(car.rentCost)} {t('dong')} x
                            <span id="countDays">{countDate}</span> {t('day')}
                          </p>
                        </div>
                        <div className="line-page"></div>
                        <div className="price-item total">
                          <p>{t('amount')}</p>
                          <p className="cost">
                            <span id="totalPrice" text="TOTAL AMOUNT">{formatVND(totalPrice)}</span>đ
                          </p>
                        </div>
                      </div>
                      {isLoggedIn ? (
                        <button
                          type="submit"
                          id="chooseRent"
                          className="btn btn-primary btn--m width-100"
                        >
                          <div className="wrap-svg">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.9733 7.70015L8.46667 14.2668C8.29334 14.5268 8.01335 14.6668 7.71335 14.6668C7.62002 14.6668 7.52667 14.6535 7.43334 14.6268C7.05334 14.5068 6.79335 14.1668 6.79335 13.7735V10.0135C6.79335 9.86015 6.64667 9.72682 6.46667 9.72682L3.78001 9.6935C3.44001 9.6935 3.12668 9.50016 2.97335 9.20682C2.82668 8.92016 2.84668 8.5735 3.03335 8.30017L7.53335 1.7335C7.76001 1.40016 8.18001 1.25349 8.56668 1.37349C8.94668 1.49349 9.20668 1.83349 9.20668 2.22682V5.98683C9.20668 6.14017 9.35335 6.2735 9.53335 6.2735L12.22 6.30682C12.56 6.30682 12.8733 6.49349 13.0267 6.79349C13.1733 7.08016 13.1533 7.42682 12.9733 7.70015Z"
                                fill="#FFC634"
                              ></path>
                            </svg>
                          </div>
                          <span>
                            <b>{t('rent')}</b>
                          </span>
                        </button>
                      ) : (
                        <a
                          className="btn btn-primary btn--m width-100"
                          href="/carrentsg/login"
                          data-bs-toggle="modal"
                          data-bs-target="#loginWindow"
                        >
                          {t('login')}
                        </a>
                      )}
                    </form>
                  </div>
                  <div className="surcharge">
                    <p className="title text-primary">
                      {t('surchargeTitle')}
                    </p>
                    <div className="surcharge-container">
                      <div className="surcharge-item">
                        <div className="wrap-svg">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 7.33398V10.4407" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z" fill="#666666"></path>
                            <path d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </div>
                        <div className="content">
                          <div className="content-item">
                            <p className="title">{t('distanceFeeTitle')}</p>
                            <p className="cost">
                              <span>{t('distanceFee')}</span>
                            </p>
                          </div>
                          <div className="content-item">
                            <p>{t('distanceFeeDescription')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="surcharge-item">
                        <div className="wrap-svg">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 7.33398V10.4407" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z" fill="#666666"></path>
                            <path d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </div>
                        <div className="content">
                          <div className="content-item">
                            <p className="title">{t('timeFeeTitle')}</p>
                            <p className="cost">
                              <span>{t('timeFee')}</span>
                            </p>
                          </div>
                          <div className="content-item">
                            <p>{t('timeFeeDescription')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="surcharge-item">
                        <div className="wrap-svg">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 7.33398V10.4407" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z" fill="#666666"></path>
                            <path d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </div>
                        <div className="content">
                          <div className="content-item">
                            <p className="title">{t('cleaningFeeTitle')}</p>
                            <p className="cost">
                              <span>{t('cleaningFee')}</span>
                            </p>
                          </div>
                          <div className="content-item">
                            <p>{t('cleaningFeeDescription')}</p>
                          </div>
                        </div>
                      </div>
                      <div className="surcharge-item">
                        <div className="wrap-svg">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 7.33398V10.4407" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z" fill="#666666"></path>
                            <path d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z" stroke="#666666" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </div>
                        <div className="content">
                          <div className="content-item">
                            <p className="title">{t('odorFeeTitle')}</p>
                            <p className="cost">
                              <span>{t('odorFee')}</span>
                            </p>
                          </div>
                          <div className="content-item">
                            <p>{t('odorFeeDescription')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading....</p>
          )}
        </section>
      </div>
      <ToastContainer />
      <Login />
      <Register />
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default DetailCar;
