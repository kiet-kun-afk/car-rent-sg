import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import axiosConfig from "../../../config/axiosConfig";
import { ToastContainer } from 'react-toastify';

import bgTrip from "../../images/empty-trip.png";
import avatarCar from "../../images/advan2.png";

function InforCustomer() {
    const [customer, setCustomer] = useState(null);
    const customerAccount = localStorage.getItem('token');

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
    }

    useEffect(() => {
        if (customerAccount) {
            findCustomer();
        }
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
        if (typeof value !== 'number') {
            return '';
        }

        // Convert value to a string with two decimal places
        const formattedValue = value.toFixed(2).toString();

        // Add thousands separators
        const parts = formattedValue.split('.');
        const formattedPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${formattedPart}`;
    }

    return (
        <>
            <div className="content-title">
                <h1>Chuyến của tôi</h1>
            </div>
            {customer ? (
                <div className="content-item user-profile">
                    <div className="title">
                        <div className="title-edit ps-4">
                            <h5>Thông tin đơn thuê xe</h5>
                        </div>
                        <a className="btn btn-success">
                            <i class="fa-solid fa-cart-shopping"></i> Thanh toán
                        </a>
                    </div>
                    <div className="content">
                        <div className="avatar-box">
                            <div className="avatar-trip avatar--xl">
                                <img loading="lazy" src={avatarCar} alt={customer.fullName} />
                            </div>
                            <h6>Tên xe</h6>
                            <p className="note">Ngày: dd/MM/yyy</p>
                        </div>
                        <div className="info-user">
                            <div className="info-box">
                                <div className="info-box__item">
                                    <p>Người thuê xe</p>
                                    <p className="main">Trần Đình Thành Đạt</p>
                                </div>
                                <div className="info-box__item">
                                    <p>Ngày bắt đầu</p>
                                    <p className="main">dd/MM/yyyy</p>
                                </div>
                                <div className="info-box__item">
                                    <p>Ngày kết thúc</p>
                                    <p className="main">dd/MM/yyyy</p>
                                </div>
                                <div className="info-box__item">
                                    <p>Đơn giá thuê</p>
                                    <p className="main">{formatVND(100000)} VND</p>
                                </div>
                                <div className="info-box__item">
                                    <p>Tổng tiền</p>
                                    <p className="main">{formatVND(100000)} VND</p>
                                </div>
                                <div className="info-box__item">
                                    <p>Tiền cọc</p>
                                    <p className="main">{formatVND(100000)} VND</p>
                                </div>
                                <div className="info-box__item">
                                    <p>Thanh toán sau</p>
                                    <p className="main">{formatVND(100000)} VND</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="info-note"></div>
                </div>
            ) : (
                <div content-item>
                    <div className='empty-container'>
                        <img src={bgTrip} loading='lazy' />
                        <p>Bạn chưa có chuyến</p>
                    </div>
                </div>
            )}

        </>
    )
}

export default InforCustomer;