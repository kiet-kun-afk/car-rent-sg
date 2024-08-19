import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Header from "./common/header";
import Footer from "./common/footer";

import Login from "./Login/login";
import Register from "./Login/register";

import "../../style/styleIndex.css";
import "../../style/styleCar.css";

function CustomerCar() {
	const sedan4 = "https://n1-cstg.mioto.vn/m/vehicle-types/4-mini-v2.png";
	const cuv5 = "https://n1-cstg.mioto.vn/m/vehicle-types/5-suv-v2.png";
	const suv7 = "https://n1-cstg.mioto.vn/m/vehicle-types/7-suv-v2.png";
	const truck = "https://n1-cstg.mioto.vn/m/vehicle-types/pickup-v2.png";
	const minivan = "https://n1-cstg.mioto.vn/m/vehicle-types/7-minivan-v2.png";
	const [cars, setCars] = useState([]);
	const navigate = useNavigate();
	const [currentDay, setCurrentDay] = useState("");
	const [nextDay, setNextDay] = useState("");
	const [brands, setBrands] = useState([]);
	const [categories, setCategories] = useState([]);

	const loadFilter = async () => {
		try {
			const brandsResponse = await axios.get(
				`http://localhost:8080/api/v1/brands`
			);
			const categoriesResponse = await axios.get(
				`http://localhost:8080/api/v1/categories`
			);
			setBrands(brandsResponse.data.data);
			setCategories(categoriesResponse.data.data);
		} catch (err) {
			console.error("Error fetching cars:", err);
		}
	};

	const loadListCar = async (
		category,
		brand,
		transmission,
		fuelType,
		minSeat,
		maxSeat,
		minPrice,
		maxPrice
	) => {
		const categoryR = category ? category : "";
		const brandR = brand ? brand : "";
		const transmissionR = transmission ? transmission : "";
		const fuelTypeR = fuelType ? fuelType : "";
		const minSeatR = minSeat ? minSeat : 2;
		const maxSeatR = maxSeat ? maxSeat : 10;
		const minCost = minPrice ? minPrice * 1000 : 300000;
		const maxCost = maxPrice ? maxPrice * 1000 : 3000000;
		const start = formatDate(date.startDate);
		const end = formatDate(date.endDate);
		try {
			const result = await axios.get(
				`http://localhost:8080/api/v1/cars/filter-car?brandName=${brandR}&transmission=${transmissionR}&fuelType=${fuelTypeR}&minCost=${minCost}&maxCost=${maxCost}&minSeat=${minSeatR}&maxSeat=${maxSeatR}&categoryNames=${categoryR}&startDate=${start}&endDate=${end}`
			);
			setCars(result.data.data);
			console.log("--------------------------------------");
			console.log("->" + categoryR + "<-");
			console.log("->" + brandR + "<-");
			console.log("->" + transmissionR + "<-");
			console.log("->" + fuelTypeR + "<-");
			console.log("->" + minSeatR + "<-");
			console.log("->" + maxSeatR + "<-");
			console.log("->" + minCost + "<-");
			console.log("->" + maxCost + "<-");
			console.log("->" + start + "<-");
			console.log("->" + end + "<-");
			console.log("--------------------------------------");
		} catch (error) {
			console.error("Error fetching cars:", error);
		}
	};

	const formatDate = (date) => {
		if (!date) return "";

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day} ${hours}:${minutes}`;
	};

	const [minPrice, setMinPrice] = useState(300);
	const [maxPrice, setMaxPrice] = useState(3000);
	const [minSeat, setMinSeat] = useState(2);
	const [maxSeat, setMaxSeat] = useState(10);

	const handleChangePrice = (values) => {
		setMinPrice(values[0]);
		setMaxPrice(values[1]);
	};

	const handleChangeSeat = (values) => {
		setMinSeat(values[0]);
		setMaxSeat(values[1]);
	};

	const getCurrentDay = () => {
		const now = new Date();
		// const formattedTime = now.toLocaleTimeString('vi-VN', {
		//   hour: '2-digit',
		//   minute: '2-digit',
		//   second: '2-digit',
		// });
		const formattedDate = now.toLocaleDateString("vi-VN", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
		setCurrentDay(`21:00, ${formattedDate}`);
	};

	const getNextDay = () => {
		const now = new Date();
		now.setDate(now.getDate() + 1); // Thêm 1 ngày vào ngày hiện tại
		const formattedDate = now.toLocaleDateString("vi-VN", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
		setNextDay(`20:00, ${formattedDate}`);
	};

	const [date, setDate] = useState({
		startDate: new Date(),
		endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
		key: "selection",
	});

	const handleChange = (ranges) => {
		setDate(ranges.selection);
		// console.log("New date range selected:", date);
	};

	const getDaysDifference = (start, end) => {
		const differenceInTime = end.getTime() - start.getTime();
		const differenceInDays = differenceInTime / (1000 * 3600 * 24);
		return Math.ceil(differenceInDays) + 1;
	};

	const formatVietnameseDate = (date) => {
		return format(date, "dd/MM/yyyy", { locale: vi });
	};

	const filterDate = () => {
		if (date.startDate && date.endDate) {
			loadListCar(
				category,
				brand,
				transmission,
				fuelType,
				minSeat,
				maxSeat,
				minPrice,
				maxPrice
			);
		} else {
			console.error("Start date or end date is not defined");
		}
	};

	const [category, setCategory] = useState("");
	const [selectedCategory, setSelectedCategory] = useState(null);
	const selectCategory = (category) => {
		setSelectedCategory(category);
		setCategory(category);
	};

	const filterCategory = () => {
		loadListCar(
			category,
			brand,
			transmission,
			fuelType,
			minSeat,
			maxSeat,
			minPrice,
			maxPrice
		);
	};

	const [brand, setBrand] = useState("");

	const selectBrand = (brand) => {
		setBrand(brand);
	};

	const filterBrand = () => {
		loadListCar(
			category,
			brand,
			transmission,
			fuelType,
			minSeat,
			maxSeat,
			minPrice,
			maxPrice
		);
	};

	const [transmission, setTransmission] = useState("");
	const selectTransmission = (transmission) => {
		setTransmission(transmission);
	};
	const filterTransmission = () => {
		loadListCar(
			category,
			brand,
			transmission,
			fuelType,
			minSeat,
			maxSeat,
			minPrice,
			maxPrice
		);
	};
	const [fuelType, setFuelType] = useState("");
	const selectFuelType = (fuelType) => {
		setFuelType(fuelType);
	};

	const filterAdvance = () => {
		loadListCar(
			category,
			brand,
			transmission,
			fuelType,
			minSeat,
			maxSeat,
			minPrice,
			maxPrice
		);
	};

	useEffect(() => {
		loadListCar();
		loadFilter();
		getCurrentDay();
		getNextDay();
		//const intervalId = setInterval(updateCurrentTime, 1000); // Update every second
		//return () => clearInterval(intervalId); // Cleanup on unmount
	}, []);

	const handleCarRegistrationPlate = (e) => {
		const registrationPlate = e.currentTarget.getAttribute("data-id");
		console.log(registrationPlate);
		if (registrationPlate) {
			navigate(`/carrentsg/car/${registrationPlate}`);
		} else {
			alert("registrationPlate wrong");
		}
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

	return (
		<div className="carrent-layout">
			<Header />

			<div className="c-container">
				<div className="row m-0">
					<div className="d-flex justify-content-center grid gap-5 mt-3 mb-3 text-body-secondary">
						<span>
							<i className="fa-solid fa-location-dot fs-5"></i> Hồ
							Chí Minh
						</span>

						<div className="timeCursor">
							<span
								data-bs-toggle="modal"
								data-bs-target="#filterDay"
							>
								<i className="fa-solid fa-calendar-days fs-5"></i>{" "}
								{currentDay} - {nextDay}
							</span>
						</div>
					</div>

					<div className="d-flex justify-content-center grid gap-3 p-0">
						{/* Filter Loai xe */}
						<div>
							<button
								type="button"
								className="btn btn-filter"
								data-bs-toggle="modal"
								data-bs-target="#filterType"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M8.87 15.7197H14.77"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
								<span className="ms-1">Loại xe</span>
							</button>
						</div>

						{/* Filter Hang xe */}
						<div>
							<button
								type="button"
								className="btn btn-filter"
								data-bs-toggle="modal"
								data-bs-target="#filterBrand"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M21.25 11.9998C21.25 14.3198 20.39 16.4598 18.97 18.0698C17.55 19.6998 15.57 20.8298 13.33 21.1398C12.9 21.2098 12.46 21.2398 12 21.2398C11.54 21.2398 11.11 21.2098 10.67 21.1398C8.43 20.8298 6.45 19.6998 5.03 18.0698C3.61 16.4598 2.75 14.3198 2.75 11.9998C2.75 9.67977 3.61 7.53977 5.03 5.92977C6.45 4.29977 8.43 3.16977 10.67 2.85977C11.1 2.78977 11.54 2.75977 12 2.75977C12.46 2.75977 12.89 2.78977 13.33 2.85977C15.57 3.16977 17.55 4.29977 18.97 5.92977C20.39 7.53977 21.25 9.67977 21.25 11.9998Z"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M11.67 21.1496C11.03 20.4796 8 17.1696 8 11.9996C8 6.82961 11.03 3.51961 11.67 2.84961"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M12.33 21.1496C12.97 20.4796 16 17.1696 16 11.9996C16 6.82961 12.97 3.51961 12.33 2.84961"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M2.75 12H21.25"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
								<span className="ms-1">Hãng xe</span>
							</button>
						</div>

						{/* Filter Truyen dong */}
						<div>
							<button
								type="button"
								className="btn btn-filter"
								data-bs-toggle="modal"
								data-bs-target="#filterMechanic"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle
										cx="18"
										cy="6"
										r="1.5"
										stroke="black"
									></circle>
									<circle
										cx="18"
										cy="18"
										r="1.5"
										stroke="black"
									></circle>
									<circle
										cx="12"
										cy="6"
										r="1.5"
										stroke="black"
									></circle>
									<circle
										cx="12"
										cy="18"
										r="1.5"
										stroke="black"
									></circle>
									<circle
										cx="6"
										cy="6"
										r="1.5"
										stroke="black"
									></circle>
									<path
										d="M7.57715 20V16H5.99902C5.69694 16 5.43913 16.054 5.22559 16.1621C5.01074 16.2689 4.84733 16.4206 4.73535 16.6172C4.62207 16.8125 4.56543 17.0423 4.56543 17.3066C4.56543 17.5723 4.62272 17.8008 4.7373 17.9922C4.85189 18.1823 5.0179 18.3281 5.23535 18.4297C5.4515 18.5312 5.71322 18.582 6.02051 18.582H7.07715V17.9023H6.15723C5.99577 17.9023 5.86165 17.8802 5.75488 17.8359C5.64811 17.7917 5.56868 17.7253 5.5166 17.6367C5.46322 17.5482 5.43652 17.4382 5.43652 17.3066C5.43652 17.1738 5.46322 17.0618 5.5166 16.9707C5.56868 16.8796 5.64876 16.8105 5.75684 16.7637C5.86361 16.7155 5.99837 16.6914 6.16113 16.6914H6.73145V20H7.57715ZM5.41699 18.1797L4.42285 20H5.35645L6.3291 18.1797H5.41699Z"
										fill="black"
									></path>
									<path
										d="M18 8V12M18 16V12M12 8V16M6 8V11.5C6 11.7761 6.22386 12 6.5 12H18"
										stroke="black"
										strokeLinecap="round"
									></path>
								</svg>
								<span className="ms-1">Truyền Động</span>
							</button>
						</div>

						{/* Filter All */}
						<div>
							<button
								type="button"
								className="btn btn-filter"
								data-bs-toggle="modal"
								data-bs-target="#filterAll"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12.7932 3.23242H14.1665"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M1.83325 3.23242H10.0532"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M11.4266 4.59305C12.185 4.59305 12.7999 3.98415 12.7999 3.23305C12.7999 2.48194 12.185 1.87305 11.4266 1.87305C10.6681 1.87305 10.0532 2.48194 10.0532 3.23305C10.0532 3.98415 10.6681 4.59305 11.4266 4.59305Z"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M12.7932 12.7656H14.1665"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M1.83325 12.7656H10.0532"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M11.4266 14.1263C12.185 14.1263 12.7999 13.5174 12.7999 12.7663C12.7999 12.0151 12.185 11.4062 11.4266 11.4062C10.6681 11.4062 10.0532 12.0151 10.0532 12.7663C10.0532 13.5174 10.6681 14.1263 11.4266 14.1263Z"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M5.94653 8H14.1665"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M1.83325 8H3.20658"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M4.57328 9.36063C5.33175 9.36063 5.94664 8.75173 5.94664 8.00063C5.94664 7.24952 5.33175 6.64062 4.57328 6.64062C3.81481 6.64062 3.19995 7.24952 3.19995 8.00063C3.19995 8.75173 3.81481 9.36063 4.57328 9.36063Z"
										stroke="black"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
								<span className="ms-1">Bộ lọc</span>
							</button>
						</div>
						<div>
							<button
								type="button"
								className="btn btn-filter"
								onClick={() => {
									loadListCar();
									setSelectedCategory(null);
									setBrand("");
									setMinPrice(300);
									setMaxPrice(3000);
									setMinSeat(2);
									setMaxSeat(10);
									setTransmission("");
									setFuelType("");
								}}
							>
								<span className="ms-1">Tất cả</span>
							</button>
						</div>
					</div>
				</div>
				<div className="row m-0">
					{cars.length > 0 ? (
						cars.map((car) => (
							<div
								className="col-sm-3 col-md-3 col-lg-3"
								style={{ padding: "12px 12px" }}
							>
								<a
									className="car-item"
									href="#"
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
													src="https://n1-cstg.mioto.vn/m/avatars/avatar-3.png"
												/>
											</div>
											{/* <span className="car-discount">
											Giảm 10%
										</span> */}
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
						))
					) : (
						<div className="d-flex justify-content-center">
							<div>
								<img
									src="https://www.mioto.vn/static/media/empty-mycar.e023e681.svg"
									alt=""
									srcset=""
								/>
								<div>
									<p>
										Không có xe phù hợp với tìm kiếm của
										bạn, vui lòng thử lại
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Modal filterDay */}
				<div
					className="modal fade"
					id="filterDay"
					tabIndex="-1"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div
						className="modal-dialog modal-dialog-centered"
						style={{ minWidth: "600px" }}
					>
						<div className="modal-content text-center p-0">
							<div className="modal-header flex-column m-0">
								<button
									type="button"
									className="btn-close ms-auto"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
								<div className="row justify-content-center m-0">
									<h1
										className="modal-title fs-3"
										id="exampleModalLabel"
									>
										Thời gian
									</h1>
								</div>
							</div>
							<div className="modal-body p-0">
								<div className="form-item">
									<div className="content">
										<div className="date-container">
											<DateRangePicker
												className="dateRange"
												ranges={[date]}
												onChange={handleChange}
												minDate={new Date()}
											/>
										</div>
										<div className="row m-0 text-start">
											<span>
												{`${formatVietnameseDate(
													date.startDate
												)} - ${formatVietnameseDate(
													date.endDate
												)}`}
											</span>
											<span>
												Số ngày thuê: &nbsp;
												<strong>
													{`${getDaysDifference(
														date.startDate,
														date.endDate
													)}`}
												</strong>{" "}
												ngày
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary w-100"
									onClick={() => filterDate()}
								>
									Áp dụng
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Modal filterType */}
				<div
					className="modal fade"
					id="filterType"
					tabIndex="-1"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div
						className="modal-dialog modal-dialog-centered"
						style={{ minWidth: "600px" }}
					>
						<div className="modal-content text-center p-0">
							<div className="modal-header flex-column m-0">
								<button
									type="button"
									className="btn-close ms-auto"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
								<div className="row justify-content-center m-0">
									<h1
										className="modal-title fs-3"
										id="exampleModalLabel"
									>
										Loại xe
									</h1>
								</div>
							</div>
							<div className="modal-body p-0">
								<div className="form-item">
									<div className="content">
										<div className="row m-0">
											{categories.map((category) => (
												<div className="col-sm-3 mt-1 mb-1">
													<div
														className={`card card-style ${
															selectedCategory ===
															category.categoryName
																? "card-clicked"
																: ""
														}`}
														style={{
															width: "8rem",
														}}
														onClick={() =>
															selectCategory(
																category.categoryName
															)
														}
													>
														<img
															src={
																category.categoryImage
															}
															className="img-fluid card-img-top m-auto"
															style={{
																width: "70px",
																height: "auto",
															}}
														/>
														<div className="card-body p-0">
															<p className="card-text mb-3">
																{
																	category.categoryName
																}
															</p>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-outline-dark"
									data-bs-dismiss="modal"
									onClick={() => {
										setCategory("");
										filterCategory();
									}}
								>
									Xóa
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => filterCategory()}
								>
									Áp dụng
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Modal filterBrand */}
				<div
					className="modal fade"
					id="filterBrand"
					tabIndex="-1"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div
						className="modal-dialog modal-dialog-centered"
						style={{ minWidth: "600px" }}
					>
						<div className="modal-content text-center p-0">
							<div className="modal-header flex-column m-0">
								<button
									type="button"
									className="btn-close ms-auto"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
								<div className="row justify-content-center m-0">
									<h1
										className="modal-title fs-3"
										id="exampleModalLabel"
									>
										Hãng xe
									</h1>
								</div>
							</div>
							<div className="modal-body p-0">
								<div className="form-item">
									<div className="content">
										<div className="row m-0">
											<div className="d-flex flex-wrap">
												<div className="custom-radio-brand mb-3">
													<div
														className="form-check"
														onClick={() => {
															selectBrand("");
														}}
													>
														<input
															className="form-check-input"
															type="radio"
															name="flexRadioDefault"
															id="rdoAll"
														/>
														<label
															className="form-check-label"
															htmlFor="rdoAll"
														>
															<p>Tất cả</p>
														</label>
													</div>
												</div>
												{brands.map((brand) => (
													<div className="custom-radio-brand mb-3">
														<div
															className="form-check"
															onClick={() =>
																selectBrand(
																	brand.brandName
																)
															}
														>
															<input
																className="form-check-input"
																type="radio"
																name="flexRadioDefault"
																id={`${brand.brandName}`}
															/>
															<label
																className="form-check-label"
																htmlFor={`${brand.brandName}`}
															>
																<img
																	loading="lazy"
																	src={`${brand.brandImage}`}
																	alt={`${brand.brandName}`}
																/>
																<p>
																	{
																		brand.brandName
																	}
																</p>
																<p>
																	(
																	{
																		brand.carsCount
																	}{" "}
																	xe)
																</p>
															</label>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary w-100"
									onClick={() => filterBrand()}
								>
									Áp dụng
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Modal filterMechanic */}
				<div
					className="modal fade"
					id="filterMechanic"
					tabIndex="-1"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content text-center p-0">
							<div className="modal-header flex-column m-0">
								<button
									type="button"
									className="btn-close ms-auto"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
								<div className="row justify-content-center m-0">
									<h1
										className="modal-title fs-3"
										id="exampleModalLabel"
									>
										Truyền động
									</h1>
								</div>
							</div>
							<div className="modal-body p-0">
								<div className="form-item">
									<div className="content">
										<div className="row m-0">
											<div className="d-flex flex-wrap">
												<div className="custom-radio-brand mb-3">
													<div
														className="form-check"
														onClick={() =>
															selectTransmission(
																""
															)
														}
													>
														<input
															className="form-check-input"
															type="radio"
															name="flexRadioDefault"
															id="all-transmission"
														/>
														<label
															className="form-check-label"
															htmlFor="all-transmission"
														>
															<p>Tất cả</p>
														</label>
													</div>
												</div>
												<div className="custom-radio-brand mb-3">
													<div
														className="form-check"
														onClick={() =>
															selectTransmission(
																"số tự động"
															)
														}
													>
														<input
															className="form-check-input"
															type="radio"
															name="flexRadioDefault"
															id="auto-trans"
														/>
														<label
															className="form-check-label"
															htmlFor="auto-trans"
														>
															<p>Số tự động</p>
														</label>
													</div>
												</div>
												<div className="custom-radio-brand mb-3">
													<div
														className="form-check"
														onClick={() =>
															selectTransmission(
																"số sàn"
															)
														}
													>
														<input
															className="form-check-input"
															type="radio"
															name="flexRadioDefault"
															id="handle"
														/>
														<label
															className="form-check-label"
															htmlFor="handle"
														>
															<p>Số sàn</p>
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary w-100"
									onClick={() => filterTransmission()}
								>
									Áp dụng
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Modal filterAll */}
				<div
					className="modal fade"
					id="filterAll"
					tabIndex="-1"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div
						className="modal-dialog modal-dialog-centered"
						style={{ minWidth: "600px" }}
					>
						<div className="modal-content text-center p-0">
							<div className="modal-header flex-column m-0">
								<button
									type="button"
									className="btn-close ms-auto"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
								<div className="row justify-content-center m-0">
									<h1
										className="modal-title fs-3"
										id="exampleModalLabel"
									>
										Bộ lọc nâng cao
									</h1>
								</div>
							</div>
							<div className="modal-body p-0">
								<div className="form-item">
									<div className="content">
										{/* Mức giá */}
										<div className="row m-0 pb-3">
											{/* <div className="price-range-slider">
                        <h3>Mức giá</h3>
                        <Slider
                          range
                          min={300}
                          max={3000}
                          defaultValue={[300, 3000]}
                          onChange={handleChangePrice}
                          trackStyle={[{ backgroundColor: "green" }]}
                          handleStyle={[
                            { borderColor: "green" },
                            { borderColor: "green" },
                          ]}
                          railStyle={{ backgroundColor: "#e0e0e0" }}
                        />
                        <div className="price-inputs">
                          <div className="price-input">
                            <label>Giá thấp nhất</label>
                            <input
                              type="text"
                              value={`${minPrice}K`}
                              readOnly
                            />
                          </div>
                          <div className="separator">-</div>
                          <div className="price-input">
                            <label>Giá cao nhất</label>
                            <input
                              type="text"
                              value={`${maxPrice}K`}
                              readOnly
                            />
                          </div>
                        </div>
                      </div> */}
											<h6 className="text-start">
												Mức giá
											</h6>
											<Slider
												range
												min={300}
												max={3000}
												defaultValue={[300, 3000]}
												onChange={handleChangePrice}
												trackStyle={[
													{
														backgroundColor:
															"green",
													},
												]}
												handleStyle={[
													{ borderColor: "green" },
													{ borderColor: "green" },
												]}
												railStyle={{
													backgroundColor: "#e0e0e0",
												}}
											/>
											<div className="col-sm-5 p-0">
												<div className="mt-3">
													<label
														for="priceMin"
														class="form-label"
													>
														Giá thấp nhất
													</label>
													<input
														type="text"
														class="form-control"
														id="priceMin"
														value={`${minPrice}K`}
														readOnly
													/>
												</div>
											</div>
											<div className="col-sm-2 p-0 m-auto">
												<div className="mt-3">
													<div className="line m-auto"></div>
												</div>
											</div>
											<div className="col-sm-5 p-0">
												<div className="mt-3">
													<label
														for="priceMax"
														class="form-label"
													>
														Giá cao nhất
													</label>
													<input
														type="text"
														class="form-control"
														id="priceMax"
														value={`${maxPrice}K`}
														readOnly
													/>
												</div>
											</div>
										</div>

										{/* Số chỗ */}
										<div className="row m-0 pb-3">
											<h6 className="text-start">
												Số chỗ
											</h6>
											<Slider
												range
												min={2}
												max={10}
												defaultValue={[2, 10]}
												onChange={handleChangeSeat}
												trackStyle={[
													{
														backgroundColor:
															"green",
													},
												]}
												handleStyle={[
													{ borderColor: "green" },
													{ borderColor: "green" },
												]}
												railStyle={{
													backgroundColor: "#e0e0e0",
												}}
											/>
											<div className="col-sm-5 p-0">
												<div className="mt-3">
													<label
														for="minSeat"
														class="form-label"
													>
														Tối thiểu
													</label>
													<input
														type="text"
														class="form-control"
														id="minSeat"
														value={`${minSeat} chỗ`}
														readOnly
													/>
												</div>
											</div>
											<div className="col-sm-2 p-0 m-auto">
												<div className="mt-3">
													<div className="line m-auto"></div>
												</div>
											</div>
											<div className="col-sm-5 p-0">
												<div className="mt-3">
													<label
														for="maxSeat"
														class="form-label"
													>
														Tối đa
													</label>
													<input
														type="text"
														class="form-control"
														id="maxSeat"
														value={`${maxSeat} chỗ`}
														readOnly
													/>
												</div>
											</div>
										</div>

										{/* Nhiên liệu */}
										<div className="row m-0 pb-3">
											<h6 className="text-start">
												Nhiên liệu
											</h6>
											<div class="d-flex flex-wrap p-0 mt-2 mb-2">
												<div className="custom-radio-fuel">
													<div
														className="form-check"
														onClick={() =>
															selectFuelType("")
														}
													>
														<input
															className="form-check-input"
															type="radio"
															name="form-check-input"
															id="all"
														/>
														<label
															className="form-check-label"
															htmlFor="all"
														>
															<p>Tất cả</p>
														</label>
													</div>
												</div>
												<div className="custom-radio-fuel">
													<div
														className="form-check"
														onClick={() =>
															selectFuelType(
																"điện"
															)
														}
													>
														<input
															className="form-check-input"
															type="radio"
															name="form-check-input"
															id="electro"
														/>
														<label
															className="form-check-label"
															htmlFor="electro"
														>
															<p>Điện</p>
														</label>
													</div>
												</div>
												<div className="custom-radio-fuel">
													<div
														className="form-check"
														onClick={() =>
															selectFuelType(
																"xăng"
															)
														}
													>
														<input
															className="form-check-input"
															type="radio"
															name="form-check-input"
															id="fuel"
														/>
														<label
															className="form-check-label"
															htmlFor="fuel"
														>
															<p>Xăng</p>
														</label>
													</div>
												</div>
												<div className="custom-radio-fuel">
													<div
														className="form-check"
														onClick={() =>
															selectFuelType(
																"dầu diesel"
															)
														}
													>
														<input
															className="form-check-input"
															type="radio"
															name="form-check-input"
															id="diesel"
														/>
														<label
															className="form-check-label"
															htmlFor="diesel"
														>
															<p>Dầu Diesel</p>
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="row m-0"></div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-outline-dark"
									data-bs-dismiss="modal"
									onClick={() => {
										setMinPrice(300);
										setMaxPrice(3000);
										setMinSeat(2);
										setMaxSeat(10);
										setFuelType("");
										filterAdvance();
									}}
								>
									Xóa
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => {
										filterAdvance();
									}}
								>
									Áp dụng
								</button>
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

export default CustomerCar;
