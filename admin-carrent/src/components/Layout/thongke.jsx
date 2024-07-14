import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
function ThongKe() {
  const [Contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [totalRentCost, setTotalRentCost] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState(0);
  const [countCus, setCountCus] = useState(0);
  const [Top1Car, setTop1Car] = useState(0);

  const LoadListContract = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/contracts/all-statusPayments-true"
      );
      console.log(result.data.data);

      const contractData = result.data.data;
      setContracts(contractData);
      filterContracts(contractData, startDate, endDate);

      const count = contractData.length;
      setCount(count);

      //đếm tổng khách true
      const resultCountCus = await axios.get(
        "http://localhost:8080/api/v1/customers/count"
      );
      console.log(resultCountCus.data);
      const countCus = resultCountCus.data;
      setCountCus(countCus);
      //

      // top 1 car
      const resultTopCar = await axios.get(
        "http://localhost:8080/api/v1/contracts/most-rented-car"
      );
      console.log(resultTopCar.data);
      const Top1Car = resultTopCar.data;
      setTop1Car(Top1Car);

      //
    } catch (error) {
      console.error("Error loading contract list:", error);
      toast.error("Failed to load contracts!");
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

  // định dạng ngày
  const formatDate = (localdatetime) => {
    // Tạo một đối tượng Date từ localdatetime
    const date = new Date(localdatetime);

    // Lấy ra ngày, tháng và năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Định dạng lại thành dd/MM/yyyy
    const formattedDate = `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;

    return formattedDate;
  };

  useEffect(() => {
    LoadListContract();
  }, []);

  useEffect(() => {
    filterContracts(Contracts, startDate, endDate);
  }, [startDate, endDate, Contracts]);

  // test xuất excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredContracts.map((contract, index) => ({
        STT: index + 1,
        "Thời gian": formatDate(contract.createDate),
        "Tên Khách Hàng": contract.customerName,
        "Số Điện Thoại Khách Hàng": contract.customerPhone,
        "Loại Giao Dịch": contract.wayToPay,
        "Thông Tin Xe": `${contract.carName} - ${contract.carRegistrationPlate}`,
        "Ngày Bắt Đầu": formatDate(contract.startDate),
        "Ngày Kết Thúc": formatDate(contract.endDate),
        "Giá thuê": formatVND(contract.rentCost),
        "Số Ngày Thuê": contract.numberDay,
        "Tiền Cọc": formatVND(contract.deposit),
        "Tổng Tiền": formatVND(contract.totalRentCost),
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contracts");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Contracts.xlsx");
  };

  return (
    <>
      <ToastContainer />
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Thống Kê</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Thống kê
                </a>
              </li>
            </ul>
          </div>
          <button onClick={exportToExcel} href="#" className="btn-download">
            <i className="bx bxs-cloud-download"></i>
            <span className="text">Xuất File Excel</span>
          </button>
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
            <div className="head">
              <h3>Thông Kê Doanh Thu</h3>

              <input
                className="form-control  w-25"
                type="date"
                id="startdate"
                value={startDate}
                placeholder="Ngày bắt đầu "
                onChange={(e) => setStartDate(e.target.value)}
              />

              <input
                className="form-control  w-25"
                type="date"
                id="enddate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {/* 
              <form action="" id="search-box">
                <input
                  type="text"
                  id="search-text"
                  placeholder="Bạn cần tìm kiếm gì nhỉ?"
                />
                <button id="search-btn">
                  <i className="bx bx-search"></i>
                </button>
              </form> */}

              {/* <div className="dropdown">
                <button className="dropbtn">
                  <i className="bx bx-filter"></i>
                </button>
                <div className="dropdown-content">
                  <a href="#">Sắp xếp trạng thái</a>
                  <a href="#">Sắp xếp giá thuê giảm</a>
                  <a href="#">Sắp xếp giá thuê tăng</a>
                </div>
              </div> */}
            </div>

            {/* Table */}
            <div className="table-responsive rounded">
              <table className="table table-hover text-center m-0">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th>Tên Khách Hàng</th>
                    <th>Số Điện Thoại Khách Hàng</th>
                    <th>Loại Giao Dịch</th>
                    <th>Thông Tin Xe</th>
                    <th>Ngày Bắt Đầu</th>
                    <th>Ngày kết Thúc</th>
                    <th>Giá thuê</th>
                    <th>Số Ngày Thuê</th>
                    <th>Tiền Cọc</th>
                    <th>Tổng Tiền</th>

                    {/* <th className="th-status">Trạng Thái</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((contract, index) => (
                    <tr key={contract.contractId}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {formatDate(contract.createDate)}
                      </td>
                      <td className="text-start">{contract.customerName}</td>
                      <td className="text-center">{contract.customerPhone}</td>
                      <td className="text-center">{contract.wayToPay}</td>
                      <td className="text-center">
                        {contract.carName} - {contract.carRegistrationPlate}
                      </td>
                      <td className="text-center">
                        {formatDate(contract.startDate)}
                      </td>
                      <td className="text-center">
                        {formatDate(contract.endDate)}
                      </td>
                      <td className="text-end">
                        {formatVND(contract.rentCost)}
                      </td>
                      <td className="text-center">{contract.numberDay}</td>
                      <td className="text-end">
                        {formatVND(contract.deposit)}
                      </td>
                      <td className="text-end">
                        {formatVND(contract.totalRentCost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ThongKe;
