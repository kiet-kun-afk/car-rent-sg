import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "./layout/common/header";
import Footer from "./layout/common/footer";

import Login from "./layout/Login/login";
import Register from "./layout/Login/register";

import "../style/styleCar.css";

function CustomerIndex() {
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
							<h1>CarrentSG - Bên Bạn Đến Mọi Hành Trình</h1>
							<div className="white-line"></div>
							<h6>
								Trải nghiệm sự khác biệt từ{" "}
								<span style={{ color: "#009966" }}>
									hơn 2000
								</span>{" "}
								xe gia đình đời mới khắp Việt Nam
							</h6>
						</div>
					</div>
				</div>

				<div className="car-background">
					<div className="c-container">
						<h1>Xe Dành Cho Bạn</h1>
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
														src={`../img/${car.frontImage}`}
													/>
												</div>
												<span className="car-note">
													{" "}
													<span className="c-note">
														{" "}
														Đặt Xe Nhanh
														<i
															className="fa-solid fa-bolt"
															style={{
																color: "yellow",
															}}
														></i>
													</span>{" "}
													<span className="c-note">
														Miễn Thế Chấp{" "}
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
														src="../img/avatar-4.png"
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
						<h1>Địa Điểm Nổi Bật</h1>
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
															src="../img/HoChiMinh.jpg"
														/>
													</div>
													<p>TP. HỒ CHÍ MINH</p>
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
															src="../img/HaNoi.jpg"
														/>
													</div>
													<p>HÀ NỘI</p>
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
															src="../img/DaLat.jpg"
														/>
													</div>
													<p>ĐÀ LẠT</p>
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
															src="../img/VungTau.jpg"
														/>
													</div>
													<p>VŨNG TÀU</p>
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
															src="../img/DaNang.jpg"
														/>
													</div>
													<p>ĐÀ NẴNG</p>
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
															src="../img/QuyNhon.jpg"
														/>
													</div>
													<p>QUY NHƠN</p>
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
															src="../img/NhaTrang.jpg"
														/>
													</div>
													<p>NHA TRANG</p>
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
															src="../img/BinhDuong.jpg"
														/>
													</div>
													<p>BÌNH DƯƠNG</p>
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
															src="../img/CanTho.jpg"
														/>
													</div>
													<p>CẦN THƠ</p>
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
															src="../img/PhuQuoc.jpg"
														/>
													</div>
													<p>PHÚ QUỐC</p>
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
															src="../img/HaiPhong.jpg"
														/>
													</div>
													<p>HẢI PHÒNG</p>
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
															src="../img/HoChiMinh.jpg"
														/>
													</div>
													<p>TP. HỒ CHÍ MINH</p>
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
						<h1>Ưu Điểm Của CarRentSG</h1>
						<h4>
							Những tính năng giúp bạn dễ dàng hơn khi thuê xe
							trên CarRentSG
						</h4>
						<div className="advan-container">
							<div className="advan-item">
								<div className="advan-item-img">
									<img alt="" src="../img/advan1.png" />
								</div>
								<h5>Lái Xe An Toàn Cùng CarRentSG</h5>
								<p>
									Chuyến đi trên CarRentSG được bảo vệ với Gói
									bảo hiểm thuê xe tự lái từ MIC & VNI. <br />{" "}
									Khách thuê sẽ chỉ bồi thường tối đa
									2,000,000VNĐ trong trường hợp có sự cố ngoài
									ý muốn.
								</p>
							</div>
							<div className="advan-item">
								<div className="advan-item-img">
									<img alt="" src="../img/advan2.png" />
								</div>
								<h5>An Tâm Đặt Xe</h5>
								<p>
									Không tính phí huỷ chuyến trong vòng 1h sau
									khi đặt cọc. Hoàn cọc và bồi thường 100% nếu
									chủ xe huỷ chuyến trong vòng 7 ngày trước
									chuyến đi.
								</p>
							</div>
							<div className="advan-item">
								<div className="advan-item-img">
									<img alt="" src="../img/advan3.png" />
								</div>
								<h5>Thủ Tục Đơn Giản</h5>
								<p>
									Chỉ cần có CCCD gắn chip (Hoặc Passport) &
									Giấy phép lái xe là bạn đã đủ điều kiện thuê
									xe trên CarRentSG.
								</p>
							</div>
							<div className="advan-item">
								<div className="advan-item-img">
									<img alt="" src="../img/advan4.png" />
								</div>
								<h5>Thanh Toán Dễ Dàng</h5>
								<p>
									Đa dạng hình thức thanh toán: ATM, thẻ Visa
									& Ví điện tử (Momo, VnPay, ZaloPay).
								</p>
							</div>
							<div className="advan-item">
								<div className="advan-item-img">
									<img alt="" src="../img/advan5.png" />
								</div>
								<h5>Giao Xe Tận Nơi</h5>
								<p>
									Bạn có thể lựa chọn giao xe tận nhà/sân
									bay... Phí tiết kiệm chỉ từ 15k/km.
								</p>
							</div>
							<div className="advan-item">
								<div className="advan-item-img">
									<img alt="" src="../img/advan6.png" />
								</div>
								<h5>Đa Dạng Dòng Xe</h5>
								<p>
									Hơn 100 dòng xe cho bạn tuỳ ý lựa chọn:
									Mini, Sedan, CUV, SUV, MPV, Bán tải.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="service-background">
					<div className="c-container">
						<h1>Dịch Vụ Của CarR</h1>
						<div className="service-container">
							<div className="service-item-left">
								<div className="service-item-img">
									<img alt="" src="../img/service-bg-1.png" />
									<div className="service-content">
										<h3>
											Xe đã sẵn sàng. <br /> Bắt đầu hành
											trình ngay!
										</h3>
										<p>
											Tự tay cầm lái chiếc xe mà bạn yêu
											thích <br /> cho hành trình thêm
											phấn khởi.
										</p>
										<a className="btn btn-success btn-service">
											Thuê xe tự lái
										</a>
									</div>
								</div>
							</div>
							<div className="service-item-right">
								<div className="service-item-img">
									<img alt="" src="../img/service-bg-2.png" />
									<div className="service-content-right">
										<h3>Tài xế của bạn đã đến!</h3>
										<p>
											Chuyến đi thêm thú vị <br /> cùng
											các bác tài 5* trên CarR.
										</p>
										<a className="btn btn-success btn-service">
											Thuê xe có tài xế
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="tutor-background">
					<div className="c-container">
						<h1>Hướng Dẫn Thuê Xe</h1>
						<h4>
							Chỉ với 4 bước đơn giản để trải nghiệm thuê xe với
							CarR một cách nhanh chóng
						</h4>
						<div className="tutor-container">
							<div className="tutor-item">
								<div className="tutor-item-img">
									<img alt="" src="../img/tutor1.png" />
								</div>
								<div className="tutor-item-content">
									<h5 className="content-text">01</h5>
									<h5>
										Đặt xe trên <br /> web CarR
									</h5>
								</div>
							</div>
							<div className="tutor-item">
								<div className="tutor-item-img">
									<img alt="" src="../img/tutor2.png" />
								</div>
								<div className="tutor-item-content">
									<h5 className="content-text">02</h5>
									<h5>Nhận Xe</h5>
								</div>
							</div>
							<div className="tutor-item">
								<div className="tutor-item-img">
									<img alt="" src="../img/tutor3.png" />
								</div>
								<div className="tutor-item-content">
									<h5 className="content-text">03</h5>
									<h5>
										Bắt đầu <br /> hành trình
									</h5>
								</div>
							</div>
							<div className="tutor-item">
								<div className="tutor-item-img">
									<img alt="" src="../img/tutor4.png" />
								</div>
								<div className="tutor-item-content">
									<h5 className="content-text">04</h5>
									<h5>
										Trả xe&kết thúc <br /> chuyến đi
									</h5>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="insurance-background">
					<div className="c-container">
						<h1>Hành Trình Của Bạn Luôn Được Bảo Vệ</h1>
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
		</div>
	);
}

export default CustomerIndex;
