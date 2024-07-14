import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ChitietHoaDon(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Chi Tiết Đơn Hàng
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

function HoaDon() {
	const [modalShow, setModalShow] = React.useState(false);
	const handleOpen = () => setModalShow(true);
	const handleClose = () => setModalShow(false);

	return (
		<>
			<main>
				<div className="head-title">
					<div className="left">
						<h1>Đơn Hàng</h1>
						<ul className="breadcrumb">
							<li>
								<a href="#">Trang chủ</a>
							</li>
							<li><i className='bx bx-chevron-right' ></i></li>
							<li>
								<a className="active" href="#">Đơn Hàng</a>
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
							<h3>Hóa đơn thuê xe</h3>
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
										<th>Ngày Tạo</th>
										<th>Khách Hàng</th>
										<th>Thông Tin Xe</th>
										<th>Số Ngày</th>
										<th>Tổng Tiền</th>
										<th className="th-status">Trạng Thái</th>
										<th>Chi Tiết</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>HĐ01</td>
										<td>dd/MM/yyyy</td>
										<td>Trần Đình Thành Đạt</td>
										<td>51A-999.99 - Mercedes-AMG SL 63</td>
										<td>1</td>
										<td>10.000.000</td>
										<td className="status completed"><span className="status completed">Đã xử lý</span></td>
										<td><Button variant="light" onClick={handleOpen}><i class="fa-solid fa-eye"></i></Button></td>
									</tr>
									<tr>
										<td>1</td>
										<td>HĐ01</td>
										<td>dd/MM/yyyy</td>
										<td>Trần Đình Thành Đạt</td>
										<td>51A-999.99 - Mercedes-AMG SL 63</td>
										<td>1</td>
										<td>10.000.000</td>
										<td className="status completed"><span className="status completed">Đã xử lý</span></td>
										<td><Button variant="light" onClick={handleOpen}><i class="fa-solid fa-eye"></i></Button></td>
									</tr>
									<tr>
										<td>1</td>
										<td>HĐ01</td>
										<td>dd/MM/yyyy</td>
										<td>Trần Đình Thành Đạt</td>
										<td>51A-999.99 - Mercedes-AMG SL 63</td>
										<td>1</td>
										<td>10.000.000</td>
										<td className="status completed"><span className="status completed">Đã xử lý</span></td>
										<td><Button variant="light" onClick={handleOpen}><i class="fa-solid fa-eye"></i></Button></td>
									</tr>
								</tbody>
							</table>
						</div>
						{/* <table>
							<thead>
								<tr>
									<th>STT</th>
									<th>Mã hóa đơn</th>
									<th>Tên xe</th>
									<th>Biển số</th>
									<th>Đơn vị tính</th>
									<th>Số ngày thuê</th>
									<th>Đơn giá</th>
									<th>Ngày thuê xe</th>
									<th>Ngày trả xe</th>
									<th>Thành tiền</th>
									<th>Chi tiết</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>HD01</td>
									<td>
										Mercedes-AMG SL 63
									</td>
									<td>51A-999.99</td>
									<td>Chiếc </td>
									<td>2</td>

									<td>5.000.000</td>
									<td>22/5/2024</td>
									<td>24/5/2024</td>
									<td>10.000.000</td>
									<td><span className="status completed">Xem hóa đơn</span></td>
								</tr>
								<tr>
									<td>1</td>
									<td>HD01</td>
									<td>
										Mercedes-AMG SL 63
									</td>
									<td>51A-999.99</td>
									<td>Chiếc </td>
									<td>2</td>

									<td>5.000.000</td>
									<td>22/5/2024</td>
									<td>24/5/2024</td>
									<td>10.000.000</td>
									<td><span className="status completed">Xem hóa đơn</span></td>
								</tr>
								<tr>
									<td>1</td>
									<td>HD01</td>
									<td>
										Mercedes-AMG SL 63
									</td>
									<td>51A-999.99</td>
									<td>Chiếc </td>
									<td>2</td>

									<td>5.000.000</td>
									<td>22/5/2024</td>
									<td>24/5/2024</td>
									<td>10.000.000</td>
									<td><span className="status completed">Xem hóa đơn</span></td>
								</tr>
								<tr>
									<td>1</td>
									<td>HD01</td>
									<td>
										Mercedes-AMG SL 63
									</td>
									<td>51A-999.99</td>
									<td>Chiếc </td>
									<td>2</td>

									<td>5.000.000</td>
									<td>22/5/2024</td>
									<td>24/5/2024</td>
									<td>10.000.000</td>
									<td><span className="status completed">Xem hóa đơn</span></td>
								</tr>
								<tr>
									<td>1</td>
									<td>HD01</td>
									<td>
										Mercedes-AMG SL 63
									</td>
									<td>51A-999.99</td>
									<td>Chiếc </td>
									<td>2</td>

									<td>5.000.000</td>
									<td>22/5/2024</td>
									<td>24/5/2024</td>
									<td>10.000.000</td>
									<td><span className="status completed">Xem hóa đơn</span></td>
								</tr>
							</tbody>
						</table> */}
					</div>
				</div>
				<ChitietHoaDon show={modalShow} onHide={() => setModalShow(false)} />
			</main>
		</>
	);
}

export default HoaDon;