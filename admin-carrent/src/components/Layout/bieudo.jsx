import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartComponent = () => {
  const [chartData, setChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});
  const [loading, setLoading] = useState(true);
  // Giả sử API trả về danh sách các hợp đồng
  // Bạn có thể tùy chỉnh dữ liệu theo nhu cầu

  // Nhóm dữ liệu theo tháng và tổng chi phí thuê
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/contracts/all-statusPayments-true"
        );
        const apiData = response.data.data;
        console.log(apiData);

        // dữ liệu biểu đồ cột
        const monthlyData = apiData.reduce((acc, contract) => {
          const month = new Date(contract.endDate).toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
          if (!acc[month]) {
            acc[month] = 0;
          }
          acc[month] += contract.totalRentCost;
          return acc;
        }, {});
        const labels = Object.keys(monthlyData);
        const rentCosts = Object.values(monthlyData);
        const data = {
          labels: labels,
          datasets: [
            {
              label: "Total Rent Cost",
              data: rentCosts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };
        setChartData(data);
        setLoading(false);

        // Dữ liệu biểu đồ tròn
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
  }, []);
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Biểu Đồ</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Biểu Đồ
                </a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <i className="bx bxs-cloud-download"></i>
            <span className="text">Download PDF</span>
          </a>
        </div>

        {/* <ul className="box-info">
          <li>
            <i className="bx bxs-calendar-check"></i>
            <span className="text">
              <h3>7979</h3>
              <p>Đơn Hàng Mới</p>
            </span>
          </li>
          <li>
            <i className="bx bxs-group"></i>
            <span className="text">
              <h3>2024</h3>
              <p>Khách Hàng</p>
            </span>
          </li>
          <li>
            <i className="bx bxs-dollar-circle"></i>
            <span className="text">
              <h3>1.000.000</h3>
              <p>Doanh Thu</p>
            </span>
          </li>
        </ul> */}

        <div className="table-data">
          <div className="order">
            <Bar data={chartData} />
          </div>

          <div className="todo">
            <Pie data={pieChartData} />
          </div>
        </div>
      </main>
    </>
  );
};

export default ChartComponent;
