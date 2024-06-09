import React from 'react';

function Header() {
    return (
        <nav>
            <i className='bx bx-menu' id='btn-menu'></i>
            <form action="#">
                <div className="form-input">
                    <input type="search" placeholder="Search..." />
                    <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                </div>
            </form>
            <div className="mode">
                <div className="moon-sun">
                    <i className='bx bx-moon moon'></i>
                    <i className='bx bx-sun sun'></i>
                </div>
                <span id="mode-text" className="mode-text">Dark Mode</span>
                <input type="checkbox" id="switch-mode" hidden />
                <label htmlFor="switch-mode" className="switch-mode"></label>
            </div>
            <a href="#" className="notification">
                <i className='bx bxs-bell' ></i>
                <span className="num">99</span>
            </a>
            <a href="#" className="profile">
                <img src="../img/avatar_dattran.png" alt="icon" />
            </a>
        </nav>
    );
}

export default Header;