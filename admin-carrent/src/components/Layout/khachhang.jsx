import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


// function ChitietKH(props) {
//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Chi Tiết Khách Hàng
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                         <Form.Label>Email address</Form.Label>
//                         <Form.Control type="email" placeholder="name@example.com" />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//                         <Form.Label>Example textarea</Form.Label>
//                         <Form.Control as="textarea" rows={3} />
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={props.onHide}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

function KhachHang() {
    const [modalShow, setModalShow] = React.useState(false);
    const handleOpen = () => setModalShow(true);
    const handleClose = () => setModalShow(false);

    const formatDate = (localdatetime) => {
        // Tạo một đối tượng Date từ localdatetime
        const date = new Date(localdatetime);

        // Lấy ra ngày, tháng và năm
        const day = date.getDate();
        const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
        const year = date.getFullYear();

        // Định dạng lại thành dd/MM/yyyy
        const formattedDate = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month
            }/${year}`;

        return formattedDate;
    };
    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Khách Hàng</h1>
                        <ul className="breadcrumb">
                            <li>
                                <a href="#">Trang chủ</a>
                            </li>
                            <li><i className='bx bx-chevron-right' ></i></li>
                            <li>
                                <a className="active" href="#">Khách hàng</a>
                            </li>
                        </ul>
                    </div>
                    <a href="#" className="btn-download">
                        <i className='bx bxs-cloud-download' ></i>
                        <span className="text">Download PDF</span>
                    </a>
                </div>

                {/* Table */}
                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3>Danh sách khách hàng</h3>
                            <form action="" id="search-box">
                                <input type="text" id="search-text" placeholder="Bạn cần tìm kiếm gì nhỉ?" />
                                <button id="search-btn"><i className='bx bx-search'></i></button>
                            </form>
                            <div className="dropdown">
                                <button className="dropbtn"><i className='bx bx-filter'></i></button>
                                <div className="dropdown-content">
                                    <a href="#">Sắp xếp A-Z</a>
                                    <a href="#">Sắp xếp Z-A</a>
                                </div>
                            </div>
                        </div>
                        <div className='table-responsive rounded'>
                            <table className='table table-hover text-center m-0'>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã KH</th>
                                        <th>Họ Tên</th>
                                        <th>Giới Tính</th>
                                        <th>Số Điện Thoại</th>
                                        <th>Email</th>
                                        <th>Địa Chỉ</th>
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
                                        <td>Quận 12, TP.HCM</td>
                                        <td className="status completed"><span className="status completed">Hoạt động</span></td>
                                        <td><button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#chitietKH">
                                            <i class="fa-solid fa-eye"></i>
                                        </button></td>
                                        {/* <td><Button variant="light" onClick={handleOpen}><i class="fa-solid fa-eye"></i></Button></td> */}
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>NV01</td>
                                        <td>Trần Đình Thành Đạt</td>
                                        <td>Nam</td>
                                        <td>030303030</td>
                                        <td>dat@gmail.com</td>
                                        <td>Quận 12, TP.HCM</td>
                                        <td className="status completed"><span className="status process">Ngưng hoạt động</span></td>
                                        <td><button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#chitietKH">
                                            <i class="fa-solid fa-eye"></i>
                                        </button></td>
                                        {/* <td><Button variant="light" onClick={handleOpen}><i class="fa-solid fa-eye"></i></Button></td> */}
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>NV01</td>
                                        <td>Trần Đình Thành Đạt</td>
                                        <td>Nam</td>
                                        <td>030303030</td>
                                        <td>dat@gmail.com</td>
                                        <td>Quận 12, TP.HCM</td>
                                        <td className="status completed"><span className="status pending">Ngưng hoạt động</span></td>
                                        <td><button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#chitietKH">
                                            <i class="fa-solid fa-eye"></i>
                                        </button></td>
                                        {/* <td><Button variant="light" onClick={handleOpen}><i class="fa-solid fa-eye"></i></Button></td> */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                {/* <!-- Modal --> */}
                <div class="modal fade" id="chitietKH" tabindex="-1" aria-labelledby="chitietKHLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="chitietKHLabel">Chi tiết khách hàng</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="container-custom">
                                    <div class="row">
                                        <div class="col-md-6 ">
                                            <div class="profile-info">
                                                <img src="../img/avatar-4.png" alt="Profile Picture" />
                                            </div>
                                            <div class="profile-details">
                                                <h3>Người dùng</h3>
                                                <div class="row m-0">
                                                    <div class="col-sm-9">
                                                        <p>Tham gia: dd/MM/yyyy</p>
                                                    </div>
                                                    <div class="col-sm-3 p-0 d-flex align-items-center justify-content-center">
                                                        <span class="badge text-bg-success">Hoạt động</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 contact-info">
                                            <div class="contact-detail">
                                                <div class="form-group mt-3">
                                                    <label for="gplx">Số điện thoại</label>
                                                    <input type="text" id="gplx" value="030303030" class="form-control" readonly />
                                                </div>
                                                <div class="form-group mt-3">
                                                    <label for="name">Email</label>
                                                    <input type="text" id="name" value="Email@gmail.com" class="form-control" readonly />
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="name">Giới tính</label>
                                                            <input type="text" id="name" value="Nam" class="form-control" readonly />
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="dob">Ngày sinh</label>
                                                            <input type="date" id="dob" value="dd/MM/yyyy" class="form-control" readonly />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group mt-3">
                                                    <label for="gplx">Địa chỉ</label>
                                                    <input type="text" id="address" value="Quận 1, TP.HCM" class="form-control" readonly />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="container-custom">
                                    <div class="header-custom">
                                        <h2>Giấy phép lái xe</h2>
                                    </div>
                                    {/* <!-- <div class="alert-custom">
                                        Lưu ý: để tránh phát sinh vấn đề trong quá trình thuê xe, người đặt xe trên Mioto (đã xác
                                        thực GPLX) đồng thời phải là người nhận xe.
                                    </div> --> */}
                                    <div class="row m-0 license-content">
                                        <div class="col-md-4 left">
                                            <img class="img-fluid rounded mx-auto" src="../img/avatar-4.png" alt="Upload Icon" />
                                        </div>
                                        <div class="col-md-8 ps-4 right">
                                            <div class="form-group">
                                                <label for="gplx">Số GPLX</label>
                                                <input type="text" id="gplx" value="Nhập số GPLX đã cấp" class="form-control" disabled />
                                            </div>
                                            <div class="form-group">
                                                <label for="name">Họ và tên</label>
                                                <input type="text" id="name" value="Nhập đầy đủ họ tên" class="form-control" disabled />
                                            </div>
                                            <div class="form-group">
                                                <label for="dob">Ngày sinh</label>
                                                <input type="text" id="dob" value="01-01-1970" class="form-control" disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                <button type="button" class="btn btn-success">Cập nhật trạng thái</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <ChitietKH show={modalShow} onHide={() => setModalShow(false)} /> */}
            </main>
        </>
    );
}

export default KhachHang;