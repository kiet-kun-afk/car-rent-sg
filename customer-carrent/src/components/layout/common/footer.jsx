import React from 'react';


function Footer() {
    return (
        <footer>
            <div className="c-footer">
                <div className="c-container">
                    <div className="c-footer-about">
                        <div className="about-col-1">
                            <div className="about-info">
                                <a className="about-logo" href=""> <img alt="carR" src="../img/logoCarrent.png" />
                                </a>
                                <div className="item-sub">
                                    <a className="sub-phone" href="">
                                        <p className="impor">1900 1900</p>
                                        <p>Tổng đài hỗ trợ: 7AM - 10PM</p>
                                    </a> <a className="sub-contact" href="">
                                        <p className="impor">contact@carr.vn</p>
                                        <p>Gửi mail cho CarR</p>
                                    </a>
                                </div>
                                <div className="about-item">
                                    <div className="payment">
                                        <img alt="" src="../img/fb_icon.png" /> <img alt="" src="../img/tiktok_icon.png" />
                                        <img alt="" src="../img/zalo_icon.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="about-col-2">
                            <div className="about-item">
                                <div className="item-sub">
                                    <p className="list-impor">CarrentSG</p>
                                    <div className="item-sub">
                                        <a href="">Về CarrentSG</a> <a href="">CarR Blog</a> <a href="">Tuyển dụng</a>
                                    </div>
                                </div>
                            </div>
                            <div className="about-item">
                                <div className="item-sub">
                                    <p className="list-impor">Chính Sách</p>
                                    <div className="item-sub">
                                        <a href="">Chính sách và quy định</a> <a href="">Quy chế
                                            hoạt động</a> <a href="">Bảo mật thông tin</a> <a href="">Giải
                                                quyết tranh chấp</a>
                                    </div>
                                </div>
                            </div>
                            <div className="about-item">
                                <div className="item-sub">
                                    <p className="list-impor">Tìm Hiểu Thêm</p>
                                    <div className="item-sub">
                                        <a href="">Hướng dẫn chung</a> <a href="">Hướng dẫn đặt xe</a> <a href="">Hướng dẫn
                                            thanh toán</a> <a href="">Hỏi đáp</a>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="about-item">
                                <div className="item-sub">
                                    <p className="list-impor">Đối Tác</p>
                                    <div className="item-sub">
                                        <a href="">Đăng ký chủ xe Mioto</a>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="line-black"></div>
                <div className="c-container">
                    <div className="c-footer-about">
                        <div className="about-col-1">
                            <div className="about-info">
                                <p>@ Công Ty Cổ Phần StudyHard</p>
                            </div>
                        </div>
                        <div className="about-col-2">
                            <div className="about-item">
                                <div className="item-sub">
                                    <p>Số GCNĐKKD: 123456789</p>
                                </div>
                            </div>
                            <div className="about-item">
                                <div className="item-sub">
                                    <p>Ngày cấp: 01-01-24</p>
                                </div>
                            </div>
                            <div className="about-item w50">
                                <div className="item-sub">
                                    <p>Nơi cấp: Sở ABC và XYZ TPHCM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="line-black"></div>
                <div className="c-container">
                    <div className="c-footer-about">
                        <div className="about-col-1">
                            <div className="about-info">
                                <p>Địa chỉ: Phòng 1104, Tầng 11, Tòa nhà T, Công Viên Phần Mềm
                                    Quang Trung, Quận 12, Thành phố Hồ Chí Minh, Việt Nam.</p>
                            </div>
                        </div>
                        <div className="about-col-2">
                            <div className="about-item">
                                <div className="item-sub">
                                    <p>Tên TK: CT CP StudyHard</p>
                                </div>
                            </div>
                            <div className="about-item">
                                <div className="item-sub">
                                    <p>Số TK: 123-456-7890</p>
                                </div>
                            </div>
                            <div className="about-item w50">
                                <div className="item-sub">
                                    <p>Ngân hàng StudyHard - CN HCM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="line-white"></div>
                <div className="c-container">
                    <div className="c-footer-about">
                        <div className="about-col-1">
                            <div className="about-info">
                                <a className="logo-goverment" href="#"> <img alt="" src="../img/bocongthuong.png" />
                                </a>
                            </div>
                        </div>
                        <div className="about-col-2 d-flex align-items-center">
                            <div className="about-item">
                                <div className="item-sub">
                                    <p>Phương Thức Thanh Toán</p>
                                </div>
                            </div>
                            <div className="about-item">
                                <div className="payment">
                                    <img alt="" src="../img/momo.png" />
                                    <img alt="" src="../img/vnpay.png" /> 
                                    {/* <img alt="" src="../img/visa.png" /> 
                                    <img alt="" src="../img/zalopay.png" />                               */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;