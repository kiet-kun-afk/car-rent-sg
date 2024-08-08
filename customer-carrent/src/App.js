import React, { useEffect, useState } from "react";
import {
	Routes,
	Route,
	Navigate,
	useLocation,
	useNavigate,
	BrowserRouter as Router,
} from "react-router-dom";
import CusLogin from "./components/layout/Login/login";
import CusRegis from "./components/layout/Login/register";
import CusForgot from "./components/layout/Login/forgot";
import CusConfirmOTP from "./components/layout/Login/sendOTP";
import CusResetpassword from "./components/layout/Login/resetpass";
import CusIndex from "./components/trangchu";
import CusProduct from "./components/layout/danhsachxe";
import CusDetailProduct from "./components/layout/chitietxe";
import CusDetailCustomer from "./components/layout/chitietkhachhang";
import CusDetailCustomerInfor from "./components/layout/common/inforCustomer";
import CusDetailCustomerTrip from "./components/layout/common/trip";
import CusDetailCustomerChangePass from "./components/layout/common/changepass";
import CusDetailCustomerPayment from "./components/layout/thanhtoan";
import PaymentSuccess from './components/layout/hoadon';
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./config/AuthContext";

const App = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const token = queryParams.get("token");
		if (token) {
			localStorage.setItem("token", token);
			// Xóa token từ URL và chuyển hướng đến trang thông tin khách hàng
			window.history.replaceState({}, document.title, location.pathname);
			navigate("/carrentsg");
		}
	}, [location, navigate]);

	return (
		<AuthProvider>
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/carrentsg" replace />}
				/>
				<Route path="/carrentsg/login" element={<CusLogin />} />
				<Route path="/carrentsg/register" element={<CusRegis />} />
				<Route path="/carrentsg/forgot" element={<CusForgot />} />
				<Route
					path="/carrentsg/confirmotp"
					element={<CusConfirmOTP />}
				/>
				<Route
					path="/carrentsg/resetpassword"
					element={<CusResetpassword />}
				/>
				<Route path="/carrentsg" element={<CusIndex />} />
				<Route path="/carrentsg/car" element={<CusProduct />} />
				<Route
					path="/carrentsg/car/:id"
					element={<CusDetailProduct />}
				/>
				<Route path="/carrentsg/payment/:contractId" element={<CusDetailCustomerPayment />} />
				<Route path="/user/paymentsuccess" element={<PaymentSuccess />} />
				<Route
					path="/carrentsg/customer"
					element={
						<PrivateRoute>
							<CusDetailCustomer />
						</PrivateRoute>
					}
				>
					<Route path="infor" element={<CusDetailCustomerInfor />} />
					<Route path="trip" element={<CusDetailCustomerTrip />} />
					<Route
						path="changepass"
						element={<CusDetailCustomerChangePass />}
					/>
				</Route>
			</Routes>
		</AuthProvider>
	);
};

const WrappedApp = () => (
	<Router>
		<App />
	</Router>
);

export default WrappedApp;
