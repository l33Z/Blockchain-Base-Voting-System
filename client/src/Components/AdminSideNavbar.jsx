import React from "react";
import { useState } from "react";
import "./AdminSideNavbar.css";
import { NavLink } from "react-router-dom";
const SideNavbar = () => {
  const [adminOnly, setadminOnly] = useState(true);

  return (
    <>
      <div className="AdminsideNavbarConatiner">
        <div className="AdminsideNavbarMain">
          <div className="AdmintopPart">
            <h2>Secure Voting System</h2>
          </div>

          <div className="Alinks">
            <div className="Alink">
              <NavLink to="/adminwelcome">
                <i className="fa-solid fa-face-smile"></i>
                Welcome Admin
              </NavLink>
            </div>

            <div className="Alink">
              <NavLink to="/addcandidates">
                <i className="fa-solid fa-person-circle-plus"></i>
                Add Candidate
              </NavLink>
            </div>

            <div className="Alink">
              <NavLink to="/adminallcandidates">
                <i className="fa-solid fa-house-lock"></i>
                All Candidates
              </NavLink>
            </div>

            <div className="Alink">
              <NavLink to="/allVoters">
                <i className="fa-solid fa-person-booth"></i>
                All Voters
              </NavLink>
            </div>

            <div className="Alink">
              <NavLink to="/adminresult">
                <i className="fa-solid fa-square-poll-vertical"></i>
                Result
              </NavLink>
            </div>

            <div className="Alink">
              <NavLink to="/addnewadmin">
                <i className="fa-solid fa-user-plus"></i>
                Add New Admin
              </NavLink>
            </div>

            <div className="Alink">
              <NavLink to="/alogout">
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
