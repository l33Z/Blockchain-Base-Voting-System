import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import vlogo from "../assets/vote (1).png";
const Navbar = () => {
  return (
    <>
      <div className="navbarMain">
        <div className="leftSideNavbar">
          <img src={vlogo} alt="logo" className="vlogo" />
          Secure Voting System
        </div>
        <div className="rightSideNavbar">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/registration">Register</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
