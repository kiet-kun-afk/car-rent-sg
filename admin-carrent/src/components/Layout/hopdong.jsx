import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ChitietHD(props) {
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

function HopDong() {
    const [modalShow, setModalShow] = React.useState(false);
    const handleOpen = () => setModalShow(true);
    const handleClose = () => setModalShow(false);

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
                            <li><i className='bx bx-chevron-right' ></i></li>
                            <li>
                                <a className="active" href="#">Hợp đồng</a>
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
                            <h3>Hợp đồng thuê xe</h3>
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

                        <div className='table-responsive rounded'>
                            <table className='table table-hover text-center m-0'>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã HĐ</th>
                                        <th>Khách Hàng</th>
                                        <th>Ngày Ký</th>
                                        <th>Ngày Hết Hạn</th>
                                        <th>Chi Tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>HD01</td>
                                        <td>Trần Đình Thành Đạt</td>
                                        <td>dd/MM/yyyy</td>
                                        <td>dd/MM/yyyy</td>
                                        <td><Button variant="light" onClick={handleOpen}><i class="fa-solid fa-eye"></i></Button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>HD02</td>
                                        <td>Trần Đình Thành Đạt</td>
                                        <td>dd/MM/yyyy</td>
                                        <td>dd/MM/yyyy</td>
                                        <td><Button variant="light" onClick={handleOpen}><i class="fa-solid fa-eye"></i></Button></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>HD03</td>
                                        <td>Trần Đình Thành Đạt</td>
                                        <td>dd/MM/yyyy</td>
                                        <td>dd/MM/yyyy</td>
                                        <td><Button variant="light" onClick={handleOpen}><i class="fa-solid fa-eye"></i></Button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã hợp đồng</th>
                                    <th>Công ty cho thuê</th>
                                    <th>Họ tên người thuê</th>
                                    <th>Ngày kí hợp đồng</th>
                                    <th>Ngày hết hạn hợp đồng</th>
                                    <th>Chi tiết</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>HD001</td>
                                    <td>CÔNG TY CỔ PHẦN Ô TÔ CarRentSG VIỆT NAM</td>
                                    <td>Trần Minh Trung </td>
                                    <td>22/5/2024</td>
                                    <td>25/5/2024</td>
                                    <td><span className="status completed">Xem hợp đồng</span></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>HD001</td>
                                    <td>CÔNG TY CỔ PHẦN Ô TÔ CarRentSG VIỆT NAM</td>
                                    <td>Trần Minh Trung </td>
                                    <td>22/5/2024</td>
                                    <td>25/5/2024</td>
                                    <td><span className="status completed">Xem hợp đồng</span></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>HD001</td>
                                    <td>CÔNG TY CỔ PHẦN Ô TÔ CarRentSG VIỆT NAM</td>
                                    <td>Trần Minh Trung </td>
                                    <td>22/5/2024</td>
                                    <td>25/5/2024</td>
                                    <td><span className="status completed">Xem hợp đồng</span></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>HD001</td>
                                    <td>CÔNG TY CỔ PHẦN Ô TÔ CarRentSG VIỆT NAM</td>
                                    <td>Trần Minh Trung </td>
                                    <td>22/5/2024</td>
                                    <td>25/5/2024</td>
                                    <td><span className="status completed">Xem hợp đồng</span></td>
                                </tr>
                            </tbody>
                        </table> */}
                    </div>
                </div>
                <ChitietHD show={modalShow} onHide={() => setModalShow(false)} />
            </main>
        </>
    )
}

export default HopDong;