import React from 'react';

import '../../../style/styleForgotpass.css';

function Resetpass() {
    return(
        <div class="container-fluid p-0">
		<div class="forgot-container">
			<div class="forgot-form">
				<form action="" method="post">
					<div class="form-item">
						<h5 class="item-title">Nhập Mật Khẩu Mới</h5>
						<div class="item-form">
							<div class="mb-0">							
								<input name="newpw" type="password" class="form-control" placeholder="Mật Khẩu Mới"/>
							</div>
							<div class="form-error ${errorMessage==null?'d-lg-none':'' }">
								<span class="error-item">
									{/* <p>${errorMessage}</p> */}
								</span>								
							</div>	
							<div class="mt-3">						
								<input name="confirmpw" type="password" class="form-control" placeholder="Xác Nhận " />
							</div>					
							<div class="form-error ${errorMessage1==null?'d-lg-none':'' }">
								<span class="error-item">
									{/* <p>${errorMessage1}</p> */}
								</span>								
							</div>	
							<div class="form-error ${errorMessage2==null?'d-lg-none':'' }">
								<span class="error-item">
									{/* <p>${errorMessage2}</p> */}
								</span>								
							</div>						
							<div class="form-btn"> 
								<button class="btn btn-success"><i class='bx bx-right-arrow-alt' style={{color: "#ffffff"}}></i></button>
							</div>
							<div class="form-suggest">
								<span class="suggest-item">
									<a href="/car/login">Đăng Nhập</a>
								</span>
							</div>
						</div>						
					</div>
				</form>			
			</div>
		</div>	
	</div>
    );
}

export default Resetpass;