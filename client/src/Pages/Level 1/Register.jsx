import React from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import "./Register.css";
import registerBg from "../../assets/registerBg.jpg";
import { NavLink } from "react-router-dom";
const Register = () => {
  const [userDeatils, setUserDaetils] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    adharCard: "",
    birthdate: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDaetils({ ...userDeatils, [name]: value });
  };

  const resetBtnFunc = () => {
    const {
      firstname,
      lastname,
      phoneno,
      adharCard,
      birthdate,
      email,
      password,
      cpassword,
    } = userDeatils;
    if (
      firstname !== "" ||
      lastname !== "" ||
      phoneno !== "" ||
      adharCard !== "" ||
      birthdate !== "" ||
      email !== "" ||
      password !== "" ||
      cpassword !== ""
    ) {
      setUserDaetils({
        firstname: "",
        lastname: "",
        phoneno: "",
        adharCard: "",
        birthdate: "",
        email: "",
        password: "",
        cpassword: "",
      });
    }
  };
  const RegisersFunc = (e) => {
    // e.preventDefault();
    const {
      firstname,
      lastname,
      phoneno,
      adharCard,
      birthdate,
      email,
      password,
      cpassword,
    } = userDeatils;

    if (
      firstname !== "" &&
      lastname !== "" &&
      phoneno !== "" &&
      adharCard !== "" &&
      birthdate !== "" &&
      email !== "" &&
      password !== "" &&
      cpassword !== ""
    ) {
      alert(" enterty  Deatils");
      if (password === cpassword) {
        alert(
          firstname +
            " " +
            lastname +
            " " +
            phoneno +
            "" +
            adharCard +
            " " +
            birthdate +
            " " +
            email +
            " " +
            password +
            " " +
            cpassword
        );
      } else {
        alert("password is incorrect");
      }
    } else {
      alert("fill all fields");
    }
  };
  return (
    <>
      <Navbar />
      <div className="RegisterContainer">
        <div className="regesiterMain">
          <div className="leftSideRegister">
            <img
              src={registerBg}
              alt="registrationImg"
              className="registerBg"
            />
          </div>

          <div className="rightSideRegister">
            <h1>Register Here</h1>
            <form action="#" method="post" className="registerForm">
              <div className="nameInfoGrp">
                <div className="inputBoxRegister firstName">
                  <i className="fa-solid fa-user"></i>
                  <input
                    autoComplete="off"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    id="fname"
                    className="RegisterInputField"
                    onChange={handleChanges}
                    value={userDeatils.firstname}
                    required
                  />
                </div>

                <div className="inputBoxRegister">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    id="lname"
                    className="RegisterInputField"
                    onChange={handleChanges}
                    value={userDeatils.lastname}
                    required
                  />
                </div>
              </div>

              <div className="inputBoxRegister">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="number"
                  name="phoneno"
                  placeholder="Enter your contact name"
                  id="phoneno"
                  className="RegisterInputField"
                  onChange={handleChanges}
                  value={userDeatils.phoneno}
                  required
                />
              </div>

              <div className="inputBoxRegister">
                <i className="fa-solid fa-address-card"></i>
                <input
                  type="number"
                  name="adharCard"
                  placeholder="Enter your Aadhar Card"
                  id="adharCard"
                  className="RegisterInputField"
                  onChange={handleChanges}
                  value={userDeatils.adharCard}
                  required
                />
              </div>

              <div className="inputBoxRegister">
                <i className="fa-solid fa-calendar"></i>
                <input
                  type="date"
                  name="birthdate"
                  placeholder="Enter your Birth Date : "
                  id="birthdate"
                  className="RegisterInputField"
                  onChange={handleChanges}
                  value={userDeatils.birthdate}
                  required
                />
              </div>

              <div className="inputBoxRegister">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  id="email"
                  className="RegisterInputField"
                  onChange={handleChanges}
                  value={userDeatils.email}
                  required
                />
              </div>

              <div className="inputBoxRegister">
                <i className="fa-solid fa-key"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                  className="RegisterInputField"
                  onChange={handleChanges}
                  value={userDeatils.password}
                  required
                />
              </div>

              <div className="inputBoxRegister">
                <i className="fa-solid fa-key"></i>
                <input
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                  id="cpassword"
                  className="RegisterInputField"
                  onChange={handleChanges}
                  value={userDeatils.cpassword}
                  required
                />
              </div>

              <div className="btnGroupRegister">
                <input
                  type="submit"
                  className="regiterSbumtBtn"
                  onClick={RegisersFunc}
                />
                <input
                  type="reset"
                  className="resetBtn"
                  onClick={resetBtnFunc}
                />
              </div>
            </form>

            <div className="alreadyAccount">
              <h2>Already have an Account ? </h2>
              <NavLink to="/login" className="loginLink">
                Login Here
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
