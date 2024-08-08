import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { format, parse } from "date-fns";
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
  const [pieChartData, setPieChartData] = useState({});
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("month");
  const [RecentContract, setRecentContract] = useState([]);
  // Giả sử API trả về danh sách các hợp đồng
  // Bạn có thể tùy chỉnh dữ liệu theo nhu cầu

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
  };

  // Nhóm dữ liệu theo tháng và tổng chi phí thuê
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/contracts/all-status-payments-true"
        );
        const apiData = response.data.data;
        console.log(apiData);

        let formattedData;
        if (filterType === "day") {
          formattedData = apiData.reduce((acc, contract) => {
            const day = format(new Date(contract.endDate), "dd/MM/yyyy");
            if (!acc[day]) {
              acc[day] = 0;
            }
            acc[day] += contract.totalRentCost;
            return acc;
          }, {});

          // Sắp xếp theo thứ tự ngày
          const sortedDays = Object.keys(formattedData).sort(
            (a, b) =>
              parse(a, "dd/MM/yyyy", new Date()) -
              parse(b, "dd/MM/yyyy", new Date())
          );

          formattedData = sortedDays.reduce((acc, day) => {
            acc[day] = formattedData[day];
            return acc;
          }, {});
        } else if (filterType === "week") {
          formattedData = apiData.reduce((acc, contract) => {
            const week = getWeek(new Date(contract.endDate));
            if (!acc[week]) {
              acc[week] = 0;
            }
            acc[week] += contract.totalRentCost;
            return acc;
          }, {});
        } else {
          formattedData = apiData.reduce((acc, contract) => {
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

          // Sắp xếp theo thứ tự tháng
          const sortedMonths = Object.keys(formattedData).sort(
            (a, b) => new Date(a) - new Date(b)
          );

          formattedData = sortedMonths.reduce((acc, month) => {
            acc[month] = formattedData[month];
            return acc;
          }, {});
        }

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

        //biểu đồ cột
        const labels = Object.keys(formattedData);
        const rentCosts = Object.values(formattedData);
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
            {
              label: "Line Dataset",
              data: rentCosts,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 3,
              fill: false,
              type: "line",
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
    LoadListContract();
  }, [filterType]);

  const getWeek = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date -
        firstDayOfYear +
        (firstDayOfYear.getTimezoneOffset() - date.getTimezoneOffset()) *
          60000) /
      86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Theo Dỗi Giao Dịch</h1>
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

        <div className="table-data">
          <div className="order">
            <h3>Biểu Đồ Doanh Thu</h3>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-primary mx-3"
                onClick={() => handleFilterChange("day")}
              >
                Day
              </button>
              <button
                class="btn btn-primary mx-3"
                onClick={() => handleFilterChange("week")}
              >
                Week
              </button>
              <button
                class="btn btn-primary "
                onClick={() => handleFilterChange("month")}
              >
                Month
              </button>
            </div>
            <Bar data={chartData} />
          </div>

          <div className="order ">
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
                {RecentContract.map((recentContract) => (
                  <tr>
                    <td className="w-25">
                      <img
                        className="w-25"
                        src={recentContract.customerImage}
                        alt="Upload Icon"
                      />
                      <p>{recentContract.customerName}</p>
                    </td>
                    <td>{formatDate(recentContract.createDate)}</td>
                    <td className="w-25">
                      <span
                        className={`status ${
                          recentContract.statusPayment ? "completed" : "pending"
                        }`}
                      >
                        {recentContract.statusPayment ? (
                          <span>Thành Công</span>
                        ) : (
                          <span>Chưa Thanh Toán</span>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChartComponent;
