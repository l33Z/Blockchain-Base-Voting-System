import { useState } from "react";
import Navbar from "../../Components/Navbar";
import "./Register.css";
import registerBg from "../../assets/registerBg.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";

const Register = () => {
  let navigate = useNavigate();
  const [userDeatils, setUserDaetils] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      return false;
    }
  };

  //////////////////////////////// HANDLE CHANGES FUNCTION ////////////////////////////
  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDaetils({ ...userDeatils, [name]: value });
  };

  //////////////////////////////// RESET METHODS FUNCTION ////////////////////////////////
  const resetBtnFunc = () => {
    const { firstname, lastname, phoneno, email, password, cpassword } =
      userDeatils;
    if (
      firstname !== "" ||
      lastname !== "" ||
      phoneno !== "" ||
      email !== "" ||
      password !== "" ||
      cpassword !== ""
    ) {
      setUserDaetils({
        firstname: "",
        lastname: "",
        phoneno: "",
        email: "",
        password: "",
        cpassword: "",
      });
    }
  };

  //////////////////////////////// FOR REGISTER FUNC ////////////////////////////////
  const RegisersFunc = async (e) => {
    e.preventDefault();
    const { firstname, lastname, phoneno, email, password, cpassword } =
      userDeatils;

    if (
      firstname !== "" &&
      lastname !== "" &&
      phoneno !== "" &&
      email !== "" &&
      password !== "" &&
      cpassword !== ""
    ) {
      if (password !== cpassword) {
        toast.error("Passwords are not matching !!", {
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
      } else {
        if (ValidateEmail(email) == false) {
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
          const response = await fetch("/api/registervoter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstname,
              lastname,
              phoneno,
              email,
              password,
              cpassword,
            }),
          });

          const data = await response.json();
          if (response.status === 409) {
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
          } else {
            setTimeout(function () {
              navigate("/login");
            }, 3000);

            toast.success("Register Successfully", {
              style: {
                fontSize: "15px",
                letterSpacing: "1px",
              },
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
            <ToastContainer theme="colored" />
            <h1>Register Here</h1>
            <form method="POST" className="registerForm">
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
