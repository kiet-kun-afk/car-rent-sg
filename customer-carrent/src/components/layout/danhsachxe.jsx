import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "./common/header";
import Footer from "./common/footer";

import Login from "./Login/login";
import Register from "./Login/register";

import "../../style/styleIndex.css";

function CustomerCar() {
	const [cars, setCars] = useState([]);
	const navigate = useNavigate();

	const loadListCar = async () => {
		const result = await axios.get(
			"http://localhost:8080/api/v1/cars/index?pageNumber=0&pageSize=20"
		);
		setCars(result.data.data);
	};

	useEffect(() => {
		loadListCar();
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
		<div class="carrent-layout">
			<Header />
			<div class="c-container">
				<div class="row">
					{cars.map((car) => (
						<div
							class="col-sm-3 col-md-3 col-lg-3"
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
													style={{ color: "yellow" }}
												></i>
											</span>{" "}
											<span className="c-note">
												Miễn Thế Chấp{" "}
												<i
													className="fa-solid fa-lock-open"
													style={{ color: "green" }}
												></i>
											</span>
										</span>
										<div className="car-avatar">
											<img
												alt=""
												src="../img/avatar-4.png"
											/>
										</div>
										<span className="car-discount">
											Giảm 10%
										</span>
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
			<Login />
			<Register />
			<Footer />
		</div>
	);
}

export default CustomerCar;
