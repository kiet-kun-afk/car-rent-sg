import "./App.css";
import React from "react";

import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";

import Login from "./components/login";

import Mainboard from "./components/mainboard";
import TrangChu from "./components/Layout/trangchu";
import Xe from "./components/Layout/xe";
import KhachHang from "./components/Layout/khachhang";
import HoaDon from "./components/Layout/hoadon";
import DonThue from "./components/Layout/donthue";
import ThongKe from "./components/Layout/thongke";
import BieuDo from "./components/Layout/bieudo";
import NhanVien from "./components/Layout/nhanvien";
import GiaoXe from "./components/Layout/bangiaoxe";
import TraXe from "./components/Layout/traxe";
import Error from "./components/error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/admin/login" replace />,
	},
	{
		path: "/admin/login",
		element: <Login />,
	},
	{
		path: "/admin",
		element: <Mainboard />,
		children: [
			{
				path: "/admin/trangchu",
				element: <TrangChu />,
			},
			{
				path: "/admin/xe",
				element: <Xe />,
			},
			{
				path: "/admin/khachhang",
				element: <KhachHang />,
			},
			{
				path: "/admin/hoadon",
				element: <HoaDon />,
			},
			{
				path: "/admin/donthue",
				element: <DonThue />,
			},
			{
				path: "/admin/thongke",
				element: <ThongKe />,
			},
			{
				path: "/admin/bieudo",
				element: <BieuDo />,
			},
			{
				path: "/admin/nhanvien",
				element: <NhanVien />,
			},
			{
				path: "/admin/giaoxe",
				element: <GiaoXe />,
			},
			{
				path: "/admin/traxe",
				element: <TraXe />,
			},
		],
	},
]);

function app() {
	return <RouterProvider router={router} />;
}

export default app;
