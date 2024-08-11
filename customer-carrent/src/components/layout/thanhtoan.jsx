import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import Header from "./common/header";
import Footer from "./common/footer";
import PaymentMethodAccordion from './PaymentMethodAccordion';

function PaymentMethod() {
    const [contractDetails, setContractDetails] = useState(null);
    const { contractId } = useParams();

    useEffect(() => {
        console.log('Contract ID:', contractId); // Debug log to check contractId
        const fetchData = async () => {
            if (!contractId || isNaN(contractId)) {
                console.error('Invalid contract ID:', contractId);
                return;
            }
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/payments/${contractId}`);
                setContractDetails(res.data.data);
                console.log(res.data.data)
            } catch (error) {
                console.error('Error fetching contract details:', error);
            }
        };

        fetchData();
    }, [contractId]);

    const [paymentMethod, setPaymentMethod] = useState(null);


    const handlePayment = async () => {
        let endpoint = '';
        let payload = new URLSearchParams();
        payload.append('contractId', contractDetails.contractId);

        if (paymentMethod === 'momo') {
            endpoint = `http://localhost:8080/api/v1/payments/momo`;
        } else if (paymentMethod === 'vnpay') {
            endpoint = `http://localhost:8080/api/v1/payments/vnpay`;
        } else {
            alert('Please select a payment method');
            return;
        }

        try {
            const response = await axios.post(endpoint, payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            const data = response.data;
            console.log('Response data:', data);

            if (data.status === 'OK') {
                window.location.href = data.paymentUrl;
            } else {
                console.error('Payment failed:', data.message);
                alert('Payment failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error during payment:', error);
            alert('Error during payment: ' + error.message);
        }
    };
    const formatDate = (dateString) => {
        if (!dateString) return 'Loading...';
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    const [selectedCard, setSelectedCard] = useState('');

    const handleCardChange = (event) => {
        setSelectedCard(event.target.value);
    };

   


    return (
        <div>
            <Header />
            {contractDetails ? (
                <div className="container-sm border-2">
                    <h1 className="mb-5 mt-2 text-center">Chọn Phương Thức Thanh Toán</h1>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="accordion" id="paymentMethodsAccordion">
                                <PaymentMethodAccordion
                                    id="collapseFive"
                                    headerId="headingFive"
                                    targetId="collapseFive"
                                    iconClass="fa-exchange-alt"
                                    title="Chuyển khoản ngân hàng"
                                >
                                    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
                                        <ol>
                                            <li>
                                                Bấm <strong>“ĐẶT CHỖ”</strong> để xác nhận lựa chọn hình thức thanh toán chuyển khoản ngân hàng.
                                            </li>
                                            <li>
                                                Bạn vui lòng chuyển tiền vào tài khoản CARRENTSG trong vòng <span style={{ color: 'blue' }}>56 phút</span> kể từ lúc đặt chỗ
                                            </li>
                                        </ol>
                                        <div style={{ backgroundColor: '#e0f3ff', padding: '20px', marginTop: '10px', borderRadius: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src="https://s-vnba-cdn.aicms.vn/vnba-media/23/8/11/2-logo-vietcombank-voi-y-nghia-rieng_64d5f7a4a4311.png" alt="Vietcombank" style={{ width: '200px', marginRight: '10px' }} />
                                                <div>
                                                    <strong style={{ color: '#3b7dd8' }}>Ngân hàng: Ngân hàng Vietcombank</strong>
                                                    <p>Số tài khoản: 102-989-1989</p>
                                                    <p>Chủ tài khoản: CÔNG TY CỔ PHẦN CARRENTSG</p>
                                                    <p>Nội dung chuyển khoản: Tên tài khoản + SĐT</p>
                                                </div>
                                            </div>
                                        </div>
                                        <ol start="3">
                                            <li>
                                                Chụp lại màn hình <strong>“Chuyển khoản thành công”</strong> và gửi đến <a href="https://www.facebook.com/mioto.vn">CARRENTSG fanpage</a> hoặc <a href="mailto:contact@mioto.vn">contact@carrentsg.vn</a>. Sau khi nhận được hình chụp từ bạn hoặc có tin nhắn tiền đã vào tài khoản, CARRENTSG sẽ gửi thông báo đặt cọc thành công và thông tin chủ xe qua tin nhắn sms và ứng dụng.
                                            </li>
                                        </ol>
                                    </div>
                                </PaymentMethodAccordion>

                                <PaymentMethodAccordion
                                    id="collapseTwo"
                                    headerId="headingTwo"
                                    targetId="collapseTwo"
                                    iconClass="fa-wallet"
                                    title="Thanh toán trực tuyến - Ví điện tử"
                                >
                                    <div>
                                        <ol>
                                            <li>Lựa chọn ví điện tử</li>
                                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

                                                    <label htmlFor="e-wallet-momo" style={{ marginLeft: '8px' }}>
                                                        <img
                                                            src="https://cdn.tgdd.vn/2020/03/GameApp/Untitled-2-200x200.jpg"
                                                            alt="MoMo"
                                                            style={{ width: '100px' }}
                                                        />
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        id="e-wallet-momo"
                                                        name="payment-method"
                                                        value="momo"
                                                        style={{ width: '100px' }}
                                                        onChange={() => setPaymentMethod('momo')}
                                                    />
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center' }}>

                                                    <label htmlFor="e-wallet-vnpay" style={{ marginLeft: '8px' }}>
                                                        <img
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                                                            alt="VNPay"
                                                            style={{ width: '100px' }}
                                                        />
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        id="e-wallet-vnpay"
                                                        name="payment-method"
                                                        value="vnpay"
                                                        style={{ width: '100px' }}
                                                        onChange={() => setPaymentMethod('vnpay')}
                                                    />
                                                </div>
                                            </div>

                                            <li>Bấm <b>"THANH TOÁN"</b> để chuyển hướng về ví điện tử và tiến hành đặt cọc.</li>
                                            <li>Nhập thông tin tài khoản hoặc quét mã thanh toán.</li>
                                            <li>Sau khi thanh toán, bạn sẽ nhận được thông báo đặt xe thành công và thông tin chủ xe qua tin nhắn và qua ứng dụng/website CarrentSG.</li>
                                        </ol>
                                    </div>

                                </PaymentMethodAccordion>
                                <PaymentMethodAccordion
                                    id="collapseThree"
                                    headerId="headingThree"
                                    targetId="collapseThree"
                                    iconClass="fa-globe"
                                    title="Thanh toán trực tuyến - Thẻ quốc tế (Visa, Master, JCB)"
                                >
                                    <div>
                                        <ol>
                                            <li>Trên thẻ phải có các ký hiệu VISA, MASTER để thanh toán được bằng hình thức này.</li>
                                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

                                                    <label htmlFor="e-wallet-momo" style={{ marginLeft: '8px' }}>
                                                        <img
                                                            src="https://cdn.tgdd.vn/2020/03/GameApp/Untitled-2-200x200.jpg"
                                                            alt="MoMo"
                                                            style={{ width: '100px' }}
                                                        />
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        id="e-wallet-momo"
                                                        name="payment-method"
                                                        value="momo"
                                                        style={{ width: '100px' }}
                                                        onChange={() => setPaymentMethod('momo')}
                                                    />
                                                </div>


                                            </div>

                                            <li>Bấm <b>"THANH TOÁN"</b> để chuyển hướng về ví điện tử và tiến hành đặt cọc.</li>
                                            <li>Nhập thông tin tài khoản hoặc quét mã thanh toán.</li>
                                            <li>Sau khi thanh toán, bạn sẽ nhận được thông báo đặt xe thành công và thông tin chủ xe qua tin nhắn và qua ứng dụng/website CarrentSG.</li>
                                        </ol>
                                    </div>
                                </PaymentMethodAccordion>
                                <PaymentMethodAccordion
                                    id="collapseFour"
                                    headerId="headingFour"
                                    targetId="collapseFour"
                                    iconClass="fa-university"
                                    title="Thanh toán trực tuyến - Thẻ nội địa (ATM)"
                                >
                                    <div>
                                        <ol>
                                            <li>Trên thẻ bạn phải có đăng ký dịch vụ thanh toán trực tuyến với ngân hàng</li>
                                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>


                                                <div style={{ display: 'flex', alignItems: 'center' }}>

                                                    <label htmlFor="e-wallet-vnpay" style={{ marginLeft: '8px' }}>
                                                        <img
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                                                            alt="VNPay"
                                                            style={{ width: '100px' }}
                                                        />
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        id="e-wallet-vnpay"
                                                        name="payment-method"
                                                        value="vnpay"
                                                        style={{ width: '100px' }}
                                                        onChange={() => setPaymentMethod('vnpay')}
                                                    />
                                                </div>
                                            </div>

                                            <li>Bấm <b>"THANH TOÁN"</b> để chuyển hướng về ví điện tử và tiến hành đặt cọc.</li>
                                            <li>Nhập thông tin tài khoản hoặc quét mã thanh toán.</li>
                                            <li>Sau khi thanh toán, bạn sẽ nhận được thông báo đặt xe thành công và thông tin chủ xe qua tin nhắn và qua ứng dụng/website CarrentSG.</li>
                                        </ol>
                                    </div>
                                </PaymentMethodAccordion>

                                <PaymentMethodAccordion
                                    id="collapseSix"
                                    headerId="headingSix"
                                    targetId="collapseSix"
                                    iconClass="fa-gift"
                                    title="Dùng thẻ quà Got-it"
                                >
                                    <input type="text" className="form-control" placeholder="Nhập mã thẻ quà Got-it" />
                                    <button className="btn btn-primary mt-2" style={{ backgroundColor: '#5fcf86' }}>Áp Dụng</button>
                                </PaymentMethodAccordion>
                                <PaymentMethodAccordion
                                    id="collapseOne"
                                    headerId="headingOne"
                                    targetId="collapseOne"
                                    iconClass="fa-credit-card"
                                    title="Thanh toán qua thẻ của tôi"
                                >

                                </PaymentMethodAccordion>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="summary-card border-0">
                                <div className="row">
                                    <div className="col-6">
                                        <img src={contractDetails.carImage || 'default-image-url'} alt="" className="w-100" />
                                    </div>
                                    <div className="col-6">
                                        <div className="car-title">{contractDetails.carName || 'Loading...'}</div>
                                        <div>
                                            <label htmlFor="">
                                                <i className="fa-solid fa-star me-2" style={{ color: '#FFD43B' }}></i> 4.8
                                            </label>
                                            <label htmlFor="" className="ms-3">|</label>
                                            <label htmlFor="">
                                                <i className="fa-solid fa-trophy ms-4 me-2" style={{ color: '#63E6BE' }}></i> 52 chuyến
                                            </label>
                                        </div>
                                        <div>
                                            <i className="fas fa-map-marker-alt"></i> Quận Tân Bình, Thành phố Hồ Chí Minh
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-5">
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-12">Nhận xe</div>
                                            <div className="col-12">
                                                <b>{formatDate(contractDetails.startDate)}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-12">Trả xe</div>
                                            <div className="col-12">
                                                <b>{formatDate(contractDetails.endDate)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 mt-4">
                                    <div className="row">
                                        <div className="col-12">Địa điểm nhận xe</div>
                                        <div className="col-12"><b>Thảo Điền, Quận 2, Tp HCM</b></div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-6">
                                        <div className="col-12">Đơn giá thuê</div>
                                        <div className="col-12">Đơn giá Phi dịch vụ</div>
                                        <div className="col-12">Phí bảo hiểm</div>
                                    </div>
                                    <div className="col-6">
                                        <div className="col-12"><b>{contractDetails.rentCost}đ / ngày</b></div>

                                    </div>
                                </div>
                                <div className="total-price mt-3">Tổng giá trị: <b>{contractDetails.totalRentCost} </b> đ / ngày</div>
                                <div className="total-price mt-3">Đặt cọc trước: <b>{contractDetails.totalRentCost * 20 / 100} </b> đ</div>
                                <button className="btn w-100 mt-3 text-white" style={{ backgroundColor: '#5fcf86' }} onClick={handlePayment}>Thanh toán</button>                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading</p>
            )}
            <Footer />
        </div>
    );
};

export default PaymentMethod;
