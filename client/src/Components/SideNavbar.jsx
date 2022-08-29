import React from "react";
import { useState } from "react";
import "./SideNavbar.css";
import { NavLink } from "react-router-dom";
const SideNavbar = () => {
  const [adminOnly, setadminOnly] = useState(true);

  return (
    <>
      <div className="sideNavbarConatiner">
        <div className="sideNavbarMain">
          <div className="topPart">
            <h2>Secure Voting System</h2>
          </div>

          <div className="links">
            <div className="link">
              <NavLink to="/welcome">
                <i className="fa-solid fa-face-smile"></i>
                Welcome
              </NavLink>
            </div>

            <div className="link">
              <NavLink to="/information">
                <i className="fa-solid fa-circle-info"></i>
                Information
              </NavLink>
            </div>

            <div className="link">
              <NavLink to="/voteregistration">
                <i className="fa-solid fa-chalkboard-user"></i>
                Vote Registartion
              </NavLink>
            </div>

            <div className="link">
              <NavLink to="/votingarea">
                <i className="fa-solid fa-house-lock"></i>
                Voting Area
              </NavLink>
            </div>

            <div className="link">
              <NavLink to="/result">
                <i className="fa-solid fa-square-poll-vertical"></i>
                Result
              </NavLink>
            </div>

            <div className="link">
              <NavLink to="/logout">
                <i className="fa-solid fa-right-from-bracket"></i>
                Log Out
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
