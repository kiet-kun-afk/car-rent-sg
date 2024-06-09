import React from 'react';

import '../../../style/styleForgotpass.css';

function Forgotpass() {
    return (
        <div class="container-fluid p-0">
            <div class="forgot-container">
                <div class="d-flex" style={{width: '1250px'}}>
                    <div class="page-item">
                        <div class="page-title me-auto p-2">
                            <h1>QUÊN MẬT KHẨU</h1>
                        </div>
                    </div>

                    <div class="p-2">
                        <div class="forgot-form">
                            <form action="" method="post">
                                <div class="form-item">
                                    <div class="item-title">
                                        <h1>Nhập Email</h1>
                                        <h5>Email được dùng để đăng ký tài khoản.</h5>
                                    </div>
                                    <div class="item-form">
                                        <div class="mb-3">
                                            <input name="email" type="text" class="form-control" placeholder="Email" />
                                        </div>
                                        <div class="form-error ${errorMessage==null?'d-lg-none':'' }">
                                            {/* <span class="error-item">
                                                <p>${errorMessage}</p>
                                            </span> */}
                                        </div>
                                        <div class="form-btn">
                                            <button class="btn btn-success"><i class='bx bx-right-arrow-alt' style={{color: '#ffffff'}}></i></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forgotpass;