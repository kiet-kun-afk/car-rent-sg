import React from "react";
import * as chartJS from '../../adminJS/thongkeChart';

function bieuDo() {
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
							<li><i className='bx bx-chevron-right' ></i></li>
							<li>
								<a className="active" href="#">Thống kê</a>
							</li>
						</ul>
					</div>
					<a href="#" className="btn-download">
						<i className='bx bxs-cloud-download' ></i>
						<span className="text">Download PDF</span>
					</a>
				</div>

				<ul className="box-info">
					<li>
						<i className='bx bxs-calendar-check' ></i>
						<span className="text">
							<h3>7979</h3>
							<p>Đơn Hàng Mới</p>
						</span>
					</li>
					<li>
						<i className='bx bxs-group' ></i>
						<span className="text">
							<h3>2024</h3>
							<p>Khách Hàng</p>
						</span>
					</li>
					<li>
						<i className='bx bxs-dollar-circle' ></i>
						<span className="text">
							<h3>1.000.000</h3>
							<p>Doanh Thu</p>
						</span>
					</li>
				</ul>

				<div className="table-data">
					<div className="order">
						<canvas id="myChart2"></canvas>
					</div>

					<div className="todo">
						<canvas id="myChart"></canvas>
					</div>
				</div>
			</main>

		</>
	);
}

export default bieuDo;