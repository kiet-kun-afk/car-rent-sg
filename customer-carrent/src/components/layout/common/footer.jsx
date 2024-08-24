import React from "react";
import { useTranslation } from 'react-i18next';


import iconFB from "../../images/fb_icon.png";
import iconTiktok from "../../images/tiktok_icon.png";
import iconZalo from "../../images/zalo_icon.png";
import iconBCT from "../../images/bocongthuong.png";
import iconMM from "../../images/momo.png";
import iconVNP from "../../images/vnpay.png";

function Footer() {
	const { t } = useTranslation();

	const iconCarrent =
		"https://firebasestorage.googleapis.com/v0/b/carrentsg-30cbe.appspot.com/o/logoCarrent.png?alt=media&token=224f6d6b-844e-4c21-b2f9-b6b723ddb95e";
	return (
		<footer>
			<div className="c-footer">
				<div className="c-container">
					<div className="c-footer-about">
						<div className="about-col-1">
							<div className="about-info">
								<a className="about-logo" href="/carrentsg">
									{" "}
									<img alt="carR" src={iconCarrent} />
								</a>
								<div className="item-sub">
									<a className="sub-phone" href="">
										<p className="impor">1900 1900</p>
										<p>{t('support_line')}</p>
									</a>{" "}
									<a className="sub-contact" href="">
										<p className="impor">
											contact@carrent.vn
										</p>
										<p>{t('send_email')}</p>
									</a>
								</div>
								<div className="about-item">
									<div className="payment">
										<img alt="" src={iconFB} />{" "}
										<img alt="" src={iconTiktok} />
										<img alt="" src={iconZalo} />
									</div>
								</div>
							</div>
						</div>
						<div className="about-col-2">
							<div className="about-item">
								<div className="item-sub">
									<p className="list-impor">CarRentSG</p>
									<div className="item-sub">
										<a href="">{t('about_us')}</a>
										<a href="">{t('blog')}</a>
										<a href="">{t('careers')}</a>
									</div>
								</div>
							</div>
							<div className="about-item">
								<div className="item-sub">
									<p className="list-impor">{t('policy')}</p>
									<div className="item-sub">
										<a href="">{t('policy_rules')}</a>
										<a href="">{t('operation_regulations')}</a>
										<a href="">{t('privacy_policy')}</a>
										<a href="">{t('dispute_resolution')}</a>
									</div>
								</div>
							</div>
							<div className="about-item">
								<div className="item-sub">
									<p className="list-impor">{t('learn_more')}</p>
									<div className="item-sub">
										<a href="">{t('general_guide')}</a>
										<a href="">{t('car_booking_guide')}</a>
										<a href="">{t('payment_guide')}</a>
										<a href="">{t('faq')}</a>
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
								<p>@ {t('company_name')}</p>
							</div>
						</div>
						<div className="about-col-2">
							<div className="about-item">
								<div className="item-sub">
									<p>{t('business_license')}</p>
								</div>
							</div>
							<div className="about-item">
								<div className="item-sub">
									<p>{t('issue_date')}</p>
								</div>
							</div>
							<div className="about-item w50">
								<div className="item-sub">
									<p>{t('issue_place')}</p>
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
								<p>{t('address_footer')}</p>
							</div>
						</div>
						<div className="about-col-2">
							<div className="about-item">
								<div className="item-sub">
									<p>{t('account_name')}</p>
								</div>
							</div>
							<div className="about-item">
								<div className="item-sub">
									<p>{t('account_number')}</p>
								</div>
							</div>
							<div className="about-item w50">
								<div className="item-sub">
									<p>{t('bank')}</p>
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
								<a className="logo-goverment" href="#">
									{" "}
									<img alt="" src={iconBCT} />
								</a>
							</div>
						</div>
						<div className="about-col-2 d-flex align-items-center">
							<div className="about-item">
								<div className="item-sub">
									<p>{t('payment_methods')}</p>
								</div>
							</div>
							<div className="about-item">
								<div className="payment">
									<img alt="" src={iconMM} />
									<img alt="" src={iconVNP} />
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
