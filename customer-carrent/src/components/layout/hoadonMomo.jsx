import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./common/header";
import Footer from "./common/footer";
import axios from "axios";
import ToastComponent from "../../assets/toasty";

const PaymentSuccessMomo = () => {
  const [params, setParams] = useState({});
  const navigate = useNavigate();
  const [contracts, setCars] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramObject = {};

    urlParams.forEach((value, key) => {
      paramObject[key] = value;
    });

    setParams(paramObject);
  }, []);

  const { orderId, amount, orderInfo, orderType, message, payType } = params;

  const loadListContracts = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/contracts/all"
    );
    setCars(result.data.data);
    console.log(result.data.data);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleBackToHome = async () => {
    loadListContracts();
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div style={styles.confirmation}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/026/530/562/original/round-checkbox-authentication-or-success-tick-vector.jpg"
          alt="Success"
          style={styles.icon}
        />
        <h2>Thanh toán thành công</h2>
        <p>Hoàn tất đơn hàng</p>
      </div>

      <div style={styles.invoice}>
        <h1>Xác nhận thanh toán</h1>
        <br />
        <br />
        <div style={styles.columns}>
          <div style={styles.column}>
            <p>
              <strong>Mã đơn hàng:</strong>{" "}
            </p>
            <p>
              <strong>Số tiền:</strong>{" "}
            </p>
            <p>
              <strong>Thông tin đơn hàng:</strong>{" "}
            </p>
            <p>
              <strong>Loại đơn hàng:</strong>{" "}
            </p>
            <p>
              <strong>Trạng thái đơn hàng:</strong>{" "}
            </p>
            <p>
              <strong>Hình thức thanh toán:</strong>{" "}
            </p>
          </div>
          <div style={styles.column}>
            <p>{orderId}</p>
            <p>{formatCurrency(amount)}</p>
            <p>{orderInfo}</p>
            <p>{orderType}</p>
            <p>{message}</p>
            <p>{payType}</p>
          </div>
        </div>
        <br />
        <br />
        <p>Cảm ơn quý khách hàng đã thanh toán!</p>
      </div>
      <button style={styles.button} onClick={handleBackToHome}>
        Trở về trang chủ
      </button>
      <Footer />
    </div>
  );
};

const styles = {
  confirmation: {
    textAlign: "center",
    margin: "20px 0",
  },
  icon: {
    width: "150px",
    height: "150px",
    display: "block",
    margin: "0 auto",
  },
  invoice: {
    border: "1px solid #ddd",
    padding: "20px",
    maxWidth: "600px",
    margin: "20px auto",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    marginTop: "50px",
  },
  columns: {
    display: "flex",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    padding: "0 10px",
  },
  button: {
    display: "block",
    width: "15%",
    padding: "10px",
    margin: "0 auto",
    marginTop: "50px",
    borderRadius: "13px",
    border: "2px solid #ddd",
    backgroundColor: "white",
    color: "#5fcf86",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default PaymentSuccessMomo;
