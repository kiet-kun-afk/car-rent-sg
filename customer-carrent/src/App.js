import './App.css';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";



import CusLogin from './components/layout/Login/login';
import CusRegis from './components/layout/Login/register';
import CusForgot from './components/layout/Login/forgot';
import CusConfirmOTP from './components/layout/Login/sendOTP';
import CusResetpassword from './components/layout/Login/resetpass';
import CusIndex from './components/trangchu';
import CusProduct from './components/layout/danhsachxe';
import CusDetailProduct from './components/layout/chitietxe';
import CusDetailCustomer from './components/layout/chitietkhachhang';
import CusDetailCustomerInfor from './components/layout/common/inforCustomer';
import CusDetailCustomerTrip from './components/layout/common/trip';
import CusDetailCustomerChangePass from './components/layout/common/changepass';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <Navigate to="/carrentsg" replace />,
  },
  {
    path: "/carrentsg/login",
    element: <CusLogin/>,
  },
  {
    path: "/carrentsg/register",
    element: <CusRegis/>,
  },
  {
    path: "/carrentsg/forgot",
    element: <CusForgot/>,
  },
  {
    path: "/carrentsg/confirmotp",
    element: <CusConfirmOTP/>,
  },
  {
    path: "/carrentsg/resetpassword",
    element: <CusResetpassword/>,
  },
  {
    path: "/carrentsg",
    element: <CusIndex/>,
  },
  {
    path: "/carrentsg/car",
    element: <CusProduct/>,
  },
  {
    path: "/carrentsg/car/:id",
    element: <CusDetailProduct/>,
  },
  {
    path: "/carrentsg/customer",
    element: <CusDetailCustomer/>,
    children:[
      {
        path: "/carrentsg/customer/infor",
        element: <CusDetailCustomerInfor/>,
      },
      {
        path: "/carrentsg/customer/trip",
        element: <CusDetailCustomerTrip/>,
      },
      {
        path: "/carrentsg/customer/changepass",
        element: <CusDetailCustomerChangePass/>,
      },
    ]
  },
  // {
  //   path: "/abc",
  //   element: <Mainboard/>,
  //   errorElement: <Error/>,
  //   children:[
  //     {
  //       path: "/trangchu",
  //       element: <TrangChu/>,
  //     },
  //     {
  //       path: "/xe",
  //       element: <Xe/>,
  //     },
  //     {
  //       path: "/khachhang",
  //       element: <KhachHang/>,
  //     },
  //     {
  //       path: "/hoadon",
  //       element: <HoaDon/>,
  //     },
  //     {
  //       path: "/hopdong",
  //       element: <HopDong/>,
  //     }
  //   ]
  // }, 
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
