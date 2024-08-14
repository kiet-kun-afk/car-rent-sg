import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Xe() {
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

  // chuyển kiểu date
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
  //

  // load danh sách xe
  const [Cars, setCars] = useState([]);
  const [Brand, setBrand] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Branch, SetBranch] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [CarsWithRegistrationPlate, setcarsWithRegistrationPlate] =
    useState(null);
  // const [selectedBrandId, setSelectedBrandId] = useState("");
  // const [selectedCategoryId, SetselectedCategoryId] = useState("");
  // const [selectedBranchId, SetselectedBranchId] = useState("");

  const [images, setImages] = useState({
    frontImage: null,
    backImage: null,
    leftImage: null,
    rightImage: null,
  });

  const [registrationPlate, setRegistrationPlate] = useState("");
  const [carName, setCarName] = useState("");

  const [transmission, setTransmission] = useState("");

  const [fuelType, setFuelType] = useState("");
  const [fuelConsumption, setFuelConsumption] = useState("");

  const [rentCost, setRentCost] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [numberOfSeat, setNumberOfSeat] = useState("");

  const [registrationDate, setRegistrationDate] = useState("");
  const [describe, setDescribe] = useState("");
  const [features, setFeatures] = useState("");

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleRadioChange = (e) => {
    setFuelType(e.target.value);
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages({
      ...images,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numberOfSeatInteger = parseInt(numberOfSeat, 10) || 0;
    const rentCostInteger = parseInt(rentCost, 10) || 0;
    const brandIdInteger = parseInt(brandId, 10) || 0;
    const categoryIdInteger = parseInt(categoryId, 10) || 0;
    const branchIdInteger = parseInt(branchId, 10) || 0;

    console.log("tên:" + fuelType);
    const formData = new FormData();
    for (const key in images) {
      formData.append(key, images[key]);
    }

    formData.append("brandId", brandIdInteger);
    formData.append("categoryId", categoryIdInteger);
    formData.append("registrationPlate", registrationPlate);
    formData.append("carName", carName);
    formData.append("numberOfSeat", numberOfSeatInteger);
    formData.append("transmission", transmission);
    formData.append("fuelType", fuelType);
    formData.append("fuelConsumption", fuelConsumption);
    formData.append("rentCost", rentCostInteger);
    formData.append("branchId", branchIdInteger);
    formData.append("registrationDate", registrationDate);
    formData.append("describe", describe);
    formData.append("features", features);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/cars/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      sNotify();
      console.log(response.data);
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      errNotify();
    }
  };

  const LoadListCar = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/cars");
    console.log(result.data.data);

    setCars(result.data.data);
  };

  const loadListCarWithRegistrationPlate = async (registrationPlate) => {
    const result1 = await axios.get(
      `http://localhost:8080/api/v1/cars/${registrationPlate}`
    );
    console.log(result1.data.data);

    setcarsWithRegistrationPlate(result1.data.data);
    console.log(CarsWithRegistrationPlate);
  };

  // load brand
  const LoadBrand = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/brands");
    console.log(result.data.data);

    setBrand(result.data.data);
  };

  const LoadCategory = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/categories");
    console.log(result.data.data);

    setCategories(result.data.data);
  };

  const LoadBranch = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/branches");
    console.log(result.data.data);

    SetBranch(result.data.data);
  };

  const DeleteCar = async (registrationPlate) => {
    try {
      const result2 = await axios.delete(
        `http://localhost:8080/api/v1/cars/${registrationPlate}`
      );
      console.log(result2.data.message);
      sNotify();
      var btnclose = document.getElementById("closebtn");
      btnclose.click();
      LoadListCar();
    } catch (error) {
      errNotify();
    }
  };

  const handleButtonClick = async (registrationPlate) => {
    await loadListCarWithRegistrationPlate(registrationPlate);
  };

  const DeleteButtonClick = async (registrationPlate) => {
    await DeleteCar(registrationPlate);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const handleChangeBrand = (event) => {
  //   const selectedId = event.target.value;
  //   setSelectedBrandId(selectedId);
  //   console.log("Selected Brand ID:", selectedId);
  // };

  // const handleChangeCategory = (event) => {
  //   const selectedId = event.target.value;
  //   SetselectedCategoryId(selectedId);
  //   console.log("Selected Brand ID:", selectedId);
  // };

  // const handleChangeBranch = (event) => {
  //   const selectedId = event.target.value;
  //   SetselectedBranchId(selectedId);
  //   console.log("Selected Branch ID:", selectedId);
  // };

  const filteredCars = Cars.filter((car) => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    return (
      (car.registrationPlate &&
        car.registrationPlate.toLowerCase().includes(normalizedSearchQuery)) ||
      (car.carName &&
        car.carName.toLowerCase().includes(normalizedSearchQuery)) ||
      (car.brandName &&
        car.brandName.toLowerCase().includes(normalizedSearchQuery))
    );
  });

  useEffect(() => {
    LoadListCar();
    LoadBrand();
    LoadCategory();
    LoadBranch();
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
  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Danh Sách Xe</h1>
            <ul className="breadcrumb">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>
                <i className="bx bx-chevron-right"></i>
              </li>
              <li>
                <a className="active" href="#">
                  Xe
                </a>
              </li>
            </ul>
          </div>
          <a href="#" className="btn-download">
            <i className="bx bxs-cloud-download"></i>
            <button
              class="btn "
              data-bs-toggle="modal"
              data-bs-target="#createCar"
            >
              Thêm Xe Mới
            </button>
          </a>
        </div>

        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Danh Sách Xe</h3>
              <form
                action=""
                id="search-box"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
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

            {/* Table */}
            <div className="table-responsive rounded">
              <table className="table table-hover text-center m-0">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Biển Số</th>
                    <th>Tên Xe</th>
                    <th>Hãng Xe</th>
                    <th>Số Chỗ</th>
                    <th>Giá Thuê (VNĐ)</th>
                    <th>Địa Điểm</th>
                    <th>Ngày đăng kiểm</th>
                    <th className="th-status">Trạng Thái</th>
                    <th>Chi Tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map((car, index) => (
                    <tr key={car.carId}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{car.registrationPlate}</td>
                      <td className="text-start">{car.carName}</td>
                      <td className="text-start">{car.brandName}</td>
                      <td className="text-center">
                        {car.numberOfSeat} - {car.categoryName}
                      </td>
                      <td className="text-end">{car.rentCost}</td>
                      <td className="text-start">{car.branchName}</td>
                      <td className="text-center">
                        {formatDate(car.registrationDate)}
                      </td>
                      <td className="status completed">
                        <span>
                          {car.status ? (
                            <span style={{ color: "green", fontSize: "16px" }}>
                              Hoạt Động{" "}
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>Đã Cho Thuê</span>
                          )}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-light"
                          data-bs-toggle="modal"
                          data-bs-target="#chitietXe"
                          variant="light"
                          onClick={() =>
                            handleButtonClick(car.registrationPlate)
                          }
                        >
                          <i class="bx bx-cog"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <ChitietXe show={modalShow} onHide={() => setModalShow(false)} /> */}

        {/* modal new */}

        <div
          class="modal fade"
          id="chitietXe"
          tabindex="-1"
          aria-labelledby="chitietXeLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="chitietXeLabel">
                  Chi tiết Xe
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  id="closebtn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <div class="container-custom">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="profile-info">
                        <img
                          src={`${
                            CarsWithRegistrationPlate
                              ? CarsWithRegistrationPlate.frontImage
                              : "avt"
                          }`}
                          alt="atv"
                        />
                      </div>

                      <div class="profile-details">
                        <h3>
                          {CarsWithRegistrationPlate
                            ? CarsWithRegistrationPlate.carName
                            : "ten xe"}
                        </h3>
                        <div class="col-sm-3 p-0 d-flex align-items-center justify-content-center">
                          <span>
                            {CarsWithRegistrationPlate ? (
                              CarsWithRegistrationPlate.status ? (
                                <span class="badge text-bg-success">
                                  Hoạt Động{" "}
                                </span>
                              ) : (
                                <span class="badge text-bg-danger">
                                  Ngưng Hoạt Động
                                </span>
                              )
                            ) : (
                              "Người Dùng"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 contact-info">
                      <div class="contact-detail">
                        <div class="form-group mt-3">
                          <label for="gplx">Biển Số</label>
                          <input
                            type="text"
                            id="bienso"
                            value={
                              CarsWithRegistrationPlate
                                ? CarsWithRegistrationPlate.registrationPlate
                                : "ten xe"
                            }
                            class="form-control"
                            readOnly
                          />
                        </div>

                        <div class="row mt-3">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label for="name">Số Chỗ</label>
                              <input
                                type="text"
                                id="socho"
                                value={
                                  CarsWithRegistrationPlate
                                    ? CarsWithRegistrationPlate.numberOfSeat
                                    : "ten xe"
                                }
                                class="form-control"
                                readonly
                              />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label for="brand">Hãng Xe</label>
                              <input
                                type="text"
                                id="hãng"
                                value={
                                  CarsWithRegistrationPlate
                                    ? CarsWithRegistrationPlate.brandName
                                    : "ten xe"
                                }
                                class="form-control"
                                readonly
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row mt-3">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label for="name">Nhiên liệu</label>
                              <input
                                type="text"
                                id="socho"
                                value={
                                  CarsWithRegistrationPlate
                                    ? CarsWithRegistrationPlate.fuelType
                                    : "ten xe"
                                }
                                class="form-control"
                                readonly
                              />
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label for="brand">Nhiên liệu tiêu hao</label>
                              <input
                                type="text"
                                id="hãng"
                                value={
                                  CarsWithRegistrationPlate
                                    ? CarsWithRegistrationPlate.fuelConsumption
                                    : "ten xe"
                                }
                                class="form-control"
                                readonly
                              />
                            </div>
                          </div>
                        </div>

                        <div class="form-group mt-3">
                          <label for="gplx">Giá Cho Thuê</label>
                          <input
                            type="text"
                            id="gia"
                            value={
                              CarsWithRegistrationPlate
                                ? CarsWithRegistrationPlate.rentCost
                                : "ten xe"
                            }
                            class="form-control"
                            readonly
                          />
                        </div>

                        <div class="form-group mt-3">
                          <label for="gplx">Chi Nhánh</label>
                          <input
                            type="text"
                            id="gia"
                            value={
                              CarsWithRegistrationPlate
                                ? CarsWithRegistrationPlate.branchName
                                : "ten xe"
                            }
                            class="form-control"
                            readonly
                          />
                        </div>

                        <div class="form-group mt-3">
                          <label for="gplx">Ngày Đăng Kiểm</label>
                          <input
                            type="text"
                            id="gia"
                            value={
                              CarsWithRegistrationPlate
                                ? formatDate(
                                    CarsWithRegistrationPlate.registrationDate
                                  )
                                : "ten xe"
                            }
                            class="form-control"
                            readonly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() =>
                    DeleteButtonClick(
                      CarsWithRegistrationPlate
                        ? CarsWithRegistrationPlate.registrationPlate
                        : "ten xe"
                    )
                  }
                  disabled={
                    !CarsWithRegistrationPlate ||
                    !CarsWithRegistrationPlate.status
                  }
                >
                  Vô Hiệu Hóa trạng thái
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end model chi tieets */}

        {/* model theem xe */}

        <div
          class="modal fade"
          id="createCar"
          tabindex="-1"
          aria-labelledby="CreateNewCarLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title" id="createCar">
                  Thêm Mới Xe
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  id="closebtn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="container-custom">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mt-3">
                          <label htmlFor="frontImage">Hình Trước Xe</label>
                          <input
                            type="file"
                            name="frontImage"
                            className="form-control"
                            onChange={handleImageChange}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="leftImage">Hình Trái Xe</label>
                          <input
                            type="file"
                            name="leftImage"
                            className="form-control"
                            onChange={handleImageChange}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="rightImage">Hình Phải Xe</label>
                          <input
                            type="file"
                            name="rightImage"
                            className="form-control"
                            onChange={handleImageChange}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="backImage">Hình Sau Xe</label>
                          <input
                            type="file"
                            name="backImage"
                            className="form-control"
                            onChange={handleImageChange}
                          />
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="brand-select">Thương Hiệu</label>
                          <select
                            className="form-select"
                            value={brandId}
                            onChange={(e) => handleChange(e, setBrandId)}
                          >
                            {Brand.map((brand) => (
                              <option key={brand.brandId} value={brand.brandId}>
                                {brand.brandName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group mt-3">
                          <label htmlFor="category-select">Thể Loại</label>
                          <select
                            className="form-select"
                            value={categoryId}
                            onChange={(e) => handleChange(e, setCategoryId)}
                          >
                            {Categories.map((category) => (
                              <option
                                key={category.categoryId}
                                value={category.categoryId}
                              >
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="describe">Mô tả</label>
                          <input
                            type="text"
                            id="describe"
                            className="form-control"
                            value={describe}
                            onChange={(e) => handleChange(e, setDescribe)}
                          />
                        </div>

                        <div className="form-group mt-3">
                          <label htmlFor="features">Đặc Trưng</label>
                          <input
                            type="text"
                            id="features"
                            className="form-control"
                            value={features}
                            onChange={(e) => handleChange(e, setFeatures)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 contact-info">
                        <div className="contact-detail">
                          <div className="form-group mt-3">
                            <label htmlFor="licensePlate">Biển Số</label>
                            <input
                              type="text"
                              id="registrationPlate"
                              className="form-control"
                              value={registrationPlate}
                              onChange={(e) =>
                                handleChange(e, setRegistrationPlate)
                              }
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="carName">Tên Xe</label>
                            <input
                              type="text"
                              id="carName"
                              className="form-control"
                              value={carName}
                              onChange={(e) => handleChange(e, setCarName)}
                            />
                          </div>
                          <div className="row mt-3">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="numberOfSeat">Số Chỗ</label>
                                <input
                                  type="text"
                                  id="numberOfSeat"
                                  className="form-control"
                                  value={numberOfSeat}
                                  onChange={(e) =>
                                    handleChange(e, setNumberOfSeat)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="transmission">
                                  Truyền Động
                                </label>
                                <input
                                  type="text"
                                  id="transmission"
                                  className="form-control"
                                  value={transmission}
                                  onChange={(e) =>
                                    handleChange(e, setTransmission)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-sm-6">
                              <label htmlFor="fuelType">Nhiên liệu</label>
                              <div className="form-group d-flex mt-3">
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    id="petrol"
                                    name="fuelType"
                                    value="Xăng"
                                    checked={fuelType === "Xăng"}
                                    onChange={handleRadioChange}
                                  />
                                  <label htmlFor="petrol">Xăng</label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    id="diesel"
                                    name="fuelType"
                                    value="Dầu"
                                    checked={fuelType === "Dầu"}
                                    onChange={handleRadioChange}
                                  />
                                  <label htmlFor="diesel">Dầu</label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    id="electric"
                                    name="fuelType"
                                    value="Điện"
                                    checked={fuelType === "Điện"}
                                    onChange={handleRadioChange}
                                  />
                                  <label htmlFor="electric">Điện</label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group mt-3">
                            <label htmlFor="fuelConsumption">
                              Nhiên liệu tiêu hao
                            </label>
                            <input
                              type="text"
                              id="fuelConsumption"
                              className="form-control"
                              value={fuelConsumption}
                              onChange={(e) =>
                                handleChange(e, setFuelConsumption)
                              }
                            />
                          </div>

                          <div className="form-group mt-3">
                            <label htmlFor="branch-select">Chi Nhánh</label>
                            <select
                              className="form-select"
                              value={branchId}
                              onChange={(e) => handleChange(e, setBranchId)}
                            >
                              {Branch.map((branch) => (
                                <option
                                  key={branch.branchId}
                                  value={branch.branchId}
                                >
                                  {branch.branchName}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group mt-3">
                            <label htmlFor="rentCost">Giá Cho Thuê</label>
                            <input
                              type="number"
                              id="rentCost"
                              className="form-control"
                              value={rentCost}
                              onChange={(e) => handleChange(e, setRentCost)}
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="registrationDate">
                              Ngày Đăng Kiểm
                            </label>

                            <input
                              type="date"
                              id="registrationDate"
                              className="form-control"
                              value={registrationDate}
                              onChange={(e) =>
                                handleChange(e, setRegistrationDate)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-success">
                    Tạo Xe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Xe;
