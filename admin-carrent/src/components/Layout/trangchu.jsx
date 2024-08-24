import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	LineElement,
	PointElement,
	LineController,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	LineElement,
	PointElement,
	LineController
);
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
function TrangChu() {
	const [pieChartData, setPieChartData] = useState({});
	const [RecentContract, setRecentContract] = useState([]);
	const [Contracts, setContracts] = useState([]);
	const [filteredContracts, setFilteredContracts] = useState([]);
	const [totalRentCost, setTotalRentCost] = useState(0);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [count, setCount] = useState(0);
	const [countCus, setCountCus] = useState(0);
	const [Top1Car, setTop1Car] = useState(0);
	const [chartData, setChartData] = useState({});
	const [lineChartData, setLineChartData] = useState({});
	const [loading, setLoading] = useState(true);

	const formatDate = (localdatetime) => {
		// Tạo một đối tượng Date từ localdatetime
		const date = new Date(localdatetime);

		// Lấy ra ngày, tháng và năm
		const day = date.getDate();
		const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
		const year = date.getFullYear();

		// Lấy ra giờ, phút và giây
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		// Định dạng lại thành dd/MM/yyyy hh:mm:ss
		const formattedDate = `${day < 10 ? "0" + day : day}/${
			month < 10 ? "0" + month : month
		}/${year} ${hours < 10 ? "0" + hours : hours}:${
			minutes < 10 ? "0" + minutes : minutes
		}:${seconds < 10 ? "0" + seconds : seconds}`;

		return formattedDate;
	};

	const LoadListContract = async () => {
		const response = await axios.get(
			"http://localhost:8080/api/v1/contracts/recent"
		);
		// console.log(response.data);
		setRecentContract(response.data);
		try {
			const result = await axios.get(
				"http://localhost:8080/api/v1/contracts/all-status-payments-true"
			);
			// console.log(result.data.data);

			const contractData = result.data.data;
			setContracts(contractData);
			filterContracts(contractData, startDate, endDate);

			const count = contractData.length;
			setCount(count);

			//đếm tổng khách true
			const resultCountCus = await axios.get(
				"http://localhost:8080/api/v1/customers/count"
			);
			//console.log(resultCountCus.data);
			const countCus = resultCountCus.data;
			setCountCus(countCus);
			//

			// top 1 car
			const resultTopCar = await axios.get(
				"http://localhost:8080/api/v1/contracts/most-rented-car"
			);
			//console.log(resultTopCar.data);
			const Top1Car = resultTopCar.data;
			setTop1Car(Top1Car);

			//
		} catch (error) {
			console.error("Error loading contract list:", error);
			// toast.error("Failed to load contracts!");
		}
	};

	const filterContracts = (contracts, startDate, endDate) => {
		const filtered = contracts.filter((contract) => {
			const contractStartDate = new Date(contract.startDate);
			const contractEndDate = new Date(contract.endDate);
			const start = new Date(startDate);
			const end = new Date(endDate);

			return (
				(!startDate || contractStartDate >= start) &&
				(!endDate || contractEndDate <= end)
			);
		});

		setFilteredContracts(filtered);

		const totalCost = filtered.reduce(
			(acc, contract) => acc + contract.totalRentCost,
			0
		);
		setTotalRentCost(totalCost);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://localhost:8080/api/v1/contracts/all-status-payments-true"
				);
				const apiData = response.data.data;
				// console.log(apiData);

				// Dữ liệu biểu đồ cột
				const monthlyData = apiData.reduce((acc, contract) => {
					const month = new Date(contract.endDate).toLocaleString(
						"default",
						{
							month: "long",
							year: "numeric",
						}
					);
					if (!acc[month]) {
						acc[month] = 0;
					}
					acc[month] += contract.totalRentCost;
					return acc;
				}, {});
				const barLabels = Object.keys(monthlyData);
				const barRentCosts = Object.values(monthlyData);
				const barData = {
					labels: barLabels,
					datasets: [
						{
							label: "Total Rent Cost",
							data: barRentCosts,
							backgroundColor: "rgba(75, 192, 192, 0.6)",
							borderColor: "rgba(75, 192, 192, 1)",
							borderWidth: 1,
						},
					],
				};
				setChartData(barData);
				setLoading(false);

				// Dữ liệu biểu đồ đường
				const lineData = {
					labels: barLabels, // Sử dụng cùng labels với biểu đồ cột
					datasets: [
						{
							label: "Monthly Rent Cost",
							data: barRentCosts,
							fill: false,
							borderColor: "rgba(255, 99, 132, 0.6)",
							tension: 0.1,
						},
					],
				};
				setLineChartData(lineData);

				const pieLabels = apiData.map((item) => item.carName);
				const pieRentCosts = apiData.map((item) => item.totalRentCost);

				const pieData = {
					labels: pieLabels,
					datasets: [
						{
							label: "Total Rent Cost",
							data: pieRentCosts,
							backgroundColor: [
								"rgba(75, 192, 192, 0.6)",
								"rgba(54, 162, 235, 0.6)",
								"rgba(255, 206, 86, 0.6)",
								"rgba(255, 99, 132, 0.6)",
								"rgba(153, 102, 255, 0.6)",
								"rgba(255, 159, 64, 0.6)",
								"rgba(201, 203, 207, 0.6)",
							],
							borderColor: [
								"rgba(75, 192, 192, 1)",
								"rgba(54, 162, 235, 1)",
								"rgba(255, 206, 86, 1)",
								"rgba(255, 99, 132, 1)",
								"rgba(153, 102, 255, 1)",
								"rgba(255, 159, 64, 1)",
								"rgba(201, 203, 207, 1)",
							],
							borderWidth: 1,
							cutout: "50%",
						},
					],
				};

				setPieChartData(pieData);
			} catch (error) {
				console.error("Error fetching the data", error);
			}
		};

		fetchData();
		LoadListContract();
	}, []);
	if (loading) return <div>Loading...</div>;

	return (
		<>
			<main>
				<div className="head-title">
					<div className="left">
						<h1>Trang chủ</h1>
					</div>
					<a href="#" className="btn-download">
						<i className="bx bxs-cloud-download"></i>
						<span className="text">Download PDF</span>
					</a>
				</div>

				<ul className="box-info">
					<li>
						<i className="bx bxs-dollar-circle"></i>
						<span className="text">
							<p>Doanh Thu</p>
							<h3> {formatVND(totalRentCost)} VND</h3>
						</span>
						|
						<span className="text">
							<p>Số lượng</p>
							<h3> {count} </h3>
						</span>
					</li>
					<li>
						<i className="bx bxs-group"></i>
						<span className="text">
							<p>Khách Hàng</p>
							<h3>{countCus}</h3>
						</span>
					</li>
					<li>
						<i className="bx bxs-calendar-check"></i>
						<span className="text">
							<p>Top Car</p>
							<h3>{Top1Car.carName}</h3>
						</span>
						|
						<span className="text">
							<p>Số Lượng Thuê</p>
							<h3>{Top1Car.numContracts}</h3>
						</span>
					</li>
				</ul>
				<div className="table-data">
					<div className="order">
						<Bar data={chartData} />
					</div>

					<div className="todo">
						<Line data={lineChartData} />
					</div>
				</div>
				<div class="row d-flex m-0">
					<div className="table-data flex-nowrap">
						<div class="col-sm-6">
							<div className="order">
								<div className="head">
									<h3>Đơn Hàng Gần Đây</h3>
									<i className="bx bx-search"></i>
									<i className="bx bx-filter"></i>
								</div>
								<table>
									<thead>
										<tr>
											<th>Tài khoản</th>
											<th>Ngày đặt hàng</th>
											<th>Trạng Thái</th>
										</tr>
									</thead>
									<tbody>
										{RecentContract.map(
											(recentContract) => (
												<tr>
													<td className="w-25">
														<img
															className="w-50"
															src={
																recentContract.customerImage
															}
															alt="Upload Icon"
														/>
														<p>
															{
																recentContract.customerName
															}
														</p>
													</td>
													<td>
														{formatDate(
															recentContract.createDate
														)}
													</td>
													<td>
														<span
															className={`status ${
																recentContract.statusPayment
																	? "completed"
																	: "pending"
															}`}
														>
															{recentContract.statusPayment ? (
																<span>
																	Thành Công
																</span>
															) : (
																<span>
																	Chưa Thanh
																	Toán
																</span>
															)}
														</span>
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>
						</div>

						<div class="col-sm-6">
							<div className="todo">
								<Pie data={pieChartData} />
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default TrangChu;
