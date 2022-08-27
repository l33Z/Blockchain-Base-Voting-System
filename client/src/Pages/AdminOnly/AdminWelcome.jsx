import React from "react";
import "./AdminWelcome.css";
import AdminSideNavbar from "../../Components/AdminSideNavbar";

const AdminWelcome = () => {
  return (
    <>
      <AdminSideNavbar />
      <div className="AinformationMain">
        <h1>Welcome Admin</h1>
      </div>
    </>
  );
};

export default AdminWelcome;
