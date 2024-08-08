import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Import default

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// Lấy token từ localStorage
		const token = localStorage.getItem("token");

		if (token) {
			try {
				// Giải mã token để lấy thông tin
				const decodedToken = jwtDecode(token);
				const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây

				// Kiểm tra token đã hết hạn hay chưa
				if (decodedToken.exp < currentTime) {
					// Token đã hết hạn
					localStorage.removeItem("token");
					setIsLoggedIn(false);
				} else {
					// Token còn hợp lệ
					setIsLoggedIn(true);
				}
			} catch (error) {
				// Nếu có lỗi trong quá trình giải mã token, xóa token
				localStorage.removeItem("token");
				setIsLoggedIn(false);
			}
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
