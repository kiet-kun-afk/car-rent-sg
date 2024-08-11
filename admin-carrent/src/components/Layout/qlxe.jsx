import React from "react";

function qlxe() {
    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Quản Lý Xe</h1>
                        <ul className="breadcrumb">
                            <li>
                                <a href="#">Trang chủ</a>
                            </li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li>
                                <a className="active" href="#">Quản lý xe</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <form className="rental-form">
                            <div className="container">
                                <div className="form-section">
                                    <h2>Hình ảnh xe</h2>
                                    <div className="form-group">
                                        <label for="headImage">Đầu xe</label>
                                        <input type="file" id="headImage" />
                                    </div>
                                    <div className="form-group">
                                        <label for="leftSideImage">Sườn trái</label>
                                        <input type="file" id="leftSideImage" />
                                    </div>
                                    <div className="form-group">
                                        <label for="rightSideImage">Sườn phải</label>
                                        <input type="file" id="rightSideImage" />
                                    </div>
                                    <div className="form-group">
                                        <label for="rearImage">Đuôi xe</label>
                                        <input type="file" id="rearImage" />
                                    </div>
                                    <div className="form-group">
                                        <label for="description">Mô tả xe</label>
                                        <textarea name="editor1" id="editor1" rows="10" cols="80"></textarea>
                                    </div>
                                </div>
                                <div className="form-section">
                                    <h2>Thông tin xe</h2>
                                    <div className="form-group">
                                        <label for="licensePlate">Biển Số</label>
                                        <input type="text" id="licensePlate" />
                                    </div>
                                    <div className="form-group">
                                        <label for="carName">Tên Xe</label>
                                        <input type="text" id="carName" />
                                    </div>
                                    <div className="form-group">
                                        <label for="brand">Hãng Xe</label>
                                        <select id="brand">
                                            <option value="Vinfast">Vinfast</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label for="model">Tên Loại</label>
                                        <select id="model">
                                            <option value="4 chỗ(mini)">4 chỗ(mini)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label for="registrationDate">Ngày Đăng Kiểm</label>
                                        <input type="date" id="registrationDate" />
                                    </div>
                                    <div className="form-group">
                                        <label for="rentalPrice">Giá Thuê</label>
                                        <input type="text" id="rentalPrice" />
                                    </div>
                                    <div className="form-group">
                                        <label>Số Chỗ</label>
                                        <input type="radio" name="seats" value="4" /> 4 chỗ
                                        <input type="radio" name="seats" value="5" /> 5 chỗ
                                        <input type="radio" name="seats" value="7" /> 7 chỗ
                                    </div>
                                    <div className="form-group">
                                        <label>Truyền Động</label>
                                        <input type="radio" name="transmission" value="automatic" /> Số Tự Động
                                        <input type="radio" name="transmission" value="manual" /> Số Sàn
                                    </div>
                                    <div className="form-group">
                                        <label for="fuelType">Nhiên Liệu</label>
                                        <select id="fuelType">
                                            <option value="xăng">Xăng</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label for="fuelConsumption">Nhiên Liệu Tiêu Hao</label>
                                        <input type="text" id="fuelConsumption" />
                                    </div>
                                    <div className="form-group">
                                        <label for="location">Trụ Sở</label>
                                        <select id="location">
                                            <option value="Quận 12">Quận 12</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label for="amenities">Tiện Nghi</label>
                                        <input type="text" id="amenities" />
                                    </div>
                                    <div className="form-group">
                                        <label for="rentalStatus">Trạng thái</label>
                                        <div className="d-flex align-items-center" >
                                            <input className="input-trangthai" type="checkbox" />
                                            <p className="mb-0 ms-2">Đang Cho Thuê</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-buttons">
                                <button className="create-button">Thêm mới</button>
                                <button className="update-button">Cập nhật</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default qlxe;