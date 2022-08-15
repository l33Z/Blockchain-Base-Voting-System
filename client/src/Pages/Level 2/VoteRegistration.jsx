import React from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./VoteRegistation.css";
import typing from "../../assets/typing1.png";
const VoteRegistration = () => {
  return (
    <>
      <SideNavbar />
      <div className="voteRegistrationMain">
        <h1 id="headingForRegistration">Fill The Details For Voting</h1>
        <div className="formMain">
          <div className="leftSideRegistrationPart">
            <img src={typing} alt="img" />
          </div>
          <div className="rightSideRegistrationPart">
            <form action="#">
              <div className="inputVoteBox">
                <i className="fa-solid fa-address-card"></i>
                <input
                  type="number"
                  name="adharCard"
                  placeholder="Enter your Aadhar Card"
                  id="adharCard"
                  className="VotingRegisterInputField"
                  //   onChange={handleChanges}
                  //   value={userDeatils.adharCard}
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
                  // onChange={handleChanges}
                  // value={userDeatils.birthdate}
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
                  //   onChange={handleChanges}
                  //   value={userDeatils.adharCard}
                  required
                />
              </div>

              <div className="inputVoteBoxGroup">
                <div className="inputVoteBox">
                  <i className="fa-solid fa-earth-asia"></i>
                  <input
                    type="text"
                    name="country"
                    placeholder="Enter your Country "
                    id="country"
                    className="VotingRegisterInputField"
                    required
                  />
                </div>

                <div className="inputVoteBox">
                  <i className="fa-solid fa-city"></i>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter your state "
                    id="state"
                    className="VotingRegisterInputField"
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
                  required
                />
              </div>

              <div className="inputVoteBox">
                <i className="fa-solid fa-calendar"></i>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address "
                  id="address"
                  className="VotingRegisterInputField"
                  required
                />
              </div>
              <div className="btnGroupVoteRegister">
                <input
                  type="submit"
                  className="regiterVotebumtBtn"
                  //   onClick={RegisersFunc}
                />
                <input
                  type="reset"
                  className="resetVoteBtn"
                  //   onClick={resetBtnFunc}
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
