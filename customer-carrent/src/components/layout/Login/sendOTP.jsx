import React from 'react';

import '../../../style/styleForgotpass.css';

function SendOTP() {
    return (
        <div class="container-fluid p-0">
            <div class="forgot-container">
                <div class="d-flex" style={{width: "1250px"}}>
                    <div class="page-item">
                        <div class="page-title me-auto p-2">
                            <h1>XÁC THỰC MÃ OTP</h1>
                        </div>
                    </div>

                    <div class="p-2">
                        <div class="forgot-form">
                            <form action="" method="post">
                                <div class="form-item">
                                    <div class="item-title">
                                        <h1>Nhập OTP</h1>
                                        <h5>OTP Được Gửi Về Email Của Bạn.</h5>
                                    </div>
                                    <div class="item-form">
                                        <div class="mb-3">
                                            <input name="maotp" type="text" class="form-control" placeholder="Mã OTP" />
                                        </div>
                                        <div class="form-error ${errorMessage==null?'d-lg-none':'' }">
                                            {/* <span class="error-item">
                                                <p>${errorMessage}</p>
                                            </span> */}
                                        </div>
                                        <div class="form-btn">
                                            <button class="btn btn-success"><i class='bx bx-right-arrow-alt' style={{color: "#ffffff"}}></i></button>
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

export default SendOTP;