import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axiosConfig from "../../../config/axiosConfig";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';



import bgTrip from "../../images/empty-trip.png";
import avatarCar from "../../images/advan2.png";

function InforCustomer() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const language = queryParams.get('lng');
    if (language) {
      i18n.changeLanguage(language); // Thay đổi ngôn ngữ theo URL
    }
  }, [location, i18n]); const [customer, setCustomer] = useState(null);
  const customerAccount = localStorage.getItem("token");
  const navigate = useNavigate();

  const errRef = useRef(null);
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

  useEffect(() => {
    if (customerAccount) {
      findCustomer();
    }
  }, []);

  const [contracts, setCustomerTrip] = useState([]);

  const getCustomerTrip = async () => {
    try {
      const response = await axiosConfig.get(
        `http://localhost:8080/api/v1/contracts/customer-trip`
      );
      setCustomerTrip(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  };

  useEffect(() => {
    getCustomerTrip();
    console.log(contracts);
  }, []);

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
  const deposit = "deposit";
  const remain = "remain";
  const handlePaymentClick = (contractId, amount) => {
    // Redirect to the payment page with the carId
    navigate(`/carrentsg/payment/${contractId}?amount=${amount}&type=${deposit}`);
  };

  const handlePayRemain = (contractId, amount) => {
    // Redirect to the payment page with the carId
    navigate(`/carrentsg/payment/${contractId}?amount=${amount}&type=${remain}`);
  };

  return (
    <>
      <div className="content-title">
        <h1>{t('my_trip')}</h1>
      </div>
      {contracts.length ? (
        contracts.map((contract) => (
          <div className="content-item user-profile">
            <div className="title">
              <div className="title-edit ps-4">
                <h5>{t('car_rental_info')}</h5>
              </div>
              {contract.staffId ? (
                contract.deposit < 1 ? (
                  <a
                    className="btn btn-primary"
                    onClick={() => handlePaymentClick(contract.contractId, contract.payCost)}
                  >
                    <i class="fa-solid fa-cart-shopping"></i> {t('pay')}
                  </a>
                ) : (
                  <div>
                    {contract.remainBill == 0 ? (
                      <span class="text-success fs-5 fw-2">{t('complete')}</span>
                    ) : (
                      <button
                        class="btn btn-primary"
                        onClick={() => handlePayRemain(contract.contractId, contract.remainCost)}
                      >
                        {t('remainPayment')}
                      </button>
                    )}
                  </div>
                )
              ) : (
                <div>
                  <a className="btn btn-danger m-2">
                    <i class="fa-solid fa-xmark"></i> {t('cancel_trip')}
                  </a>
                  <a className="btn btn-success m-2">
                    <i class="fa-solid fa-gear"></i> {t('change_trip')}
                  </a>
                </div>
              )}
            </div>
            <div className="content">
              <div className="avatar-box">
                <div className="avatar-trip avatar--xl">
                  <img
                    loading="lazy"
                    src={contract.carImage}
                    alt={contract.carName}
                  />
                </div>
                <h6>{contract.carName}</h6>
                <p className="note">{t('start_date')}: {formatDate(contract.createDate)}</p>
              </div>
              <div className="info-user">
                <div className="info-box">
                  <div className="info-box__item">
                    <p>{t('renter')}</p>
                    <p className="main">{contract.customerName}</p>
                  </div>
                  <div className="info-box__item">
                    <p>{t('start_date')}</p>
                    <p className="main">{formatDate(contract.startDate)}</p>
                  </div>
                  <div className="info-box__item">
                    <p>{t('end_date')}</p>
                    <p className="main">{formatDate(contract.endDate)}</p>
                  </div>
                  <div className="info-box__item">
                    <p>{t('rent_price')}</p>
                    <p className="main">{formatVND(contract.rentCost)} VND</p>
                  </div>
                  <div className="info-box__item">
                    <p>{t('total_cost')}</p>
                    <p className="main">
                      {formatVND(contract.totalRentCost)} VND
                    </p>
                  </div>
                  <div className="info-box__item">
                    <p>{t('deposit')}</p>
                    <p className="main">
                      {formatVND(contract.totalRentCost * 0.2)} VND
                    </p>
                  </div>
                  <div className="info-box__item">
                    <p>{t('pay_later')}</p>
                    <p className="main">
                      {formatVND(
                        contract.remainBill == 0
                          ? contract.remainCost
                          : contract.remainBill
                      )}{" "}
                      VND
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-note"></div>
          </div>
        ))
      ) : (
        <div content-item>
          <div className="empty-container">
            <img src={bgTrip} loading="lazy" />
            <p>{t('no_trip')}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default InforCustomer;
