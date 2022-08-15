import React from "react";
import "./AddCandidates.css";
import SideNavbar from "../../Components/SideNavbar";
const AddCandidates = () => {
  return (
    <>
      <SideNavbar />
      <div className="addCandidatesConatiner">
        <div className="addCandidateMain">
          <h1>Add Candidates</h1>
          <div className="addCandidateinputFormMain">
            <form action="#" className="addCandidateForm">
              <div className="addCandidateInputBox">
                <i className="fa-solid fa-user-large"></i>
                <input
                  type="text"
                  placeholder="Enter Candidate Name"
                  autoComplete="off"
                  className="addCandidateInput"
                />
              </div>

              <div className="addCandidateInputBox">
                <i className="fa-solid fa-users-rectangle"></i>
                <input
                  type="text"
                  placeholder="Enter Candidate Party Name"
                  autoComplete="off"
                  className="addCandidateInput"
                />
              </div>

              <div className="addCandidateInputBox">
                <i className="fa-solid fa-universal-access"></i>
                <input
                  type="number"
                  placeholder="Enter Candidate Age"
                  autoComplete="off"
                  className="addCandidateInput"
                />
              </div>

              <div className="addCandidateInputBox">
                <i className="fa-solid fa-users-rectangle"></i>
                <input
                  type="text"
                  placeholder="Enter Candidate Party Name"
                  autoComplete="off"
                  className="addCandidateInput"
                />
              </div>

              <div className=" fileInputBox">
                <i className="fa-solid fa-folder"></i>
                <input
                  type="file"
                  placeholder="Upload Candidate Photo : "
                  className=" fileInput"
                  accept="image/*"
                />
              </div>

              <div className="canFormbtnGrp">
                <input
                  type="submit"
                  className="regiterCanBtn"
                  //   onClick={RegisersFunc}
                />
                <input
                  type="reset"
                  className="resetCanBtn"
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

export default AddCandidates;
