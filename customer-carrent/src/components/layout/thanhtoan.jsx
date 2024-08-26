import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import Header from "./common/header";
import Footer from "./common/footer";
import PaymentMethodAccordion from "./PaymentMethodAccordion";

function PaymentMethod() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const language = queryParams.get('lng');
    if (language) {
      i18n.changeLanguage(language); // Thay đổi ngôn ngữ theo URL
    }
  }, [location, i18n]);
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

  const [contractDetails, setContractDetails] = useState(null);
  const { contractId } = useParams();

  useEffect(() => {
    console.log("Contract ID:", contractId); // Debug log to check contractId
    const fetchData = async () => {
      if (!contractId || isNaN(contractId)) {
        console.error("Invalid contract ID:", contractId);
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/payments/${contractId}`
        );
        setContractDetails(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching contract details:", error);
      }
    };

    fetchData();
  }, [contractId]);

  const [paymentMethod, setPaymentMethod] = useState(null);

  const handlePayment = async () => {
    let endpoint = "";
    let payload = new URLSearchParams();
    let queryParams = new URLSearchParams(window.location.search);
    let amount = queryParams.get("amount");
    let type = queryParams.get("type");
    let contractId = contractDetails.contractId;
    payload.append("contractId", contractDetails.contractId);

    if (paymentMethod === "momo") {
      endpoint = `http://localhost:8080/api/v1/payments/momo/${contractId}?amount=${amount}&type=${type}`;
    } else if (paymentMethod === "vnpay") {
      endpoint = `http://localhost:8080/api/v1/payments/vnpay/${contractId}?amount=${amount}&type=${type}`;
    } else {
      alert("Please select a payment method");
      return;
    }

    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = response.data;
      console.log("Response data:", data);

      if (data.status === "OK") {
        window.location.href = data.paymentUrl;
      } else {
        console.error("Payment failed:", data.message);
        alert("Payment failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Error during payment: " + error.message);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "Loading...";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const [selectedCard, setSelectedCard] = useState("");

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

  return (
    <div>
      <Header />
      {contractDetails ? (
        <div className="container-sm border-2">
          <h1 className="mb-5 mt-2 text-center">{t('choosePaymentMethod')}</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="accordion" id="paymentMethodsAccordion">
                <PaymentMethodAccordion
                  id="collapseFive"
                  headerId="headingFive"
                  targetId="collapseFive"
                  iconClass="fa-exchange-alt"
                  title={t('bankTransfer')}
                >
                  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
                    <ol>
                      <li>
                        {t('placeOrder')}
                      </li>
                      <li>
                        {t('transferWithin')}
                      </li>
                    </ol>
                    <div style={{ backgroundColor: '#e0f3ff', padding: '20px', marginTop: '10px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="https://s-vnba-cdn.aicms.vn/vnba-media/23/8/11/2-logo-vietcombank-voi-y-nghia-rieng_64d5f7a4a4311.png" alt="Vietcombank" style={{ width: '200px', marginRight: '10px' }} />
                        <div>
                          <strong style={{ color: '#3b7dd8' }}>{t('bankInfo.bankName')}</strong>
                          <p>{t('bankInfo.accountNumber')}</p>
                          <p>{t('bankInfo.accountHolder')}</p>
                          <p>{t('bankInfo.transferNote')}</p>
                        </div>
                      </div>
                    </div>
                    <ol start="3">
                      <li>
                        {t('sendScreenshot')}
                      </li>
                    </ol>
                  </div>
                </PaymentMethodAccordion>

                <PaymentMethodAccordion
                  id="collapseTwo"
                  headerId="headingTwo"
                  targetId="collapseTwo"
                  iconClass="fa-wallet"
                  title={t('eWallet')}
                >
                  <div>
                    <ol>
                      <li>{t('chooseEWallet')}</li>
                      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <label htmlFor="e-wallet-momo" style={{ marginLeft: '8px' }}>
                            <img
                              src="https://cdn.tgdd.vn/2020/03/GameApp/Untitled-2-200x200.jpg"
                              alt="MoMo"
                              style={{ width: '100px' }}
                            />
                          </label>
                          <input
                            type="radio"
                            id="e-wallet-momo"
                            name="payment-method"
                            value="momo"
                            style={{ width: '100px' }}
                            onChange={() => setPaymentMethod('momo')}
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <label htmlFor="e-wallet-vnpay" style={{ marginLeft: '8px' }}>
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                              alt="VNPay"
                              style={{ width: '100px' }}
                            />
                          </label>
                          <input
                            type="radio"
                            id="e-wallet-vnpay"
                            name="payment-method"
                            value="vnpay"
                            style={{ width: '100px' }}
                            onChange={() => setPaymentMethod('vnpay')}
                          />
                        </div>
                      </div>
                      <li>{t('payNow')}</li>
                      <li>{t('enterAccountInfo')}</li>
                      <li>{t('paymentSuccess')}</li>
                    </ol>
                  </div>
                </PaymentMethodAccordion>

                <PaymentMethodAccordion
                  id="collapseThree"
                  headerId="headingThree"
                  targetId="collapseThree"
                  iconClass="fa-globe"
                  title={t('visaMasterCard')}
                >
                  <div>
                    <ol>
                      <li>{t('visaNote')}</li>
                      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <label htmlFor="e-wallet-momo" style={{ marginLeft: '8px' }}>
                            <img
                              src="https://cdn.tgdd.vn/2020/03/GameApp/Untitled-2-200x200.jpg"
                              alt="MoMo"
                              style={{ width: '100px' }}
                            />
                          </label>
                          <input
                            type="radio"
                            id="e-wallet-momo"
                            name="payment-method"
                            value="momo"
                            style={{ width: '100px' }}
                            onChange={() => setPaymentMethod('momo')}
                          />
                        </div>
                      </div>
                      <li>{t('payNow')}</li>
                      <li>{t('enterAccountInfo')}</li>
                      <li>{t('paymentSuccess')}</li>
                    </ol>
                  </div>
                </PaymentMethodAccordion>

                <PaymentMethodAccordion
                  id="collapseFour"
                  headerId="headingFour"
                  targetId="collapseFour"
                  iconClass="fa-university"
                  title={t('atm')}
                >
                  <div>
                    <ol>
                      <li>{t('atmNote')}</li>
                      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <label htmlFor="e-wallet-vnpay" style={{ marginLeft: '8px' }}>
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                              alt="VNPay"
                              style={{ width: '100px' }}
                            />
                          </label>
                          <input
                            type="radio"
                            id="e-wallet-vnpay"
                            name="payment-method"
                            value="vnpay"
                            style={{ width: '100px' }}
                            onChange={() => setPaymentMethod('vnpay')}
                          />
                        </div>
                      </div>
                      <li>{t('payNow')}</li>
                      <li>{t('enterAccountInfo')}</li>
                      <li>{t('paymentSuccess')}</li>
                    </ol>
                  </div>
                </PaymentMethodAccordion>

                <PaymentMethodAccordion
                  id="collapseSix"
                  headerId="headingSix"
                  targetId="collapseSix"
                  iconClass="fa-gift"
                  title={t('gotitCard')}
                >
                  <input type="text" className="form-control" placeholder={t('enterGotitCode')} />
                  <button className="btn btn-primary mt-2" style={{ backgroundColor: '#5fcf86' }}>{t('apply')}</button>
                </PaymentMethodAccordion>

                <PaymentMethodAccordion
                  id="collapseOne"
                  headerId="headingOne"
                  targetId="collapseOne"
                  iconClass="fa-credit-card"
                  title={t('myCard')}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="summary-card border-0">
                <div className="row">
                  <div className="col-6">
                    <img
                      src={contractDetails.carImage || "default-image-url"}
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="col-6">
                    <div className="car-title">
                      <b> {contractDetails.carName || "Loading..."}</b>
                    </div>
                    <div>
                      <label htmlFor="">
                        <i
                          className="fa-solid fa-star me-2"
                          style={{ color: "#FFD43B" }}
                        ></i>{" "}
                        4.8
                      </label>
                      <label htmlFor="" className="ms-3"></label>
                      <label htmlFor=""> </label>
                    </div>
                    <div>
                      <i className="fas fa-map-marker-alt me-2"></i>

                      {contractDetails.address.street +
                        ", " +
                        contractDetails.address.ward +
                        ", " +
                        contractDetails.address.district +
                        ", " +
                        contractDetails.address.province}
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-6">
                    <div className="row">
                      <div className="col-12">{t('receive')}</div>
                      <div className="col-12">
                        <b>{formatDate(contractDetails.startDate)}</b>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-12">{t('return')}</div>
                      <div className="col-12">
                        <b>{formatDate(contractDetails.endDate)}</b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 mt-4">
                  <div className="row">
                    <div className="col-12">{t('pickupLocation')}</div>
                    <div className="col-12">
                      <b>
                        {contractDetails.address.street +
                          ", " +
                          contractDetails.address.ward +
                          ", " +
                          contractDetails.address.district +
                          ", " +
                          contractDetails.address.province}
                      </b>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    {t('rentUnitPrice')}{" "}
                    <b>
                      {formatVND(contractDetails.rentCost)} {t('currency')} / {t('day')}
                    </b>
                  </div>
                </div>
                <div className="total-price mt-3">
                  {t('rentalDays')}: <b>{contractDetails.numberDay} {t('days')}</b>
                </div>
                <div className="total-price mt-3">
                  {t('totalCost')}:{" "}
                  <b>{formatVND(contractDetails.totalRentCost)} VND</b>
                </div>
                <div className="total-price mt-3">
                  {t('deposit')}:{" "}
                  <b>
                    {formatVND((contractDetails.totalRentCost * 20) / 100)} VND
                  </b>
                </div>
                <button
                  className="btn w-100 mt-3 text-white"
                  style={{ backgroundColor: "#5fcf86" }}
                  onClick={handlePayment}
                >
                  {t('pay')}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
      <Footer />
    </div>
  );
}

export default PaymentMethod;
