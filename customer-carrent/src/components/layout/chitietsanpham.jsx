import React from "react";
import Calen from "../layout/common/calendar"

// import '../../style/main.chunk.css';

function DetailCar() {
    return (
            <div class="mioto-layout">
                <section class="header scroll-top">
                    {/* <!-- header --> */}
                </section>
                <section class="body">
                    <div class="header-car">
                        <div class="m-container">
                            <a href="#outsfeatures">Đặc điểm</a>
                            <a href="#papers">Giấy tờ thuê xe</a>
                            <a href="#carmap">Vị trí xe</a>
                        </div>
                    </div>
                    <div class="cover-car">
                        <div class="m-container">
                            <div class="cover-car-container">
                                <div class="main-img">
                                    <div class="cover-car-item">
                                        <img loading="lazy" alt="error" src="/images/" />
                                    </div>
                                </div>
                                <div class="sub-img">
                                    <div class="cover-car-item">
                                        <img loading="lazy" src="/images/" alt="error" />
                                    </div>
                                    <div class="cover-car-item">
                                        <img loading="lazy" src="/images/" alt="error" />
                                    </div>
                                    <div class="cover-car-item">
                                        <img loading="lazy" src="/images/" alt="error" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="detail-car">
                        <div class="m-container">
                            <div class="detail-container">
                                <div class="content-detail">
                                    <div class="info-car-basic">
                                        <div class="group-name">
                                            <h3>
                                                <span style={{textTransform: "uppercase"}}>NAME OF CAR</span>
                                            </h3>
                                            <div class="group-action d-flex-center-btw">
                                                <div class="shared">
                                                    <div class="wrap-svg wrap-ic share">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.99015 14.02C8.1389 14.02 9.07015 13.1156 9.07015 12C9.07015 10.8844 8.1389 9.97998 6.99015 9.97998C5.8414 9.97998 4.91016 10.8844 4.91016 12C4.91016 13.1156 5.8414 14.02 6.99015 14.02Z"
                                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path
                                                                d="M17.0698 6.99995C18.1854 6.99995 19.0898 6.09557 19.0898 4.97995C19.0898 3.86433 18.1854 2.95996 17.0698 2.95996C15.9542 2.95996 15.0498 3.86433 15.0498 4.97995C15.0498 6.09557 15.9542 6.99995 17.0698 6.99995Z"
                                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path
                                                                d="M17.0698 21.04C18.1854 21.04 19.0898 20.1356 19.0898 19.02C19.0898 17.9044 18.1854 17 17.0698 17C15.9542 17 15.0498 17.9044 15.0498 19.02C15.0498 20.1356 15.9542 21.04 17.0698 21.04Z"
                                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path d="M9.23047 10.44L14.8305 6.54004" stroke="black"
                                                                stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path d="M14.8305 17.4601L9.23047 13.5601" stroke="black"
                                                                stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                    <div class="fav-item wrap-ic wrap-svg">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M21.25 8.7196C21.25 9.8796 20.81 11.0496 19.92 11.9396L18.44 13.4196L12.07 19.7896C12.04 19.8196 12.03 19.8296 12 19.8496C11.97 19.8296 11.96 19.8196 11.93 19.7896L4.08 11.9396C3.19 11.0496 2.75 9.8896 2.75 8.7196C2.75 7.54961 3.19 6.37961 4.08 5.48961C5.86 3.71961 8.74 3.71961 10.52 5.48961L11.99 6.9696L13.47 5.48961C15.25 3.71961 18.12 3.71961 19.9 5.48961C20.81 6.37961 21.25 7.53961 21.25 8.7196Z"
                                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="sidebar-detail">
                                    <div class="insurance cardetail">
                                        <img loading="lazy" src="/images/insurance-polish.svg" />
                                        <div class="content">
                                            <p>Bảo hiểm thuê xe</p>
                                            <p class="note">Chuyến đi có mua bảo hiểm. Khách thuê bồi
                                                thường tối đa 2.000.000 VNĐ trong trường hợp có sự cố ngoài ý
                                                muốn.</p>
                                        </div>
                                    </div>
                                    <div class="rent-box" id="cardetail" style={{position: "relative"}}>
                                        <div class="price">
                                            <h4>
                                                <span id="priceRent"></span>đ/ngày
                                            </h4>
                                        </div>
                                        <button id="openModal" type="button" class="btn btn-primary hidden"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal">Open modal</button>
                                        <div class="date-time-form" id="chooseDate">
                                            <div class="form-item">
                                                <label>Nhận xe</label>
                                                <div class="wrap-date-time">
                                                    <div class="wrap-date">
                                                        <span id="startDate" class="value"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="line"></div>
                                            <div class="form-item">
                                                <label>Trả xe</label>
                                                <div class="wrap-date-time">
                                                    <div class="wrap-date">
                                                        <span id="endDate" class="value"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dropdown-form">
                                            <label>Địa điểm giao xe</label>
                                            <div class="wrap-form ">
                                                <span class="value">ĐỊA CHỈ CHI NHÁNH</span>
                                            </div>
                                        </div>
                                        <div class="hidden">
                                            <span id="carId" class="hidden" text="REGISTRATION PLATE"></span>
                                            <form action="" method="post" object="">
                                                <input type="hidden" name="id" value="REGISTRATION PLATE" /> <input
                                                    type="text" id="createDateInput" name="CREATE DATE" value="" />
                                                <input type="text" id="startDateInput" name="START DATE" value="" /> <input
                                                    type="text" id="endDateInput" name="END DATE" value="" /> <input
                                                    type="text" id="priceInput" name="RENT AMOUNT" value="" /> <input
                                                    type="text" id="totalPriceInput" name="TOTAL AMOUNT" value="" />
                                                <input type="text" id="prePriceInput" name="DEPOSIT" value="0" />
                                                <div>
                                                    <input type="text" id="carInput" name="xe" value="" />
                                                    <input type="text" id="" name="khachHang" value="" />
                                                </div>
                                                <button id="RENT" type="submit"></button>
                                            </form>
                                            <div class="line-page"></div>
                                        </div>
                                        <div class="price-container">
                                            <span class="hidden" id="price" text="RENT AMOUNT"></span>
                                            <div class="price-item">
                                                <p class="df-align-center">Đơn giá thuê</p>
                                                <p class="cost">
                                                    <span id="priceRent1" text="RENT AMOUNT"></span>đ/ngày
                                                </p>
                                            </div>
                                            <div class="line-page"></div>
                                            <div class="price-item">
                                                <p>Tổng cộng</p>
                                                <p class="cost">
                                                    <span id="priceRent2" text="RENT AMOUNT"></span>đ x <span
                                                        id="countDays">0</span> ngày
                                                </p>
                                            </div>
                                            <div class="line-page"></div>
                                            <div class="price-item total">
                                                <p>Thành tiền</p>
                                                <p class="cost">
                                                    <span id="totalPrice" text="TOTAL AMOUNT"></span>đ
                                                </p>
                                            </div>
                                        </div>
                                        <a id="chooseRent" class="btn btn-primary btn--m width-100">
                                            <div class="wrap-svg">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12.9733 7.70015L8.46667 14.2668C8.29334 14.5268 8.01335 14.6668 7.71335 14.6668C7.62002 14.6668 7.52667 14.6535 7.43334 14.6268C7.05334 14.5068 6.79335 14.1668 6.79335 13.7735V10.0135C6.79335 9.86015 6.64667 9.72682 6.46667 9.72682L3.78001 9.6935C3.44001 9.6935 3.12668 9.50016 2.97335 9.20682C2.82668 8.92016 2.84668 8.5735 3.03335 8.30017L7.53335 1.7335C7.76001 1.40016 8.18001 1.25349 8.56668 1.37349C8.94668 1.49349 9.20668 1.83349 9.20668 2.22682V5.98683C9.20668 6.14017 9.35335 6.2735 9.53335 6.2735L12.22 6.30682C12.56 6.30682 12.8733 6.49349 13.0267 6.79349C13.1733 7.08016 13.1533 7.42682 12.9733 7.70015Z"
                                                        fill="#FFC634"></path>
                                                </svg>
                                            </div> CHỌN THUÊ
                                        </a>
                                        <p class="text-danger">YOU NEED LOGIN</p>
                                    </div>
                                    <div class="surcharge">
                                        <p class="title text-primary">Phụ phí có thể phát sinh</p>
                                        <div class="surcharge-container">
                                            <div class="surcharge-item">
                                                <div class="wrap-svg">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 7.33398V10.4407" stroke="#666666" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                        </path>
                                                        <path
                                                            d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z"
                                                            fill="#666666"></path>
                                                        <path
                                                            d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z"
                                                            stroke="#666666" stroke-linecap="round" stroke-linejoin="round">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <div class="content">
                                                    <div class="content-item">
                                                        <p class="title">Phí vượt giới hạn</p>
                                                        <p class="cost">
                                                            <span>4 000đ/km</span>
                                                        </p>
                                                    </div>
                                                    <div class="content-item">
                                                        <p>
                                                            Phụ phí phát sinh nếu lộ trình di chuyển vượt quá
                                                            <span>300km</span>
                                                            khi thuê xe<span> 1 ngày</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="surcharge-item">
                                                <div class="wrap-svg">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 7.33398V10.4407" stroke="#666666" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                        </path>
                                                        <path
                                                            d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z"
                                                            fill="#666666"></path>
                                                        <path
                                                            d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z"
                                                            stroke="#666666" stroke-linecap="round" stroke-linejoin="round">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <div class="content">
                                                    <div class="content-item">
                                                        <p class="title">Phí quá giờ</p>
                                                        <p class="cost">
                                                            <span>100 000đ/h</span>
                                                        </p>
                                                    </div>
                                                    <div class="content-item">
                                                        <p>
                                                            Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ
                                                            quá<span> 4 tiếng</span>, phụ phí thêm <span>1 ngày
                                                            </span>thuê
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="surcharge-item">
                                                <div class="wrap-svg">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 7.33398V10.4407" stroke="#666666" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                        </path>
                                                        <path
                                                            d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z"
                                                            fill="#666666"></path>
                                                        <path
                                                            d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z"
                                                            stroke="#666666" stroke-linecap="round" stroke-linejoin="round">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <div class="content">
                                                    <div class="content-item">
                                                        <p class="title">Phí vệ sinh</p>
                                                        <p class="cost">
                                                            <span>60 000đ</span>
                                                        </p>
                                                    </div>
                                                    <div class="content-item">
                                                        <p>Phụ phí phát sinh khi xe hoàn trả không đảm bảo vệ
                                                            sinh (nhiều vết bẩn, bùn cát, sình lầy...)</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="surcharge-item">
                                                <div class="wrap-svg">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 7.33398V10.4407" stroke="#666666" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                        </path>
                                                        <path
                                                            d="M8 6.05469C8.27614 6.05469 8.5 5.83083 8.5 5.55469C8.5 5.27855 8.27614 5.05469 8 5.05469C7.72386 5.05469 7.5 5.27855 7.5 5.55469C7.5 5.83083 7.72386 6.05469 8 6.05469Z"
                                                            fill="#666666"></path>
                                                        <path
                                                            d="M7.99967 14.1673C11.4054 14.1673 14.1663 11.4064 14.1663 8.00065C14.1663 4.5949 11.4054 1.83398 7.99967 1.83398C4.59392 1.83398 1.83301 4.5949 1.83301 8.00065C1.83301 11.4064 4.59392 14.1673 7.99967 14.1673Z"
                                                            stroke="#666666" stroke-linecap="round" stroke-linejoin="round">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <div class="content">
                                                    <div class="content-item">
                                                        <p class="title">Phí khử mùi</p>
                                                        <p class="cost">
                                                            <span>300 000đ</span>
                                                        </p>
                                                    </div>
                                                    <div class="content-item">
                                                        <p>Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu
                                                            (mùi thuốc lá, thực phẩm nặng mùi...)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="content-detail">
                                    <div class="line-page"></div>
                                    <div class="info-car-desc" id="outsfeatures">
                                        <h6>Đặc điểm</h6>
                                        <div class="outstanding-features">
                                            <div class="outstanding-features__item" if="">

                                                <div class="outstanding-features__item">
                                                    <div class="wrap-svg">
                                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M10.914 23.3289C10.9148 23.3284 10.9156 23.3279 10.9163 23.3274C10.9155 23.3279 10.9148 23.3284 10.914 23.3289ZM10.914 23.3289C10.914 23.3289 10.914 23.3289 10.914 23.3289L11.3128 23.9114M10.914 23.3289L11.3128 23.9114M11.3128 23.9114L10.9807 23.2882L20.6697 23.9458C20.6682 23.9484 20.6656 23.9496 20.6631 23.9479C20.655 23.9424 20.6343 23.9284 20.6014 23.9074C20.6014 23.9073 20.6014 23.9073 20.6013 23.9073C20.5141 23.8516 20.3413 23.7468 20.0921 23.6208C20.0919 23.6207 20.0918 23.6206 20.0917 23.6206C19.3397 23.2404 17.8926 22.6674 16.0003 22.6674C14.1715 22.6674 12.7584 23.2026 11.9869 23.5817L11.9929 23.5929M11.3128 23.9114L11.331 23.9456C11.3324 23.9483 11.3352 23.9495 11.3377 23.9478C11.3444 23.9432 11.3592 23.9332 11.3821 23.9184L11.9929 23.5929L11.9929 23.5929M11.9929 23.5929C11.9909 23.5892 11.9889 23.5855 11.9868 23.5818C11.6767 23.7342 11.4702 23.8614 11.3821 23.9184L11.9929 23.5929ZM10.6691 24.2983L10.6691 24.2983C10.7406 24.4324 10.8728 24.5792 11.0793 24.6538C11.3072 24.7361 11.5609 24.7039 11.7614 24.5667L11.7614 24.5667C11.7978 24.5418 13.4597 23.4174 16.0003 23.4174C18.5426 23.4174 20.205 24.5432 20.2393 24.5667L20.2393 24.5667C20.4389 24.7034 20.6938 24.7372 20.9245 24.6528C21.1293 24.5779 21.2557 24.4338 21.3233 24.3136L22.4886 22.2427L24.3242 23.0447L21.6934 28.584H9.99882L7.65051 23.0635L9.57427 22.2435L10.6691 24.2983ZM24.4348 22.8117L24.4345 22.8124L24.4348 22.8117Z"
                                                                stroke="#5FCF86" stroke-width="1.5"></path>
                                                            <path
                                                                d="M12.75 4.66675C12.75 3.97639 13.3096 3.41675 14 3.41675H18C18.6904 3.41675 19.25 3.97639 19.25 4.66675V7.00008C19.25 7.13815 19.1381 7.25008 19 7.25008H13C12.8619 7.25008 12.75 7.13815 12.75 7.00008V4.66675Z"
                                                                stroke="#5FCF86" stroke-width="1.5"></path>
                                                            <path
                                                                d="M9.33398 22.6668L9.90564 11.2336C9.95887 10.1692 10.8374 9.3335 11.9031 9.3335H20.0982C21.1639 9.3335 22.0424 10.1692 22.0957 11.2336L22.6673 22.6668"
                                                                stroke="#5FCF86" stroke-width="1.5"></path>
                                                            <path d="M14.667 7.35815V9.8901" stroke="#5FCF86"
                                                                stroke-width="1.5"></path>
                                                            <path d="M17.334 7.35815V9.8901" stroke="#5FCF86"
                                                                stroke-width="1.5"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="title">
                                                        <p class="sub">Số ghế</p>
                                                        <p class="main" text="NUMBER SEATS"></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div class="outstanding-features__item">
                                                    <div class="wrap-svg">
                                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M25.9163 7.99992C25.9163 9.05846 25.0582 9.91659 23.9997 9.91659C22.9411 9.91659 22.083 9.05846 22.083 7.99992C22.083 6.94137 22.9411 6.08325 23.9997 6.08325C25.0582 6.08325 25.9163 6.94137 25.9163 7.99992Z"
                                                                stroke="#5FCF86" stroke-width="1.5"></path>
                                                            <circle cx="23.9997" cy="23.9999" r="1.91667" stroke="#5FCF86"
                                                                stroke-width="1.5"></circle>
                                                            <path
                                                                d="M17.9163 7.99992C17.9163 9.05846 17.0582 9.91659 15.9997 9.91659C14.9411 9.91659 14.083 9.05846 14.083 7.99992C14.083 6.94137 14.9411 6.08325 15.9997 6.08325C17.0582 6.08325 17.9163 6.94137 17.9163 7.99992Z"
                                                                stroke="#5FCF86" stroke-width="1.5"></path>
                                                            <path
                                                                d="M17.9163 23.9999C17.9163 25.0585 17.0582 25.9166 15.9997 25.9166C14.9411 25.9166 14.083 25.0585 14.083 23.9999C14.083 22.9414 14.9411 22.0833 15.9997 22.0833C17.0582 22.0833 17.9163 22.9414 17.9163 23.9999Z"
                                                                stroke="#5FCF86" stroke-width="1.5"></path>
                                                            <circle cx="7.99967" cy="7.99992" r="1.91667" stroke="#5FCF86"
                                                                stroke-width="1.5"></circle>
                                                            <path
                                                                d="M10.1025 26.6666V21.3333H7.99837C7.59559 21.3333 7.25184 21.4053 6.96712 21.5494C6.68066 21.6918 6.46278 21.894 6.31348 22.1562C6.16244 22.4166 6.08691 22.723 6.08691 23.0754C6.08691 23.4296 6.1633 23.7343 6.31608 23.9895C6.46886 24.243 6.69021 24.4374 6.98014 24.5728C7.26834 24.7083 7.6173 24.776 8.02702 24.776H9.43587V23.8697H8.20931C7.99403 23.8697 7.81521 23.8402 7.67285 23.7812C7.53049 23.7221 7.42459 23.6336 7.35514 23.5155C7.28396 23.3975 7.24837 23.2508 7.24837 23.0754C7.24837 22.8984 7.28396 22.7491 7.35514 22.6275C7.42459 22.506 7.53136 22.414 7.67546 22.3515C7.81782 22.2872 7.9975 22.2551 8.21452 22.2551H8.97493V26.6666H10.1025ZM7.22233 24.2395L5.89681 26.6666H7.1416L8.43848 24.2395H7.22233Z"
                                                                fill="#5FCF86"></path>
                                                            <path
                                                                d="M24 10.6665V15.9998M24 21.3332V15.9998M16 10.6665V21.3332M8 10.6665V15.4998C8 15.776 8.22386 15.9998 8.5 15.9998H24"
                                                                stroke="#5FCF86" stroke-width="1.5" stroke-linecap="round">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                    <div class="title">
                                                        <p class="sub">Truyền động</p>
                                                        <p class="main" text="TRANSACTION"></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div class="outstanding-features__item">
                                                    <div class="wrap-svg">
                                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M24.3337 27.2499H7.66699C7.52892 27.2499 7.41699 27.138 7.41699 26.9999V12.4599C7.41699 12.3869 7.44888 12.3175 7.5043 12.27L14.652 6.14344L14.1639 5.574L14.652 6.14344C14.6973 6.1046 14.755 6.08325 14.8147 6.08325H24.3337C24.4717 6.08325 24.5837 6.19518 24.5837 6.33325V26.9999C24.5837 27.138 24.4717 27.2499 24.3337 27.2499Z"
                                                                stroke="#5FCF86" stroke-width="1.5" stroke-linecap="round">
                                                            </path>
                                                            <path d="M12.0001 5.33325L7.42285 9.46712" stroke="#5FCF86"
                                                                stroke-width="1.5" stroke-linecap="round"></path>
                                                            <path
                                                                d="M17.888 19.5212L16.7708 15.93C16.5378 15.1812 15.4785 15.1798 15.2436 15.928L14.1172 19.5164C13.7178 20.7889 14.6682 22.0833 16.0019 22.0833C17.3335 22.0833 18.2836 20.7927 17.888 19.5212Z"
                                                                stroke="#5FCF86" stroke-width="1.5" stroke-linecap="round">
                                                            </path>
                                                            <path
                                                                d="M23.2503 3.66675V5.66675C23.2503 5.80482 23.1384 5.91675 23.0003 5.91675H14.667C14.5827 5.91675 14.5365 5.8916 14.5072 5.86702C14.4721 5.83755 14.44 5.78953 14.4245 5.72738C14.4089 5.66524 14.4147 5.60775 14.4318 5.56523C14.4461 5.52975 14.4749 5.48584 14.5493 5.44616L18.2993 3.44616C18.3356 3.42685 18.376 3.41675 18.417 3.41675H23.0003C23.1384 3.41675 23.2503 3.52868 23.2503 3.66675Z"
                                                                stroke="#5FCF86" stroke-width="1.5" stroke-linecap="round">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                    <div class="title">
                                                        <p class="sub">Nhiên liệu</p>
                                                        <p class="main" text="FUEL TYPE"></p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div class="outstanding-features__item">
                                                    <div class="wrap-svg">
                                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M7.41667 24V23.25H6.66667H4.75V18.0833H6.66667H7.41667V17.3333V15.4167H9.33333H9.64399L9.86366 15.197L12.3107 12.75H24.5833V23.25H22.6667H22.356L22.1363 23.4697L19.6893 25.9167H7.41667V24Z"
                                                                stroke="#5FCF86" stroke-width="1.5" stroke-linecap="round">
                                                            </path>
                                                            <path d="M24 21.3333H28" stroke="#5FCF86" stroke-width="1.5">
                                                            </path>
                                                            <path d="M24 18.6665H28" stroke="#5FCF86" stroke-width="1.5">
                                                            </path>
                                                            <path
                                                                d="M15.417 7.33325C15.417 6.6429 15.9766 6.08325 16.667 6.08325H20.667C21.3573 6.08325 21.917 6.6429 21.917 7.33325V8.58325H15.417V7.33325Z"
                                                                stroke="#5FCF86" stroke-width="1.5"></path>
                                                            <path d="M17.333 9.33325V11.9999M19.9997 9.33325V11.9999"
                                                                stroke="#5FCF86" stroke-width="1.5"></path>
                                                            <path d="M4.66699 26.01L4.66699 15.3308" stroke="#5FCF86"
                                                                stroke-width="1.5" stroke-linecap="round"></path>
                                                            <path d="M27.3291 23.3384L27.3291 16.6704" stroke="#5FCF86"
                                                                stroke-width="1.5" stroke-linecap="round"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="title">
                                                        <p class="sub">NL tiêu hao</p>
                                                        <p class="main" text="FUEL CONSUMPTION"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="line-page"></div>
                                    <div class="info-car-desc">
                                        <h6>Mô tả</h6>
                                        <pre>
                                            <span text="DESCRIPTION"></span>
                                        </pre>
                                    </div>
                                    <div class="line-page"></div>
                                    <div class="info-car-desc">
                                        <h6>Các tiện nghi khác</h6>
                                        <div class="features-car">
                                            <ul>
                                                <li>
                                                    <img loading="lazy" src="/images/map-v2.png" alt="ERROR" />
                                                    <span text="MAP"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/dash_camera-v2.png" alt="ERROR" />
                                                    <span text="CAMERA"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/reverse_camera-v2.png" alt="ERROR" />
                                                    <span text="REVERSE CAMERA"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/360_camera-v2.png" alt="ERROR" />
                                                    <span text="CAMERA 360"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/gps-v2.png" alt="ERROR" />
                                                    <span text="GPS"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/usb-v2.png" alt="ERROR" />
                                                    <span text="USB"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/tpms-v2.png" alt="ERROR" />
                                                    <span text="SENSOR"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/impact_sensor-v2.png" alt="ERROR" />
                                                    <span text="COLLISION SENSOR"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/head_up-v2.png" alt="ERROR" />
                                                    <span text="SPEED WARNING"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/spare_tire-v2.png" alt="ERROR" />
                                                    <span text="SPARE TIRE"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/dvd-v2.png" alt="ERROR" />
                                                    <span text="DVD SCREEN"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/etc-v2.png" alt="ERROR" />
                                                    <span text="ETC"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/bluetooth-v2.png" alt="ERROR" />
                                                    <span text="BLUETOOTH"></span>
                                                </li>
                                                <li>
                                                    <img loading="lazy" src="/images/airbags-v2.png" alt="ERROR" />
                                                    <span text="AIRBAG"></span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="line-page"></div>
                                    <div class="info-car-desc" id="papers">
                                        <h6 class="df-align-center">
                                            Giấy tờ thuê xe
                                            <span class="tooltip tooltip--m  icon--m">
                                                <span class="wrap-svg"> <svg width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round"></path>
                                                    <path
                                                        d="M9.08984 9.00008C9.32495 8.33175 9.789 7.76819 10.3998 7.40921C11.0106 7.05024 11.7287 6.91902 12.427 7.03879C13.1253 7.15857 13.7587 7.52161 14.2149 8.06361C14.6712 8.60561 14.9209 9.2916 14.9198 10.0001C14.9198 12.0001 11.9198 13.0001 11.9198 13.0001"
                                                        stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round"></path>
                                                    <path d="M12 17H12.01" stroke="black" stroke-width="1.5"
                                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                </span>
                                                <span class="tooltip-text"> <b>Bạn đã có CCCD gắn
                                                    chip </b> <br />Giấy tờ thuê xe gồm có: <br />- Giấy phép
                                                    lái xe CCCD (chủ xe đối chiếu và gửi lại bạn) <br /> <b>Bạn
                                                        chưa có CCCD gắn chip </b> <br />Giấy tờ thuê xe gồm có: <br />-
                                                    Giấy phép lái xe (chủ xe đối chiếu và gửi lại bạn) <br />-
                                                    Passport (chủ xe đối chiếu, giữ lại và hoàn trả khi bạn trả
                                                    xe) <br />Lưu ý: Khách thuê vui lòng chuẩn bị đầy đủ BẢN
                                                    GỐC tất cả giấy tờ thuê xe khi làm thủ tục nhận xe.
                                                </span>
                                            </span>
                                        </h6>
                                        <div class="required-papers">
                                            <div class="required-papers__item">
                                                <div class="type__item">
                                                    <div class="wrap-svg">
                                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M8.49967 1.33325C4.82634 1.33325 1.83301 4.32659 1.83301 7.99992C1.83301 11.6733 4.82634 14.6666 8.49967 14.6666C12.173 14.6666 15.1663 11.6733 15.1663 7.99992C15.1663 4.32659 12.173 1.33325 8.49967 1.33325ZM8.49967 6.05325C8.22634 6.05325 7.99967 5.83325 7.99967 5.55325C7.99967 5.27992 8.22634 5.05325 8.49967 5.05325C8.77967 5.05325 8.99967 5.27992 8.99967 5.55325C8.99967 5.83325 8.77967 6.05325 8.49967 6.05325ZM8.99967 10.3866C8.99967 10.6666 8.77301 10.8866 8.49967 10.8866C8.22634 10.8866 7.99967 10.6666 7.99967 10.3866V7.27992C7.99967 6.99992 8.22634 6.77992 8.49967 6.77992C8.77301 6.77992 8.99967 6.99992 8.99967 7.27992V10.3866Z"
                                                                fill="#666666"></path>
                                                        </svg>
                                                    </div>
                                                    <p class="font-12">Chọn 1 trong 2 hình thức</p>
                                                </div>
                                                <div class="type-content">
                                                    <img loading="lazy" src="/images/gplx_cccd.png" />
                                                    <div class="type-name">
                                                        <p>GPLX CCCD gắn chip (đối chiếu)</p>
                                                    </div>
                                                </div>
                                                <div class="type-content">
                                                    <img loading="lazy" src="/images/gplx_passport.png" />
                                                    <div class="type-name">
                                                        <p>GPLX (đối chiếu) Passport (giữ lại)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info-car-desc">
                                        <h6 class="df-align-center">
                                            Tài sản thế chấp <span class="tooltip tooltip--m  icon--m">
                                                <span class="wrap-svg"> <svg width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                        stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round"></path>
                                                    <path
                                                        d="M9.08984 9.00008C9.32495 8.33175 9.789 7.76819 10.3998 7.40921C11.0106 7.05024 11.7287 6.91902 12.427 7.03879C13.1253 7.15857 13.7587 7.52161 14.2149 8.06361C14.6712 8.60561 14.9209 9.2916 14.9198 10.0001C14.9198 12.0001 11.9198 13.0001 11.9198 13.0001"
                                                        stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round"></path>
                                                    <path d="M12 17H12.01" stroke="black" stroke-width="1.5"
                                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                </span> <span class="tooltip-text"> Bạn sẽ để lại tài sản thế
                                                    chấp (tiền mặt/chuyển khoản hoặc xe máy kèm cà vẹt gốc) cho
                                                    chủ xe khi làm thủ tục nhận xe <br /> Chủ xe sẽ gửi lại
                                                    tài sản thế chấp khi bạn hoàn trả xe theo như nguyên trạng
                                                    ban đầu lúc nhận xe
                                                </span>
                                            </span>
                                        </h6>
                                        <div class="required-papers">
                                            <p>15 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe)
                                                hoặc Xe máy (kèm cà vẹt gốc) giá trị 15 triệu</p>
                                        </div>
                                    </div>
                                    <div class="info-car-desc">
                                        <h6>Điều khoản</h6>
                                        <pre>
                                            Quy định khác:
                                            ◦ Sử dụng xe đúng mục đích.
                                            ◦ Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
                                            ◦ Không sử dụng xe thuê để cầm cố, thế chấp.
                                            ◦ Không hút thuốc, nhả kẹo cao su, xả rác trong xe.
                                            ◦ Không chở hàng quốc cấm dễ cháy nổ.
                                            ◦ Không chở hoa quả, thực phẩm nặng mùi trong xe.
                                            ◦ Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ thu phí vệ sinh xe.
                                            Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !
                                        </pre>
                                    </div>
                                    <div class="info-car-desc">
                                        <h6>
                                            Chính sách huỷ chuyến<br />
                                            <p class="font-16 fontWeight-4 text-gray">Miễn phí hủy
                                                chuyến trong vòng 1 giờ sau khi đặt cọc</p>
                                        </h6>
                                        <div class="cancel-policy">
                                            <div class="column title">
                                                <div class="column__item case">Thời điểm hủy chuyến</div>
                                                <div class="column__item">Khách thuê hủy chuyến</div>
                                                <div class="column__item">Chủ xe hủy chuyến</div>
                                            </div>
                                            <div class="column">
                                                <div class="column__item case">Trong vòng 1h sau giữ
                                                    chỗ</div>
                                                <div class="column__item">
                                                    <div class="wrap-svg">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z"
                                                                fill="#12B76A"></path>
                                                        </svg>
                                                    </div>
                                                    Hoàn tiền giữ chỗ 100%
                                                </div>
                                                <div class="column__item">
                                                    <div class="wrap-svg">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z"
                                                                fill="#12B76A"></path>
                                                        </svg>
                                                    </div>
                                                    Không tốn phí<span>(Đánh giá hệ thống 3*)</span>
                                                </div>
                                            </div>
                                            <div class="column">
                                                <div class="column__item case">Trước chuyến đi &gt;7
                                                    ngày</div>
                                                <div class="column__item">
                                                    <div class="wrap-svg">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z"
                                                                fill="#12B76A"></path>
                                                        </svg>
                                                    </div>
                                                    Hoàn tiền giữ chỗ 70%
                                                </div>
                                                <div class="column__item">
                                                    <div class="wrap-svg">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM15.84 10.59L12.32 14.11C12.17 14.26 11.98 14.33 11.79 14.33C11.6 14.33 11.4 14.26 11.26 14.11L9.5 12.35C9.2 12.06 9.2 11.58 9.5 11.29C9.79 11 10.27 11 10.56 11.29L11.79 12.52L14.78 9.53C15.07 9.24 15.54 9.24 15.84 9.53C16.13 9.82 16.13 10.3 15.84 10.59Z"
                                                                fill="#12B76A"></path>
                                                        </svg>
                                                    </div>
                                                    Đền tiền 30%<span>(Đánh giá hệ thống 3*)</span>
                                                </div>
                                            </div>
                                            <div class="column">
                                                <div class="column__item case">Trong vòng 7 ngày trước
                                                    chuyến đi</div>
                                                <div class="column__item">
                                                    <div class="wrap-svg">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM14.67 13.39C14.97 13.69 14.96 14.16 14.67 14.45C14.52 14.59 14.33 14.67 14.14 14.67C13.95 14.67 13.75 14.59 13.61 14.44L12.25 13.07L10.9 14.44C10.75 14.59 10.56 14.67 10.36 14.67C10.17 14.67 9.98 14.59 9.84 14.45C9.54 14.16 9.53999 13.69 9.82999 13.39L11.2 12L9.82999 10.61C9.53999 10.31 9.54 9.84 9.84 9.55C10.13 9.26 10.61 9.26 10.9 9.56L12.25 10.93L13.61 9.56C13.9 9.26 14.37 9.26 14.67 9.55C14.96 9.84 14.97 10.31 14.67 10.61L13.3 12L14.67 13.39Z"
                                                                fill="#F04438">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                    Không hoàn tiền
                                                </div>
                                                <div class="column__item">
                                                    <div class="wrap-svg">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.25 2C6.74 2 2.25 6.49 2.25 12C2.25 17.51 6.74 22 12.25 22C17.76 22 22.25 17.51 22.25 12C22.25 6.49 17.76 2 12.25 2ZM14.67 13.39C14.97 13.69 14.96 14.16 14.67 14.45C14.52 14.59 14.33 14.67 14.14 14.67C13.95 14.67 13.75 14.59 13.61 14.44L12.25 13.07L10.9 14.44C10.75 14.59 10.56 14.67 10.36 14.67C10.17 14.67 9.98 14.59 9.84 14.45C9.54 14.16 9.53999 13.69 9.82999 13.39L11.2 12L9.82999 10.61C9.53999 10.31 9.54 9.84 9.84 9.55C10.13 9.26 10.61 9.26 10.9 9.56L12.25 10.93L13.61 9.56C13.9 9.26 14.37 9.26 14.67 9.55C14.96 9.84 14.97 10.31 14.67 10.61L13.3 12L14.67 13.39Z"
                                                                fill="#F04438">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                    Đền tiền 100%<span>(Đánh giá hệ thống 2*)</span>
                                                </div>
                                            </div>
                                            <div class="desc-note">
                                                <p>* Khách thuê không nhận xe sẽ không được hoàn tiền giữ
                                                    chỗ</p>
                                                <p>* Chủ xe không giao xe sẽ hoàn đền 100% tiền giữ chỗ
                                                    cho bạn</p>
                                                <p class="df-align-center">
                                                    * Tiền giữ chỗ bồi thường cho chủ xe hủy chuyến (nếu có) sẽ
                                                    được Mioto hoàn trả đến bạn bằng chuyển khoản ngân hàng
                                                    trong vòng 1-3 ngày làm việc.
                                                    <span class="tooltip tooltip--m ">
                                                        <span class="wrap-svg">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                                    stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                    stroke-linejoin="round">
                                                                </path>
                                                                <path
                                                                    d="M9.08984 9.00008C9.32495 8.33175 9.789 7.76819 10.3998 7.40921C11.0106 7.05024 11.7287 6.91902 12.427 7.03879C13.1253 7.15857 13.7587 7.52161 14.2149 8.06361C14.6712 8.60561 14.9209 9.2916 14.9198 10.0001C14.9198 12.0001 11.9198 13.0001 11.9198 13.0001"
                                                                    stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                    stroke-linejoin="round">
                                                                </path>
                                                                <path d="M12 17H12.01" stroke="black" stroke-width="1.5"
                                                                    stroke-linecap="round" stroke-linejoin="round">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                        <span class="tooltip-text">
                                                            <b>Thủ tục hoàn tiền
                                                                đền cọc</b> Mioto sẽ hoàn lại tiền cọc (tiền đền cọc do chủ
                                                            xe hủy chuyến (nếu có) theo chính sách hủy chuyến) qua tài
                                                            khoản ngân hàng của khách thuê trong vòng 1-3 ngày làm
                                                            việc kể từ thời điểm hủy chuyến. <i> *Nhân viên Mioto
                                                                sẽ liên hệ khách thuê (qua số điện thoại đã đăng ký trên
                                                                Mioto) để xin thông tin tài khoản ngân hàng, hoặc Khách
                                                                thuê có thể chủ động gửi thông tin cho Mioto qua email
                                                                Contact@mioto.vn hoặc nhắn tin tại Mioto Fanpage </i>
                                                        </span>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="line-page"></div>
                                    <div class="info-car-desc" id="carmap">
                                        <h6>Vị trí xe</h6>
                                        <div class="car-address">
                                            <div class="address">
                                                <div class="wrap-svg">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M11.9998 2.56885C7.8898 2.56885 4.5498 5.90884 4.5498 10.0188C4.5498 14.9088 10.7298 21.8288 10.9898 22.1189C11.2498 22.4089 11.6198 22.5688 11.9998 22.5688C12.3798 22.5688 12.7498 22.4089 13.0098 22.1189C13.6698 21.3889 19.4498 14.7988 19.4498 10.0188C19.4498 5.90884 16.1098 2.56885 11.9998 2.56885ZM11.9998 20.9988C11.1898 20.0588 6.0498 14.0188 6.0498 10.0188C6.0498 6.73884 8.7198 4.06885 11.9998 4.06885C15.2798 4.06885 17.9498 6.73884 17.9498 10.0188C17.9498 13.3988 14.1198 18.5988 11.9998 20.9988Z"
                                                            fill="black">
                                                        </path>
                                                        <path
                                                            d="M11.9998 2.56885C7.8898 2.56885 4.5498 5.90884 4.5498 10.0188C4.5498 14.9088 10.7298 21.8288 10.9898 22.1189C11.2498 22.4089 11.6198 22.5688 11.9998 22.5688C12.3798 22.5688 12.7498 22.4089 13.0098 22.1189C13.6698 21.3889 19.4498 14.7988 19.4498 10.0188C19.4498 5.90884 16.1098 2.56885 11.9998 2.56885ZM8.87981 10.0188C8.87981 8.29884 10.2798 6.89885 11.9998 6.89885C13.7198 6.89885 15.1198 8.29884 15.1198 10.0188C15.1198 11.7388 13.7198 13.1389 11.9998 13.1389C10.2798 13.1389 8.87981 11.7388 8.87981 10.0188Z"
                                                            fill="black">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <p>Quận 5, Hồ Chí Minh</p>
                                            </div>
                                            <a href="">
                                                <div class="maps-detail">
                                                    <div class="wrap-svg">
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M5.41653 7.3916H3.99987C3.04987 7.3916 2.2832 8.15827 2.2832 9.10827V15.0999C2.2832 16.0499 3.04987 16.8166 3.99987 16.8166H15.9915C16.9415 16.8166 17.7082 16.0499 17.7082 15.0999V9.10827"
                                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path d="M13.4253 7.3916H8.55859" stroke="black"
                                                                stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path
                                                                d="M13.4248 13.3833H15.9915C16.9415 13.3833 17.7081 14.15 17.7081 15.1C17.7081 16.05 16.9415 16.8166 15.9915 16.8166H13.4248"
                                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path
                                                                d="M13.4248 4.81665H15.9915C16.9415 4.81665 17.7081 5.58332 17.7081 6.53332"
                                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path d="M17.708 15.1V6.53333" stroke="black" stroke-width="1.5"
                                                                stroke-linecap="round" stroke-linejoin="round">
                                                            </path>
                                                            <path d="M13.4248 4.81665V13.3833" stroke="black"
                                                                stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path
                                                                d="M2.29199 11.6749H5.71699C6.19199 11.6749 6.57532 11.9999 6.57532 12.4083C6.57532 12.8166 6.95866 13.1416 7.43366 13.1416H8.29199C8.76699 13.1416 9.15032 13.4666 9.15032 13.8749V14.6083V16.8083"
                                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path
                                                                d="M7.00006 3.19165C5.81673 3.19165 4.8584 4.14998 4.8584 5.33332C4.8584 6.79998 6.77506 8.94998 6.85839 9.04165C6.93339 9.12498 7.06674 9.12498 7.14174 9.04165C7.22507 8.94998 9.14173 6.79998 9.14173 5.33332C9.14173 4.14998 8.18339 3.19165 7.00006 3.19165Z"
                                                                stroke="black" stroke-width="1.5" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                            </path>
                                                            <path
                                                                d="M7.00046 6.14996C7.41007 6.14996 7.74212 5.8179 7.74212 5.40829C7.74212 4.99868 7.41007 4.66663 7.00046 4.66663C6.59084 4.66663 6.25879 4.99868 6.25879 5.40829C6.25879 5.8179 6.59084 6.14996 7.00046 6.14996Z"
                                                                fill="black">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                    <p class="font-14 fontWeight-7">Xem bản đồ</p>
                                                    <div class="wrap-svg">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                            viewBox="0 0 20 20" fill="none">
                                                            <path
                                                                d="M12.9499 9.40832L8.23328 4.69999C8.15581 4.62188 8.06364 4.55989 7.96209 4.51758C7.86054 4.47527 7.75162 4.45349 7.64161 4.45349C7.5316 4.45349 7.42268 4.47527 7.32113 4.51758C7.21958 4.55989 7.12741 4.62188 7.04994 4.69999C6.89474 4.85613 6.80762 5.06734 6.80762 5.28749C6.80762 5.50764 6.89474 5.71885 7.04994 5.87499L11.1749 10.0417L7.04994 14.1667C6.89474 14.3228 6.80762 14.534 6.80762 14.7542C6.80762 14.9743 6.89474 15.1855 7.04994 15.3417C7.12712 15.4204 7.21916 15.483 7.32072 15.526C7.42229 15.5689 7.53135 15.5912 7.64161 15.5917C7.75187 15.5912 7.86094 15.5689 7.9625 15.526C8.06406 15.483 8.1561 15.4204 8.23328 15.3417L12.9499 10.6333C13.0345 10.5553 13.102 10.4606 13.1482 10.3552C13.1944 10.2497 13.2182 10.1359 13.2182 10.0208C13.2182 9.90574 13.1944 9.7919 13.1482 9.68648C13.102 9.58107 13.0345 9.48636 12.9499 9.40832Z"
                                                                fill="black"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="line-page"></div>
                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="related-car space sec">
                            <div class="m-container">
                                <h6>Xe tương tự</h6>
                            </div>
                            <div class="m-container">
                                <div
                                    class="swiper swiper-related-car swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                                    <div class="swiper-wrapper" style={{transform: "translate3d(0px, 0px, 0px)"}}>
                                        {/* <!-- item in items --> */}
                                        <div>
                                            <div class="swiper-slide swiper-slide-active"
                                                style={{width: "305px", marginRight: "20px"}}>
                                                <a href="" class=" item-car">
                                                    <div class="item-box">
                                                        <div class="img-car">
                                                            <div class="fix-img">
                                                                <img src="/images/" />
                                                            </div>
                                                        </div>
                                                        <div class="desc-car">
                                                            <div class="desc-name">
                                                                <p>NAME OF CAR</p>
                                                                <div class="wrap-svg">
                                                                    <svg width="24" height="24" viewBox="0 0 24 24"
                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M8.65372 3.63C9.89372 3.29813 11.2114 3 12 3C12.7886 3 14.1063 3.29813 15.3463 3.63C16.6149 3.9675 17.8937 4.36687 18.6457 4.60875C18.9601 4.71096 19.2389 4.8984 19.4499 5.14954C19.661 5.40068 19.7958 5.70533 19.8389 6.0285C20.52 11.0651 18.9394 14.7979 17.0217 17.2672C16.2085 18.3236 15.2388 19.2538 14.1451 20.0269C13.767 20.2944 13.3663 20.5296 12.9474 20.73C12.6274 20.8785 12.2834 21 12 21C11.7166 21 11.3737 20.8785 11.0526 20.73C10.6337 20.5296 10.233 20.2944 9.85486 20.0269C8.76118 19.2538 7.79153 18.3236 6.97829 17.2672C5.06058 14.7979 3.48001 11.0651 4.16115 6.0285C4.20422 5.70533 4.33903 5.40068 4.55008 5.14954C4.76114 4.8984 5.03988 4.71096 5.35429 4.60875C6.44594 4.25641 7.54607 3.93007 8.65372 3.63Z"
                                                                            stroke="#5FCF86" stroke-width="1.5"></path>
                                                                        <path d="M11.3333 12.6668L9.5 10.8335"
                                                                            stroke="#5FCF86" stroke-width="1.5"
                                                                            stroke-linecap="round" stroke-linejoin="round">
                                                                        </path>
                                                                        <path d="M14.9997 9L11.333 12.6667" stroke="#5FCF86"
                                                                            stroke-width="1.5" stroke-linecap="round"
                                                                            stroke-linejoin="round"></path>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div class="line-page"></div>
                                                            <div class="desc-info-price">
                                                                <div class="wrap-price">
                                                                    <div class="price">
                                                                        <span class="price-special" text="">989K</span>/ngày
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="footer">
                    <div class="m-container">
                        <div class="footer-about">
                            <div class="footer-info empty">
                                <div class="phone-mail">
                                    <a class="logo-government" target="_blank" href="http://online.gov.vn/"> <img
                                        loading="lazy" src="/images/bocongthuong.png" />
                                    </a>
                                </div>
                            </div>
                            <div class="footer-path d-flex-align-center two-item">
                                <div class="item">
                                    <div class="item-sub">
                                        <p>Phương thức thanh toán</p>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="payment">
                                        <img loading="lazy" src="/images/zalopay.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Calen/>
            </div>
            
    );
}

export default DetailCar;