import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ChitietXe(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Chi Tiết Xe
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

function Xe() {
    const [modalShow, setModalShow] = React.useState(false);
    const handleOpen = () => setModalShow(true);
    const handleClose = () => setModalShow(false);
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
                            <li><i className='bx bx-chevron-right' ></i></li>
                            <li>
                                <a className="active" href="#">Xe</a>
                            </li>
                        </ul>
                    </div>
                    <a href="#" className="btn-download">
                        <i className='bx bxs-cloud-download' ></i>
                        <span className="text">Download PDF</span>
                    </a>
                </div>

                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Danh Sách Xe</h3>
                            <form action="" id="search-box">
                                <input type="text" id="search-text" placeholder="Bạn cần tìm kiếm gì nhỉ?" />
                                <button id="search-btn"><i className='bx bx-search' ></i></button>
                            </form>

                            <div className="dropdown">
                                <button className="dropbtn"><i className='bx bx-filter'></i></button>
                                <div className="dropdown-content">
                                    <a href="#">Sắp xếp trạng thái</a>
                                    <a href="#">Sắp xếp giá thuê giảm</a>
                                    <a href="#">Sắp xếp giá thuê tăng</a>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className='table-responsive rounded'>
                            <table className='table table-hover text-center m-0'>
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
                                    <tr>
                                        <td>1</td>
                                        <td>51H-012.34</td>
                                        <td>Vinfast Lux A2.0</td>
                                        <td>Vinfast</td>
                                        <td>4 chỗ - Sedan</td>
                                        <td>1.800.000</td>
                                        <td>Quận 12, TP.HCM</td>
                                        <td>dd/MM/yyyy</td>
                                        <td><span className="status completed">Còn trống</span></td>
                                        <td><Button variant="light" onClick={handleOpen}><i class='bx bx-cog'></i></Button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>51H-012.34</td>
                                        <td>Vinfast Lux A2.0</td>
                                        <td>Vinfast</td>
                                        <td>4 chỗ - Sedan</td>
                                        <td>1.800.000</td>
                                        <td>Quận 12, TP.HCM</td>
                                        <td>dd/MM/yyyy</td>
                                        <td><span className="status pending">Đã Thuê</span></td>
                                        <td><Button variant="light" onClick={handleOpen}><i class='bx bx-cog'></i></Button></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>51H-012.34</td>
                                        <td>Vinfast Lux A2.0</td>
                                        <td>Vinfast</td>
                                        <td>4 chỗ - Sedan</td>
                                        <td>1.800.000</td>
                                        <td>Quận 12, TP.HCM</td>
                                        <td>dd/MM/yyyy</td>
                                        <td><span className="status completed">Còn trống</span></td>
                                        <td><Button variant="light" onClick={handleOpen}><i class='bx bx-cog'></i></Button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* <table>
                            <thead>
                                <tr>
                                    <th>Biển số</th>
                                    <th>Tên xe</th>
                                    <th>Hãng xe</th>
                                    <th>Tên loại</th>
                                    <th>Giá thuê</th>
                                    <th>Số chỗ</th>
                                    <th>Ngày đăng kiểm</th>
                                    <th>Truyền động</th>
                                    <th>Nhiên liệu</th>
                                    <th>Nhiên liệu tiêu hao</th>
                                    <th>Tiện nghi</th>
                                    <th>Địa điểm</th>
                                    <th>Trạng Thái</th>
                                    <th ><i className="bx bxs-cog"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td >51H-012.34</td>
                                    <td>Kia K5</td>
                                    <td>KIA </td>
                                    <td>4 chỗ(sedan)</td>
                                    <td>1.000.000 VNĐ</td>
                                    <td>4</td>
                                    <td>20-05-2024</td>
                                    <td>Số tự động</td>
                                    <td>Xăng</td>
                                    <td>7 lít/100km </td>
                                    <td>Bản đồ, Bluetooth, Camera 360, Camera hành trình, Camera lùi, Cảm biến lốp, Cảm biến
                                        va chạm, Cảnh báo tốc độ, Cửa sổ trời, Định vị GPS, Khe cắm USB, Lốp dự phòng, Màn
                                        hình DVD, ETC, Túi khí an toàn</td>
                                    <td>Phú Nhuận</td>
                                    <td><span className="status completed">Còn trống</span></td>
                                    <td><i className='bx bx-edit-alt'></i></td>
                                </tr>
                                <tr>
                                    <td >51H-012.34</td>
                                    <td>

                                        Kia K5
                                    </td>
                                    <td>KIA </td>
                                    <td>4 chỗ(sedan)</td>

                                    <td>01-06-2024</td>
                                    <td>4</td>
                                    <td>20-05-2024</td>
                                    <td>Số tự động</td>
                                    <td>Xăng</td>
                                    <td>7 lít/100km </td>
                                    <td>Bản đồ, Bluetooth, Camera 360, Camera hành trình, Camera lùi, Cảm biến lốp, Cảm biến
                                        va chạm, Cảnh báo tốc độ, Cửa sổ trời, Định vị GPS, Khe cắm USB, Lốp dự phòng, Màn
                                        hình DVD, ETC, Túi khí an toàn</td>
                                    <td>Phú Nhuận</td>
                                    <td><span className="status completed" >Còn trống</span></td>
                                    <td><i className='bx bx-edit-alt'></i></td>
                                </tr>
                                <tr>
                                    <td >51H-012.34</td>
                                    <td>

                                        Kia K5
                                    </td>
                                    <td>KIA </td>
                                    <td>4 chỗ(sedan)</td>

                                    <td>01-06-2024</td>
                                    <td>4</td>
                                    <td>20-05-2024</td>
                                    <td>Số tự động</td>
                                    <td>Xăng</td>
                                    <td>7 lít/100km </td>
                                    <td>Bản đồ, Bluetooth, Camera 360, Camera hành trình, Camera lùi, Cảm biến lốp, Cảm biến
                                        va chạm, Cảnh báo tốc độ, Cửa sổ trời, Định vị GPS, Khe cắm USB, Lốp dự phòng, Màn
                                        hình DVD, ETC, Túi khí an toàn</td>
                                    <td>Phú Nhuận</td>
                                    <td><span className="status completed">Còn trống</span></td>
                                    <td><i className='bx bx-edit-alt'></i></td>
                                </tr>
                                <tr>
                                    <td >51H-012.34</td>
                                    <td>

                                        Kia K5
                                    </td>
                                    <td>KIA </td>
                                    <td>4 chỗ(sedan)</td>

                                    <td>01-06-2024</td>
                                    <td>4</td>
                                    <td>20-05-2024</td>
                                    <td>Số tự động</td>
                                    <td>Xăng</td>
                                    <td>7 lít/100km </td>
                                    <td>Bản đồ, Bluetooth, Camera 360, Camera hành trình, Camera lùi, Cảm biến lốp, Cảm biến
                                        va chạm, Cảnh báo tốc độ, Cửa sổ trời, Định vị GPS, Khe cắm USB, Lốp dự phòng, Màn
                                        hình DVD, ETC, Túi khí an toàn</td>
                                    <td>Phú Nhuận</td>
                                    <td><span className="status completed">Còn trống</span></td>
                                    <td><i className='bx bx-edit-alt'></i></td>
                                </tr>
                                <tr>
                                    <td >51H-012.34</td>
                                    <td>

                                        Kia K5
                                    </td>
                                    <td>KIA </td>
                                    <td>4 chỗ(sedan)</td>

                                    <td>01-06-2024</td>
                                    <td>4</td>
                                    <td>20-05-2024</td>
                                    <td>Số tự động</td>
                                    <td>Xăng</td>
                                    <td>7 lít/100km </td>
                                    <td>Bản đồ, Bluetooth, Camera 360, Camera hành trình, Camera lùi, Cảm biến lốp, Cảm biến
                                        va chạm, Cảnh báo tốc độ, Cửa sổ trời, Định vị GPS, Khe cắm USB, Lốp dự phòng, Màn
                                        hình DVD, ETC, Túi khí an toàn</td>
                                    <td>Phú Nhuận</td>
                                    <td><span className="status completed">Còn trống</span></td>
                                    <td><i className='bx bx-edit-alt'></i></td>
                                </tr>
                            </tbody>
                        </table> */}
                    </div>
                </div>
                <ChitietXe show={modalShow} onHide={() => setModalShow(false)} />
            </main>
        </>
    );
}

export default Xe;