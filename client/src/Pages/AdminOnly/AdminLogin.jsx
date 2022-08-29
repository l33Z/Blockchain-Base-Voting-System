import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { ToastContainer, toast, Flip } from "react-toastify";
import adminBg from "../../assets/admin.jpg";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const adminLogin = async (e) => {
    e.preventDefault();

    if (username !== "" && password !== "") {
      const response = await fetch("/api/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      /////////////// For INVALID PASSWORD //////////////
      if (response.status === 401) {
        toast.error(data, {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      /////////////// For INVALID USERNAME //////////////
      else if (response.status === 400) {
        toast.error(data, {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      /////////////// For LOGIN //////////////
      else if (response.status === 200) {
        setTimeout(function () {
          navigate("/adminwelcome");
        }, 1500);

        toast.success(data, {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Fill all Details !!", {
        style: {
          fontSize: "18px",
          letterSpacing: "1px",
        },
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
      return;
    }
  };

  return (
    <>
      <Navbar />
      <div className="AdminLoginContainer">
        <ToastContainer theme="colored" />
        <div className="AdminLoginMain">
          <div className="aleftSideLogin">
            <img src={adminBg} alt="LoginLogo" className="loginBg" />
          </div>
          <div className="arightSideLogin">
            <div className="aheaderInfo">
              <h2>
                Secure Voting System Based <br />
                on Blockchain
              </h2>
            </div>

            <h3>Admin Login Here</h3>
            <form action="/login" method="post" className="aformOfLogin">
              <div className="ainputBox">
                <i className="fa-solid fa-user"></i>
                <input
                  className="ainputField"
                  type="text"
                  name="username"
                  placeholder="Enter your Email"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div className="ainputBox">
                <i className="fa-solid fa-key"></i>
                <input
                  className="ainputField"
                  type="password"
                  name="Password"
                  placeholder="Enter your Password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <input type="submit" className="aloginBtn" onClick={adminLogin} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
