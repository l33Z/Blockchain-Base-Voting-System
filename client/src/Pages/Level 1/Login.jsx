import React from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import loginBg from "../../assets/girlLogin.jpg";
import voteBg from "../../assets/vote.png";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      return false;
    }
  };

  ////////////////////////////////// Handling the login //////////////////////////////
  const loginFunc = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      if (!ValidateEmail(email)) {
        toast.error("Enter a valid email address", {
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
      } else {
        const response = await fetch("/api/loginvoter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
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
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
        /////////////// For INVALID EMAIL //////////////
        else if (response.status === 400) {
          toast.error(data, {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 3000,
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
            navigate("/welcome");
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
      <div className="LoginContainer">
        <ToastContainer theme="colored" />
        <div className="LoginMain">
          <div className="leftSideLogin">
            <img src={loginBg} alt="LoginLogo" className="loginBg" />
          </div>
          <div className="rightSideLogin">
            <div className="headerInfo">
              <h2>
                Secure Voting System Based <br />
                on Blockchain
              </h2>
              <img src={voteBg} alt="voteLogo" className="voteBg" />
            </div>

            <h3>Login Here</h3>
            <form action="/login" method="post" className="formOfLogin">
              <div className="inputBox">
                <i className="fa-solid fa-user"></i>
                <input
                  className="inputField"
                  type="email"
                  name="userEmail"
                  placeholder="Enter your Email"
                  id="userEmail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="inputBox">
                <i className="fa-solid fa-key"></i>
                <input
                  className="inputField"
                  type="password"
                  name="userPassword"
                  placeholder="Enter your Password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <input type="submit" className="loginBtn" onClick={loginFunc} />
            </form>

            <div className="moreoption">
              <h5>Not registered yet ? </h5>
              <NavLink to="/registration">Create an Account</NavLink>
              <NavLink to="/admin">Admin</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
