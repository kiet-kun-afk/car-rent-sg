import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';


import Header from "./layout/common/header";
import Footer from "./layout/common/footer";

import Login from "./layout/Login/login";
import Register from "./layout/Login/register";

import "../style/styleCar.css";

function CustomerIndex() {
	const { t, i18n } = useTranslation();
	const location = useLocation();
	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const language = queryParams.get('lng');
		if (language) {
			i18n.changeLanguage(language); // Thay đổi ngôn ngữ theo URL
		}
	}, [location, i18n]);
	const [cars, setCars] = useState([]);

	const loadListCar = async () => {
		const result = await axios.get(
			"http://localhost:8080/api/v1/cars/index"
		);
		setCars(result.data.data);
	};

	useEffect(() => {
		loadListCar();
	}, []);

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
	const navigate = useNavigate();

	const handleCarRegistrationPlate = (e) => {
		const registrationPlate = e.currentTarget.getAttribute("data-id");
		console.log(registrationPlate);
		if (registrationPlate) {
			navigate(`/carrentsg/car/${registrationPlate}`);
		} else {
			alert("registrationPlate wrong");
		}
	};

	return (
		<div className="carrent-layout">
			<Header />

			<div className="c-body">
				<div className="body-banner">
					<div className="c-container">
						<div className="body-background">
							<h1>{t('bannerTitle')}</h1>
							<div className="white-line"></div>
							<h6>
								{t('bannerSubtitlePart1')}
								<span style={{ color: "#009966" }}>
									{t('bannerHighlight')}
								</span>
								{t('bannerSubtitlePart2')}
							</h6>
						</div>
					</div>
				</div>

				<div className="car-background">
					<div className="c-container">
						<h1>{t('yourComponentTitle')}</h1>
					</div>
					<div className="c-container">
						<div className="row">
							{cars.map((car) => (
								<div
									className="col-md-3"
									key={car.carId}
									style={{ padding: "12px 12px" }}
								>
									<a
										className="car-item"
										href=""
										data-id={car.registrationPlate}
										onClick={handleCarRegistrationPlate}
									>
										<div className="car-item-box">
											<div className="car-item-img">
												<div className="car-img">
													<img
														alt=""
														src={`${car.frontImage}`}
													/>
												</div>
												<span className="car-note">
													{" "}
													<span className="c-note">
														{" "}
														{t('quickBooking')}
														<i
															className="fa-solid fa-bolt"
															style={{
																color: "yellow",
															}}
														></i>
													</span>{" "}
													<span className="c-note">
														{t('mortgageFree')}
														<i
															className="fa-solid fa-lock-open"
															style={{
																color: "green",
															}}
														></i>
													</span>
												</span>
												<div className="car-avatar">
													<img
														alt=""
														src="https://n1-cstg.mioto.vn/m/avatars/avatar-3.png"
													/>
												</div>
											</div>

											<div className="car-item-detail">
												<div className="c-detail-type">
													<span className="type-item">
														{car.transmission}
													</span>
													<span className="type-item-1">
														{car.fuelType}
													</span>
												</div>
												<div className="c-detail-name">
													<p>{car.carName}</p>
													{/* <i className="fa-solid fa-shield-halved" style={{ color: "green" }}></i> */}
												</div>
												<div className="c-detail-address">
													<i
														className="fa-solid fa-location-dot"
														style={{ color: "red" }}
													></i>
													<p>{car.branchName}</p>
												</div>
												<div className="c-detail-line"></div>
												<div className="c-detail-price">
													<div className="price-info">
														<i className="fa-solid fa-person-walking-luggage"></i>
														<span className="num-trip"></span>
													</div>
													<div className="price-warp">
														<span className="price-special">
															{" "}
															{formatVND(
																car.rentCost
															)}{" "}
															VNĐ
														</span>
													</div>
												</div>
											</div>
										</div>
									</a>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* <!-- Outstanding Citys --> */}
				<div className="city-background">
					<div className="c-container">
						<h1>{t('highlightedPlaces')}</h1>
					</div>
					<div className="c-container">
						<div id="outstancity" className="carousel slide">
							<div className="carousel-inner">
								<div className="carousel-item active">
									<div className="row">
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/HoChiMinh_v2.jpg"
														/>
													</div>
													<p>{t('cities.hoChiMinh')}</p>
												</a>
											</div>
										</div>
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/HaNoi_v2.jpg"
														/>
													</div>
													<p>{t('cities.haNoi')}</p>
												</a>
											</div>
										</div>
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/DaLat_v2.jpg"
														/>
													</div>
													<p>{t('cities.daLat')}</p>
												</a>
											</div>
										</div>
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/VungTau_v2.jpg"
														/>
													</div>
													<p>{t('cities.vungTau')}</p>
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="carousel-item">
									<div className="row">
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/DaNang_v2.jpg"
														/>
													</div>
													<p>{t('cities.daNang')}</p>
												</a>
											</div>
										</div>
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/QuyNhon_v2.jpg"
														/>
													</div>
													<p>{t('cities.quyNhon')}</p>
												</a>
											</div>
										</div>
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/NhaTrang_v2.jpg"
														/>
													</div>
													<p>{t('cities.nhaTrang')}</p>
												</a>
											</div>
										</div>
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/BinhDuong_v2.jpg"
														/>
													</div>
													<p>{t('cities.binhDuong')}</p>
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="carousel-item">
									<div className="row">
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/CanTho_v2.jpg"
														/>
													</div>
													<p>{t('cities.canTho')}</p>
												</a>
											</div>
										</div>
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/PhuQuoc_v2.jpg"
														/>
													</div>
													<p>{t('cities.phuQuoc')}</p>
												</a>
											</div>
										</div>
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/HaiPhong_v2.jpg"
														/>
													</div>
													<p>{t('cities.haiPhong')}</p>
												</a>
											</div>
										</div>
										<div
											className="col-sm-3 col-lg-3 col-xs-3"
											style={{ padding: "0px 10px" }}
										>
											<div className="city-item">
												<a href="">
													<div className="city-item-img">
														<img
															className="city-img"
															alt=""
															src="https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/HoChiMinh_v2.jpg"
														/>
													</div>
													<p>{t('cities.hoChiMinh')}</p>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<button
								className="carousel-control-prev"
								type="button"
								data-bs-target="#outstancity"
								data-bs-slide="prev"
							>
								<span
									className="carousel-control-prev-icon"
									aria-hidden="true"
								></span>
								<span className="visually-hidden">
									Previous
								</span>
							</button>
							<button
								className="carousel-control-next"
								type="button"
								data-bs-target="#outstancity"
								data-bs-slide="next"
							>
								<span
									className="carousel-control-next-icon"
									aria-hidden="true"
								></span>
								<span className="visually-hidden">Next</span>
							</button>
						</div>
					</div>
				</div>

				<div className="advantage-background">
					<div className="c-container">
						<h1>{t('advantagesTitle')}</h1>
						<h4>{t('advantagesSubtitle')}</h4>
						<div className="advan-container">
							<div className="advan-item">
								<div className="advan-item-img">
									<img
										alt=""
										src="https://www.mioto.vn/static/media/thue_xe_co_tai_xe.a6f7dc54.svg"
									/>
								</div>
								<h5>{t('advantage1Title')}</h5>
								<p>{t('advantage1Desc')}</p>
							</div>
							<div className="advan-item">
								<div className="advan-item-img">
									<img
										alt=""
										src="https://www.mioto.vn/static/media/dich_vu_thue_xe_tu_lai_hanoi.f177339e.svg"
									/>
								</div>
								<h5>{t('advantage2Title')}</h5>
								<p>{t('advantage2Desc')}</p>
							</div>
							<div className="advan-item">
								<div className="advan-item-img">
									<img
										alt=""
										src="https://www.mioto.vn/static/media/cho_thue_xe_tu_lai_tphcm.1e7cb1c7.svg"
									/>
								</div>
								<h5>{t('advantage3Title')}</h5>
								<p>{t('advantage3Desc')}</p>
							</div>
							<div className="advan-item">
								<div className="advan-item-img">
									<img
										alt=""
										src="https://www.mioto.vn/static/media/cho_thue_xe_tu_lai_hanoi.735438af.svg"
									/>
								</div>
								<h5>{t('advantage4Title')}</h5>
								<p>{t('advantage4Desc')}</p>
							</div>
							<div className="advan-item">
								<div className="advan-item-img">
									<img
										alt=""
										src="https://www.mioto.vn/static/media/thue_xe_tu_lai_gia_re_hcm.ffd1319e.svg"
									/>
								</div>
								<h5>{t('advantage5Title')}</h5>
								<p>{t('advantage5Desc')}</p>
							</div>
							<div className="advan-item">
								<div className="advan-item-img">
									<img
										alt=""
										src="https://www.mioto.vn/static/media/thue_xe_tu_lai_gia_re_hanoi.4035317e.svg"
									/>
								</div>
								<h5>{t('advantage6Title')}</h5>
								<p>{t('advantage6Desc')}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="service-background">
					<div className="c-container">
						<h1>{t('servicesTitle')}</h1>
						<div className="service-container">
							<div className="service-item-left">
								<div className="service-item-img">
									<img alt="" src="../img/service-bg-1.png" />
									<div className="service-content">
										<h3>{t('service1Title')}</h3>
										<p>{t('service1Desc')}</p>
										<a className="btn btn-success btn-service">{t('service1Btn')}</a>
									</div>
								</div>
							</div>
							<div className="service-item-right">
								<div className="service-item-img">
									<img alt="" src="../img/service-bg-2.png" />
									<div className="service-content-right">
										<h3>{t('service2Title')}</h3>
										<p>{t('service2Desc')}</p>
										<a className="btn btn-success btn-service">{t('service2Btn')}</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="tutor-background">
					<div className="c-container">
						<h1>{t('tutorTitle')}</h1>
						<h4>{t('tutorSubtitle')}</h4>
						<div className="tutor-container">
							<div className="tutor-item">
								<div className="tutor-item-img">
									<img alt="" src="../img/tutor1.png" />
								</div>
								<div className="tutor-item-content">
									<h5 className="content-text">01</h5>
									<h5>{t('tutorStep1')}</h5>
								</div>
							</div>
							<div className="tutor-item">
								<div className="tutor-item-img">
									<img alt="" src="../img/tutor2.png" />
								</div>
								<div className="tutor-item-content">
									<h5 className="content-text">02</h5>
									<h5>{t('tutorStep2')}</h5>
								</div>
							</div>
							<div className="tutor-item">
								<div className="tutor-item-img">
									<img alt="" src="../img/tutor3.png" />
								</div>
								<div className="tutor-item-content">
									<h5 className="content-text">03</h5>
									<h5>{t('tutorStep3')}</h5>
								</div>
							</div>
							<div className="tutor-item">
								<div className="tutor-item-img">
									<img alt="" src="../img/tutor4.png" />
								</div>
								<div className="tutor-item-content">
									<h5 className="content-text">04</h5>
									<h5>{t('tutorStep4')}</h5>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="insurance-background">
					<div className="c-container">
						<h1>{t('insuranceTitle')}</h1>
					</div>
					<div className="c-container">
						<div className="insurance-container">
							<div className="insurance-item">
								<img alt="" src="../img/mic.jpg" />
							</div>
							<div className="insurance-item">
								<img alt="" src="../img/vni.jpg" />
							</div>
							<div className="insurance-item">
								<img alt="" src="../img/pvi.jpg" />
							</div>
							<div className="insurance-item">
								<img alt="" src="../img/global-care.jpg" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<Login />
			<Register />
			<Footer />
			<ToastContainer />
		</div>
	);
}

export default CustomerIndex;
