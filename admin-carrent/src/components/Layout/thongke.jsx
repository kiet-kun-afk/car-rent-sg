import React from "react";


function ThongKe() {
	return (
		<>
			<main>
				<div className="head-title">
					<div className="left">
						<h1>Thống Kê</h1>
						<ul className="breadcrumb">
							<li>
								<a href="#">Trang chủ</a>
							</li>
							<li><i className='bx bx-chevron-right'></i></li>
							<li>
								<a className="active" href="#">Thống kê</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="table-data">
					<div className="order">
						<div className="head">
							<h3>Lịch Sử Đơn Hàng</h3>
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
										<th>Mã HĐ</th>
										<th>Nhân Viên</th>
										<th>Thông Tin Xe</th>
										<th>Ngày Tạo HD</th>
										<th>Ngày Nhận</th>
										<th>Ngày Trả</th>
										<th>Tổng Tiền</th>
										<th className="th-status">Trạng Thái</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>HD001</td>
										<td>Dat Tran</td>
										<td>86-C2 012.02 - Vinfast Lux A2.0</td>
										<td>dd/MM/yyyy</td>
										<td>dd/MM/yyyy</td>
										<td>dd/MM/yyyy</td>
										<td>1.000.000</td>
										<td><span className="status completed">Đã xử lý</span></td>
									</tr>
									<tr>
										<td>2</td>
										<td>HD002</td>
										<td>Dat Tran</td>
										<td>86-C2 012.02 - Vinfast Lux A2.0</td>
										<td>dd/MM/yyyy</td>
										<td>dd/MM/yyyy</td>
										<td>dd/MM/yyyy</td>
										<td>1.000.000</td>
										<td><span className="status completed">Đã xử lý</span></td>
									</tr>
									<tr>
										<td>3</td>
										<td>HD003</td>
										<td>Dat Tran</td>
										<td>86-C2 012.02 - Vinfast Lux A2.0</td>
										<td>dd/MM/yyyy</td>
										<td>dd/MM/yyyy</td>
										<td>dd/MM/yyyy</td>
										<td>1.000.000</td>
										<td><span className="status completed">Đã xử lý</span></td>
									</tr>
								</tbody>
							</table>
						</div>

						{/* <table>
							<thead>
								<tr>
									<th>Mã hợp đồng</th>
									<th>Nhân Viên</th>
									<th>Biển Số Xe</th>
									<th>Tên Xe</th>
									<th>Ngày Thuê</th>
									<th>Ngày Trả</th>
									<th>Ngày Tạo Hợp Đồng</th>
									<th>Tổng Tiền</th>
									<th className="th-status">Trạng Thái</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>HD001</td>
									<td>
										<img src="../img/avatar_dattran.png" />
										<p>Dat Tran</p>
									</td>
									<td>86-C2 012.02 </td>
									<td>Vinfast Lux A2.0</td>
									<td>01-06-2024</td>
									<td>01-07-2024</td>
									<td>20-05-2024</td>
									<td>1.000.000</td>
									<td><span className="status completed">Đã xử lý</span></td>
								</tr>
								<tr>
									<td>HD001</td>
									<td>
										<img src="../img/avatar_dattran.png" />
										<p>Dat Tran</p>
									</td>
									<td>86-C2 012.02 </td>
									<td>Vinfast Lux A2.0</td>

									<td>01-06-2024</td>
									<td>01-07-2024</td>
									<td>20-05-2024</td>
									<td>1.000.000</td>
									<td><span className="status completed">Đã xử lý</span></td>
								</tr>
								<tr>
									<td>HD001</td>
									<td>
										<img src="../img/avatar_dattran.png" />
										<p>Dat Tran</p>
									</td>
									<td>86-C2 012.02 </td>
									<td>Vinfast Lux A2.0</td>

									<td>01-06-2024</td>
									<td>01-07-2024</td>
									<td>20-05-2024</td>
									<td>1.000.000</td>
									<td><span className="status completed">Đã xử lý</span></td>
								</tr>
								<tr>
									<td>HD001</td>
									<td>
										<img src="../img/avatar_dattran.png" />
										<p>Dat Tran</p>
									</td>
									<td>86-C2 012.02 </td>
									<td>Vinfast Lux A2.0</td>

									<td>01-06-2024</td>
									<td>01-07-2024</td>
									<td>20-05-2024</td>
									<td>1.000.000</td>
									<td><span className="status completed">Đã xử lý</span></td>
								</tr>
								<tr>
									<td>HD001</td>
									<td>
										<img src="../img/avatar_dattran.png" />
										<p>Dat Tran</p>
									</td>
									<td>86-C2 012.02 </td>
									<td>Vinfast Lux A2.0</td>

									<td>01-06-2024</td>
									<td>01-07-2024</td>
									<td>20-05-2024</td>
									<td>1.000.000</td>
									<td><span className="status completed">Đã xử lý</span></td>
								</tr>


							</tbody>
						</table> */}
					</div>
				</div>
			</main>
		</>
	);
}

export default ThongKe;