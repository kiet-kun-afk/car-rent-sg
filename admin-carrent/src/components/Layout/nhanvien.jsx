import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ChitietNV(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Chi Tiết Nhân Viên
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

function NhanVien() {
    const [modalShow, setModalShow] = React.useState(false);
    const handleOpen = () => setModalShow(true);
    const handleClose = () => setModalShow(false);

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Nhân Viên</h1>
                        <ul className="breadcrumb">
                            <li>
                                <a href="#">Trang chủ</a>
                            </li>
                            <li><i className='bx bx-chevron-right' ></i></li>
                            <li>
                                <a className="active" href="#">Nhân viên</a>
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
                            <h3>Danh sách nhân viên</h3>
                            <form action="" id="search-box">
                                <input type="text" id="search-text" placeholder="Bạn cần tìm kiếm gì nhỉ?" />
                                <button id="search-btn"><i className='bx bx-search' ></i></button>
                            </form>

                            <div className="dropdown" >
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
                                        <th>Mã NV</th>
                                        <th>Họ Tên</th>
                                        <th>Giới Tính</th>
                                        <th>Số Điện Thoại</th>
                                        <th>Email</th>
                                        <th className="th-status">Trạng Thái</th>
                                        <th>Chi Tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>NV01</td>
                                        <td>Trần Đình Thành Đạt</td>
                                        <td>Nam</td>
                                        <td>030303030</td>
                                        <td>dat@gmail.com</td>
                                        <td className="status completed"><span className="status completed">Hoạt động</span></td>
                                        <td><Button variant="light" onClick={handleOpen}><i class='bx bx-cog'></i></Button></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>NV01</td>
                                        <td>Trần Đình Thành Đạt</td>
                                        <td>Nam</td>
                                        <td>030303030</td>
                                        <td>dat@gmail.com</td>
                                        <td className="status completed"><span className="status process">Tạm khóa</span></td>
                                        <td><Button variant="light" onClick={handleOpen}><i class='bx bx-cog'></i></Button></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>NV01</td>
                                        <td>Trần Đình Thành Đạt</td>
                                        <td>Nam</td>
                                        <td>030303030</td>
                                        <td>dat@gmail.com</td>
                                        <td className="status completed"><span className="status pending">Không hoạt động</span></td>
                                        <td><Button variant="light" onClick={handleOpen}><i class='bx bx-cog'></i></Button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <ChitietNV show={modalShow} onHide={() => setModalShow(false)} />
            </main>

        </>
    );
}

export default NhanVien;