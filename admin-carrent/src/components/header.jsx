import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../config/axiosConfig";

import avatarIMG from "../images/avatar-4.png";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axiosConfig.get(
        "http://localhost:8080/api/v1/staffs/current-staff"
      );
      setUser(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/admin/login");
    localStorage.removeItem("token");
  };

  const userAccount = localStorage.getItem("token");
  //console.log(userAccount);

  useEffect(() => {
    if (userAccount) {
      fetchUser();
    }
  }, []);

  return (
    <nav>
      {/* <i className="bx bx-menu" id="btn-menu"></i>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form> */}
      {/* <div className="mode">
                <div className="moon-sun">
                    <i className='bx bx-moon moon'></i>
                    <i className='bx bx-sun sun'></i>
                </div>
                <span id="mode-text" className="mode-text">Dark Mode</span>
                <input type="checkbox" id="switch-mode" hidden />
                <label htmlFor="switch-mode" className="switch-mode"></label>
            </div> */}
      {user !== null ? (
        <>
          {/* <a href="#" className="notification">
                            <i className='bx bxs-bell' ></i>
                            <span className="num">99</span>
                        </a> */}
          <div href="#" className=" profile ms-auto">
            <span>{user.fullName}</span>
            <img
              src={user.avatarImage == null ? avatarIMG : user.avatarImage}
              alt="icon"
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </nav>
  );
}

export default Header;
