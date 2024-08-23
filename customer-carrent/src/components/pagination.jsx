import React from "react";

const Pagination = ({
	totalPages,
	pageNumber,
	setPageNumber,
	handleChangePage,
}) => {
	const generatePagination = () => {
		const pages = [];
		const maxPagesToShow = 5;
		const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

		let startPage = Math.max(pageNumber - halfMaxPagesToShow, 1);
		let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

		if (endPage - startPage < maxPagesToShow - 1) {
			startPage = Math.max(endPage - maxPagesToShow + 1, 1);
		}

		// Thêm trang đầu tiên và dấu ba chấm nếu cần
		if (startPage > 1) {
			pages.push(1);
			if (startPage > 2) {
				pages.push("...");
			}
		}

		// Thêm các trang ở giữa
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		// Thêm trang cuối cùng và dấu ba chấm nếu cần
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pages.push("...");
			}
			pages.push(totalPages);
		}

		return pages;
	};

	const pages = generatePagination();

	return (
		<div className="row m-0">
			{pages.map((page, index) => (
				<div key={index} className="col-sm-1 col-md-1 col-lg-1">
					<button
						type="button"
						className={`btn btn-pagination ${
							pageNumber === page - 1 ? "active" : ""
						}`}
						onClick={() => {
							if (page !== "...") {
								setPageNumber(page - 1);
								handleChangePage(page - 1);
							}
						}}
						disabled={page === "..."}
					>
						{page}
					</button>
				</div>
			))}
		</div>
	);
};

export default Pagination;
