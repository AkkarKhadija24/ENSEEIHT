import React from 'react';
import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';


function Navbar() {
  const location = useLocation();

  return (
    /*<div className="navbar">
      <img src="imagesBackground/intern7eek.png" alt="Logo Inter7eek" />
      <span>Welcome to the Companies Authentication Portal</span>
      <span>INTERN7EEK</span>
    </div>*/


    <div className="navbar">
        <img src="imagesBackground/intern7eek.png" alt="Logo Inter7eek" />
            <div className="navbar-links">
                {location.pathname === '/' && <span>Welcome To the Home Portal </span>}
                {location.pathname === '/home' && <span>Welcome To the Home Portal </span>}
                {location.pathname === '/signupstudent' && <span>Welcome To the User Space</span>}
                {location.pathname === '/signupcompany' && <span>Welcome to the Companies Authentication Portal</span>}
                {location.pathname === '/login' && <span>Welcome to the Login Portal</span>}
                {location.pathname === '/companyspace' && <span>Welcome to the Company Space</span>}
                {location.pathname === '/studentspace' && <span>Welcome To the Student Space </span>}

            </div>
        <span>INTERN7EEK</span>
    </div>
  );
}

export default Navbar;
