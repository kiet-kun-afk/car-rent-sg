import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './common/header';
import Footer from './common/footer';

import '../../style/styleIndex.css';

function CustomerCar() {

    const [cars, setCars] = useState([]);
    

    const loadListCar = async () => {
        const result = await axios.get('http://localhost:8080/api/v1/cars');
        console.log(result.data.data);

        setCars(result.data.data);
        console.log(cars);
    };

    useEffect(() => {
        loadListCar();
    }, []);

    function formatVND(value) {
        // Check if value is a number
        if (typeof value !== 'number') {
            return '';
        }

        // Convert value to a string with two decimal places
        const formattedValue = value.toFixed(2).toString();

        // Add thousands separators
        const parts = formattedValue.split('.');
        const formattedPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `${formattedPart}`;
    }

    return (
        <div class="carrent-layout">
            {/* <!-- Header --> */}
            <div>
                <Header />
            </div>

            {/* <!-- ---------------------------------------------------------------------------------------------------- -->
             <!-- Body --> */}
            {/* <div class="c-container">
                <div class="header-menu" style={{ justifyContent: "center" }}>
                    <div className='row text-center'>
                        <div className='col'>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle btn-outline-dark rounded-pill"
                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-car-side"></i> Loại Xe
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/qlxe/findlx?keywords=1">4 chỗ (Mini)</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findlx?keywords=2">4 chỗ (Sedan)</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findlx?keywords=3">5 chỗ (CUV gầm cao</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findlx?keywords=4">7 chỗ (SUV gầm cao)</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findlx?keywords=5">7 chỗ (MPV gầm thấp)</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findlx?keywords=6">Bán tải</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findlx?keywords=7">MiniVan</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col'>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle btn-outline-dark rounded-pill"
                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-globe"></i> Hãng Xe
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/qlxe/findhx?keywords=Vinfast">Vinfast</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findhx?keywords=Mercedes">Mercedes</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findhx?keywords=TOYOTA">TOYOTA</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findhx?keywords=KIA">KIA</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findhx?keywords=HUYNDAI">HUYNDAI</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findhx?keywords=FORD">FORD</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findhx?keywords=MAZDA">MAZDA</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findhx?keywords=NISSAN">NISSAN</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findhx?keywords=LEXUS">LEXUS</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/findhx?keywords=Honda">Honda</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col'>
                            <a class="btn btn-outline-dark rounded-pill" type="button"
                                aria-expanded="false" href="/qlxe/findxechuathue?keywords=0">
                                <i class="fa-solid fa-bolt-lightning"></i> Xe Chưa Thuê
                            </a>
                        </div>
                        <div className='col'>
                            <a class="btn btn-outline-dark rounded-pill" type="button"
                                aria-expanded="false">
                                <i class="fa-brands fa-creative-commons-nc"></i> Miễn Thế Chấp
                            </a>
                        </div>
                        <div className='col'>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle btn-outline-dark rounded-pill"
                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-coins"></i> Giá Thuê
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/qlxe/asc?field=giaThue">Tăng Dần</a></li>
                                    <li><a class="dropdown-item" href="/qlxe/desc?field=giaThue">Giảm Dần</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col'>
                            <a class="btn btn-outline-dark rounded-pill" type="button"
                                aria-expanded="false">
                                <i class="fa-solid fa-map"></i> Giao Xe Nhanh
                            </a>
                        </div>
                        <div className='col'>
                            <a class="btn btn-outline-dark rounded-pill" type="button"
                                aria-expanded="false" href="/qlxe/findxedien?keywords=Điện">
                                <i class="fa-solid fa-car-on"></i>Xe Điện
                            </a>
                        </div>
                        <div className='col'>
                            <div>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle btn-outline-dark rounded-pill"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-gears"></i> Truyền Động
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/qlxe/findtruyendong?keywords=Tự">Số
                                            Tự Động</a></li>
                                        <li><a class="dropdown-item" href="/qlxe/findtruyendong?keywords=Sàn">Số
                                            Sàn</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div class="c-container">
                <div class="row">
                    {
                        cars.map((car) => (
                            <div class="col-lg-3" style={{ padding: "12px 12px" }}>
                                <a className="car-item" href="">
                                    <div className="car-item-box">
                                        <div className="car-item-img">
                                            <div className="car-img">
                                                <img alt="" src={`../img/${car.frontImage}`} />
                                            </div>
                                            <span className="car-note"> <span className="c-note"> Đặt Xe Nhanh
                                                <i className="fa-solid fa-bolt" style={{ color: "yellow" }}></i>
                                            </span> <span className="c-note">
                                                    Miễn Thế Chấp <i className="fa-solid fa-lock-open" style={{ color: "green" }}></i>
                                                </span>
                                            </span>
                                            <div className="car-avatar">
                                                <img alt="" src="../img/avatar-4.png" />
                                            </div>
                                            <span className="car-discount">Giảm 10%</span>
                                        </div>

                                        <div className="car-item-detail">
                                            <div className="c-detail-type">
                                                <span className="type-item">{car.transmission}</span>
                                                <span className="type-item-1">{car.fuelType}</span>
                                            </div>
                                            <div className="c-detail-name">
                                                <p>{car.carName}</p>
                                                {/* <i className="fa-solid fa-shield-halved" style={{ color: "green" }}></i> */}
                                            </div>
                                            <div className="c-detail-address">
                                                <i className="fa-solid fa-location-dot" style={{ color: "red" }}></i>
                                                <p>{car.branchName}</p>
                                            </div>
                                            <div className="c-detail-line"></div>
                                            <div className="c-detail-price">
                                                <div className="price-info">
                                                    <i className="fa-solid fa-person-walking-luggage"></i>
                                                    <span className="num-trip"></span>
                                                </div>
                                                <div className="price-warp">
                                                    <span className="price-special"> {formatVND(car.rentCost)} VNĐ</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        ))
                    }

                </div>
            </div>

            {/* <!-- Footer --> */}
            <div>
                <Footer />
            </div>

        </div>
    );
}

export default CustomerCar;