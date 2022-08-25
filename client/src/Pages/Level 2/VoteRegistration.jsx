import React, { useState, useEffect } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./VoteRegistation.css";
import typing from "../../assets/typing1.png";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VoteRegistration = () => {
  const [voterDetails, setVoterDetails] = useState({
    adharCard: "",
    voterno: "",
    birthdate: "",
    age: "",
    city: "",
    rstate: "",
    address: "",
  });

  const navigate = useNavigate();
  const [currentVoterID, setCurrentVoterId] = useState("");

  const getCurrentVoter = async () => {
    try {
      const response = await fetch("/api/voteregistration", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      setCurrentVoterId(data);

      if (response.status === 401) {
        navigate("/login");
        setTimeout(function () {
          toast.error("Please Login First", {
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
        }, 1000);
      }

      if (!response.status === 200) {
        throw new Error(response.error);
      }
    } catch (e) {
      console.log("Errorrrrr : " + e);
      navigate("/login");
    }
  };
  useEffect(() => {
    getCurrentVoter();
  }, []);

  //////////////////////////////// HANDLE CHANGES FUNCTION //////////////////////////////////
  const HandleVoterDetailsChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVoterDetails({ ...voterDetails, [name]: value });
  };

  //////////////////////////////// RESET FUNCTION //////////////////////////////////
  const resetVoterBtnFunc = () => {
    const { adharCard, voterno, birthdate, age, city, rstate, address } =
      voterDetails;

    if (
      adharCard !== "" ||
      voterno !== "" ||
      birthdate !== "" ||
      age !== "" ||
      city !== "" ||
      rstate !== "" ||
      address !== ""
    ) {
      setVoterDetails({
        adharCard: "",
        voterno: "",
        birthdate: "",
        age: "",
        city: "",
        rstate: "",
        address: "",
      });
    }
  };
  //////////////////////////////// SUBMIT FUNCTION //////////////////////////////////
  const RegisersVoterFunc = async (e) => {
    e.preventDefault();
    const { adharCard, voterno, birthdate, age, city, rstate, address } =
      voterDetails;
    if (
      adharCard !== "" &&
      voterno !== "" &&
      birthdate !== "" &&
      age !== "" &&
      city !== "" &&
      rstate !== "" &&
      address !== ""
    ) {
      if (age < 18 || age > 100) {
        toast.error("Age is Not Valid", {
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
        return;
      }
      if (adharCard.length !== 12) {
        toast.error("Adhar Card Number must be 12 Numbers", {
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
        return;
      }
      if (voterno.length !== 10) {
        toast.error("Voter Card Number must be 10 Numbers", {
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
        return;
      }
      const response = await fetch("/api/voteregistration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cid: currentVoterID,
          adharCard,
          voterno,
          birthdate,
          age,
          city,
          rstate,
          address,
        }),
      });
      const data = await response.json();

      if (response.status !== 201) {
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
          navigate("/votingarea");
        }, 2200);

        toast.success(data, {
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

        // setVoterDetails({
        //   adharCard: "",
        //   voterno: "",
        //   birthdate: "",
        //   age: "",
        //   city: "",
        //   rstate: "",
        //   address: "",
        // });
      }
    } else {
      toast.error("Fill all Details !!", {
        style: {
          fontSize: "18px",
          letterSpacing: "1px",
        },
        position: "bottom-center",
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
      <SideNavbar />
      <div className="voteRegistrationMain">
        <ToastContainer theme="colored" />
        <h1 id="headingForRegistration">Fill The Details For Voting</h1>
        <div className="formMain">
          <div className="leftSideRegistrationPart">
            <img src={typing} alt="img" />
          </div>
          <div className="rightSideRegistrationPart">
            <form method="POST">
              <div className="inputVoteBox">
                <i className="fa-solid fa-address-card"></i>
                <input
                  type="number"
                  name="adharCard"
                  placeholder="Enter your Aadhar Card"
                  id="adharCard"
                  className="VotingRegisterInputField"
                  onChange={HandleVoterDetailsChanges}
                  value={voterDetails.adharCard}
                  required
                />
              </div>

              <div className="inputVoteBox">
                <i className="fa-solid fa-calendar"></i>
                <input
                  type="number"
                  name="voterno"
                  placeholder="Enter your Voter Card No "
                  id="voterno"
                  className="VotingRegisterInputField"
                  onChange={HandleVoterDetailsChanges}
                  value={voterDetails.voterno}
                  required
                />
              </div>

              <div className="inputVoteBox">
                <i className="fa-solid fa-calendar"></i>
                <input
                  type="date"
                  name="birthdate"
                  placeholder="Enter your Birth Date : "
                  id="birthdate"
                  className="VotingRegisterInputField"
                  onChange={HandleVoterDetailsChanges}
                  value={voterDetails.birthdate}
                  required
                />
              </div>

              <div className="inputVoteBox">
                <i className="fa-solid fa-universal-access"></i>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter your Age"
                  id="age"
                  className="VotingRegisterInputField"
                  min={18}
                  onChange={HandleVoterDetailsChanges}
                  value={voterDetails.age}
                  required
                />
              </div>

              <div className="inputVoteBoxGroup">
                <div className="inputVoteBox">
                  <i className="fa-solid fa-city"></i>
                  <input
                    type="text"
                    name="rstate"
                    placeholder="Enter your State "
                    id="state"
                    className="VotingRegisterInputField"
                    onChange={HandleVoterDetailsChanges}
                    value={voterDetails.rstate}
                    required
                  />
                </div>

                <div className="inputVoteBox">
                  <i className="fa-solid fa-earth-asia"></i>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your City "
                    id="city"
                    className="VotingRegisterInputField"
                    onChange={HandleVoterDetailsChanges}
                    value={voterDetails.city}
                    required
                  />
                </div>
              </div>
              <div className="inputVoteBox">
                <i className="fa-solid fa-at"></i>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address "
                  id="address"
                  className="VotingRegisterInputField"
                  onChange={HandleVoterDetailsChanges}
                  value={voterDetails.address}
                  required
                />
              </div>

              <div className="btnGroupVoteRegister">
                <input
                  type="submit"
                  className="regiterVotebumtBtn"
                  onClick={RegisersVoterFunc}
                />
                <input
                  type="reset"
                  className="resetVoteBtn"
                  onClick={resetVoterBtnFunc}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteRegistration;
