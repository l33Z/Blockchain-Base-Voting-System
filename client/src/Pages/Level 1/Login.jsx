import React from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import loginBg from "../../assets/girlLogin.jpg";
import voteBg from "../../assets/vote.png";
import "./Login.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handling the login
  const loginFunc = () => {
    if (email === "" && password === "") {
      alert("Please enter your email address");
    } else {
      alert("id " + email + "\npassword " + password);
    }
  };
  return (
    <>
      <Navbar />
      <div className="LoginContainer">
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
            <form action="#" method="post" className="formOfLogin">
              <div className="inputBox">
                <i className="fa-solid fa-user"></i>
                <input
                  className="inputField"
                  type="email"
                  name="userEmail"
                  placeholder="Enter your Email"
                  id="userEmail"
                  autoComplete="off"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
