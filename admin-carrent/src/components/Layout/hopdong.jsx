import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
=======
import axiosConfig from "../../config/axiosConfig";
>>>>>>> 27a5cb14d69faac568df7bd546d18495d08680f9

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD

function chitietHD(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Chi Tiết Hợp Đồng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

=======
>>>>>>> 27a5cb14d69faac568df7bd546d18495d08680f9
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

function HopDong() {
  // const [modalShow, setModalShow] = React.useState(false);
  // const handleOpen = () => setModalShow(true);
  // const handleClose = () => setModalShow(false);
  const [Contracts, setContracts] = useState([]);

  const sNotify = () =>
    toast.success("Success !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  const errNotify = () =>
    toast.error("Error !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  //Định dạng ngày
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

  // Định dạng ẩn số điện thoại
  const maskPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length > 4) {
      return (
        phoneNumber.slice(0, -4).replace(/./g, "*") + phoneNumber.slice(-4)
      );
    }
    return phoneNumber; // return the original phone number if it's less than or equal to 4 digits
  };

  const LoadListContract = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/v1/contracts/all"
    );
    console.log(response.data.data);
    setContracts(response.data.data);
  };

  const [ContractsById, setContractById] = useState(null);
  const LoadContractById = async (ContractId) => {
    const result1 = await axios.get(
<<<<<<< HEAD
      `http://localhost:8080/api/v1/contracts/${ContractId}`
=======
      `http://localhost:8080/api/v1/contracts/get-contract/${ContractId}`
>>>>>>> 27a5cb14d69faac568df7bd546d18495d08680f9
    );
    console.log(result1.data.data);

    setContractById(result1.data.data);
    // console.log(ContractsWithPhone);
  };

  const DeleteContract = async (ContractId) => {
<<<<<<< HEAD
    const result2 = await axios.delete(
      `http://localhost:8080/api/v1/contracts/updateStatus/${ContractId}`
    );
    console.log(result2.data.message);

    // var btnclose = document.getElementById("closebtn");
    // btnclose.click();
=======
    const result2 = await axios.put(
      `http://localhost:8080/api/v1/contracts/confirm/${ContractId}`
    );
    console.log(result2.data.message);

    var btnclose = document.getElementById("closebtn");
    btnclose.click();
>>>>>>> 27a5cb14d69faac568df7bd546d18495d08680f9
    LoadListContract();
  };

  const handleButtonClick = async (ContractId) => {
    await LoadContractById(ContractId);
  };

  const DeleteButtonClick = async (ContractId) => {
    await DeleteContract(ContractId);
  };

  useEffect(() => {
    LoadListContract();
  }, []);

  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Hợp Đồng</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Hợp đồng
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
            <div className="head">
              <h3>Hợp đồng thuê xe</h3>
              <form action="" id="search-box">
                <input
                  type="text"
                  id="search-text"
                  placeholder="Bạn cần tìm kiếm gì nhỉ?"
                />
                <button id="search-btn">
                  <i className="bx bx-search"></i>
                </button>
              </form>

              <div className="dropdown">
                <button className="dropbtn">
                  <i className="bx bx-filter"></i>
                </button>
                <div className="dropdown-content">
                  <a href="#">Sắp xếp trạng thái</a>
                  <a href="#">Sắp xếp giá thuê giảm</a>
                  <a href="#">Sắp xếp giá thuê tăng</a>
                </div>
              </div>
            </div>

            <div className="table-responsive rounded">
              <table className="table table-hover text-center m-0">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Thời Gian Tạo</th>
                    <th>Mã HĐ</th>
                    <th>Loại Thanh Toán</th>
                    <th>Khách Hàng</th>
                    <th>Số Điện Thoại</th>
                    <th>Xe Được Thuê</th>
                    <th>Biển Số Xe</th>
                    <th>Ngày Bắt Đầu</th>
                    <th>Ngày Kết Thúc</th>
                    <th>Chi Phí Thuê</th>
                    <th>Số Ngày Thuê</th>
                    <th>Tiền Cọc</th>
                    <th>Tổng Tiền</th>
                    <th className="th-status">Trạng Thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {Contracts.map((contract, index) => (
                    <tr key={contract.contractId}>
<<<<<<< HEAD
                      <td>{index + 1}</td>
                      <td>{formatDate(contract.createDate)}</td>
                      <td>{contract.contractId}</td>
                      <td>{contract.wayToPay}</td>
                      <td>{contract.customerName}</td>
                      <td>{maskPhoneNumber(contract.customerPhone)}</td>
                      <td>{contract.carName}</td>
                      <td>{contract.carRegistrationPlate}</td>
                      <td>{formatDate(contract.startDate)}</td>
                      <td>{formatDate(contract.endDate)}</td>
                      <td>{formatVND(contract.rentCost)}</td>
                      <td>{contract.numberDay}</td>
                      <td>{formatVND(contract.deposit)}</td>
                      <td>{formatVND(contract.totalRentCost)}</td>
=======
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {formatDate(contract.createDate)}
                      </td>
                      <td className="text-center">{contract.contractId}</td>
                      <td className="text-center">{contract.wayToPay}</td>
                      <td className="text-start">{contract.customerName}</td>
                      <td className="text-center">
                        {maskPhoneNumber(contract.customerPhone)}
                      </td>
                      <td className="text-start">{contract.carName}</td>
                      <td className="text-center">
                        {contract.carRegistrationPlate}
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
>>>>>>> 27a5cb14d69faac568df7bd546d18495d08680f9
                      <td className="status completed">
                        <span>
                          {contract.statusPayment ? (
                            <span style={{ color: "green", fontSize: "16px" }}>
<<<<<<< HEAD
                              Thành Công{" "}
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              Chưa Thanh Toán
=======
                              Thành Công
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              Đang Chờ Thanh Toán
>>>>>>> 27a5cb14d69faac568df7bd546d18495d08680f9
                            </span>
                          )}
                        </span>
                      </td>

                      <td>
<<<<<<< HEAD
                        <button
                          type="button"
                          class="btn btn-light"
                          data-bs-toggle="modal"
                          data-bs-target="#chitietHD"
                          variant="light"
                          onClick={() => handleButtonClick(contract.contractId)}
                        >
                          <i class="fa-solid fa-eye"></i>
                        </button>
=======
                        {contract.statusPayment ? (
                          <button
                            disabled={true}
                            type="button"
                            class="btn btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#chitietHD"
                            variant="light"
                            onClick={() =>
                              handleButtonClick(contract.contractId)
                            }
                          >
                            <i class="fa-solid fa-eye"></i>
                          </button>
                        ) : (
                          
                          <button
                            type="button"
                            class="btn btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#chitietHD"
                            variant="light"
                            onClick={() =>
                              handleButtonClick(contract.contractId)
                            }
                          >
                            <i class="fa-solid fa-eye"></i>
                          </button>
                        )}
>>>>>>> 27a5cb14d69faac568df7bd546d18495d08680f9
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Model new */}
<<<<<<< HEAD

=======
>>>>>>> 27a5cb14d69faac568df7bd546d18495d08680f9
        <div
          class="modal fade"
          id="chitietHD"
          tabindex="-1"
          aria-labelledby="chitietHDLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="chitietHDLabel">
                  Chi Tiết Hợp Đồng
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              {/* body */}
              <div class="modal-body">
                <div class="container-custom">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="profile-details">
                        <div class="form-group">
                          <label for="mahopdong">Mã hợp đồng</label>
                          <input
                            type="text"
                            id="mahopdong"
                            value={
                              ContractsById
                                ? ContractsById.contractId
                                : "mã hợp đồng"
                            }
                            class="form-control"
                            readOnly
                          />
                        </div>

                        <div class="form-group mt-3">
                          <label for="name">Thời Gian Tạo</label>
                          <input
                            type="text"
                            value={formatDate(
                              ContractsById
                                ? ContractsById.createDate
                                : "ngày tạo"
                            )}
                            class="form-control"
                          />
                        </div>

                        <div class="form-group mt-3">
                          <label for="name">Tổng Tiền Hợp Đồng</label>
                          <input
                            type="text"
<<<<<<< HEAD
                            value={formatVND(
                              ContractsById
                                ? ContractsById.totalRentCost
                                : "tổng tiền"
                            )}
=======
                            value={
                              ContractsById
                                ? ContractsById.totalRentCost
                                : "tổng tiền"
                            }
>>>>>>> 27a5cb14d69faac568df7bd546d18495d08680f9
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="profile-details">
                        <div class="form-group">
                          <label for="name">Tên Khách Hàng</label>
                          <input
                            type="text"
                            value={
                              ContractsById
                                ? ContractsById.customerName
                                : "tên khách hàng"
                            }
                            class="form-control"
                          />
                        </div>

                        <div class="form-group mt-3">
                          <label for="name">Số Điện Thoại</label>
                          <input
                            type="text"
                            value={maskPhoneNumber(
                              ContractsById
                                ? ContractsById.customerPhone
                                : "số điện thoại"
                            )}
                            class="form-control"
                          />
                        </div>

                        <div class="form-group mt-3">
                          <label for="name">Tiền Khách Cọc</label>
                          <input
                            type="text"
                            value={formatVND(
                              ContractsById
                                ? ContractsById.deposit
                                : "tiền cọc "
                            )}
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*  */}

                <div class="container-custom">
                  <div class="header-custom mt-3">
                    <h2>Thông Tin Xe Được Thuê</h2>
                  </div>

                  <div class="row">
                    <div class="col-md-4 left">
                      <img
                        class="img-fluid rounded mx-auto"
                        src={`../img/${
                          ContractsById ? ContractsById.imgCar : "avt"
                        }`}
                        alt="Upload Icon"
                      />
                    </div>

                    <div class="col-md-8 ps4 right">
                      <div class="form-group">
                        <label for="name">Tên Xe</label>
                        <input
                          type="text"
                          value={
                            ContractsById ? ContractsById.carName : " Tên xe "
                          }
                          class="form-control"
                        />
                      </div>

                      <div class="form-group mt-3">
                        <label for="name">Biển Số</label>
                        <input
                          type="text"
                          value={
                            ContractsById
                              ? ContractsById.carRegistrationPlate
                              : " Biển số"
                          }
                          class="form-control"
                        />
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group mt-3">
                            <label for="name">Ngày Bắt Đầu Thuê</label>
                            <input
                              type="text"
                              value={formatDate(
                                ContractsById
                                  ? ContractsById.startDate
                                  : "Ngày bắt đầu"
                              )}
                              class="form-control"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group mt-3">
                            <label for="name">Ngày Kết Thúc Thuê</label>
                            <input
                              type="text"
                              value={formatDate(
                                ContractsById
                                  ? ContractsById.endDate
                                  : "Ngày kết thúc"
                              )}
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group mt-3">
                            <label for="name">Chi Phí Thuê</label>
                            <input
                              type="text"
                              value={formatVND(
                                ContractsById
                                  ? ContractsById.rentCost
                                  : "Chi phí thuê"
                              )}
                              class="form-control"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group mt-3">
                            <label for="name">Số Ngày Được Thuê</label>
                            <input
                              type="text"
                              value={
                                ContractsById
                                  ? ContractsById.numberDay
                                  : "số ngày thuê "
                              }
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end body */}

              <div class="modal-footer justify-content-between">
                <span>
                  {ContractsById ? (
                    ContractsById.statusPayment ? (
                      <span class="badge text-bg-success fs-5">Hoàn Thành</span>
                    ) : (
                      <span class="badge text-bg-danger fs-5">
                        Chưa Xác Nhận
                      </span>
                    )
                  ) : (
                    "Người Dùng"
                  )}
                </span>

                <div class="row">
                  <button
                    type="button"
                    class="btn btn-success text-end"
                    onClick={() =>
                      DeleteButtonClick(
                        ContractsById ? ContractsById.contractId : "mã hợp đồng"
                      )
                    }
                  >
                    Xác Nhận Hợp Đồng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HopDong;
