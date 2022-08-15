import React from "react";
import "./ErrorPage.css";
import errorImg from "../assets/404.jpg";
import { NavLink } from "react-router-dom";
import vlogo from "../assets/vote (1).png";
const ErrorPage = () => {
  return (
    <>
      <div className="errorMains">
        <div className="navbarMains">
          <div className="leftSideNavbars">
            <img src={vlogo} alt="logo" className="vlogos" />
            Secure Voting System
          </div>
          <div className="rightSideNavbars">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  style={({ isActive }) => {
                    color: isActive ? "#7600dc" : "#f0f0f0";
                  }}
                >
                  Login
                </NavLink>
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

        <div className="errorMsg">
          <h1>Sorry Page Not Found !!</h1>
        </div>
        <img src={errorImg} alt="404" className="errorImg" />
      </div>
    </>
  );
};

export default ErrorPage;
