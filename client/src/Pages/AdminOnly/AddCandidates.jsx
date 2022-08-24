import { useState } from "react";
import "./AddCandidates.css";
import SideNavbar from "../../Components/SideNavbar";
import { ToastContainer, toast, Flip } from "react-toastify";

const AddCandidates = () => {
  const [candidateDetails, setCandidateDetails] = useState({
    candidatename: "",
    partyname: "",
    candidateage: "",
  });
  const [candidateImageFile, setCandidateImageFile] = useState("");

  //////////////////////////////// HANDLE CHANGES FUNCTION //////////////////////////////////
  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCandidateDetails({ ...candidateDetails, [name]: value });
  };

  //////////////////////////////// RESET METHODS ////////////////////////////////
  const resetBtnFunc = () => {
    const { candidatename, partyname, cabdidateage } = candidateDetails;
    if (candidatename !== "" || partyname !== "" || cabdidateage !== "") {
      setCandidateDetails({
        candidatename: "",
        partyname: "",
        candidateage: "",
      });
      setCandidateImageFile("");
    }
  };
  //////////////////////////////// SUBMIT FUNCTION //////////////////////////////////
  const RegisersCanFunc = async (e) => {
    e.preventDefault();
    const { candidatename, partyname, cabdidateage } = candidateDetails;
    if (
      candidatename !== "" &&
      partyname !== "" &&
      cabdidateage !== "" &&
      candidateImageFile !== ""
    ) {
      const formData = new FormData();
      formData.append("CandidateName", candidateDetails.candidatename);
      formData.append("CandidatePartyName", candidateDetails.partyname);
      formData.append("CandidateAge", candidateDetails.candidateage);
      formData.append("CandidateImage", candidateImageFile);

      const response = await fetch("/api/addcandidate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status !== 201) {
        toast.error(data, {
          style: {
            fontSize: "18px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip,
        });
      } else {
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
        resetBtnFunc();
      }
    } else {
      toast.error("Fill All Details !!", {
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
  };
  return (
    <>
      <SideNavbar />
      <div className="addCandidatesConatiner">
        <ToastContainer theme="colored" />
        <div className="addCandidateMain">
          <h1>Add Candidates</h1>
          <div className="addCandidateinputFormMain">
            <form
              method="POST"
              className="addCandidateForm"
              encType="multipart/form-data"
            >
              <div className="addCandidateInputBox">
                <i className="fa-solid fa-user-large"></i>
                <input
                  type="text"
                  name="candidatename"
                  placeholder="Enter Candidate Name"
                  autoComplete="off"
                  className="addCandidateInput"
                  onChange={handleChanges}
                  value={candidateDetails.candidatename}
                  required
                />
              </div>

              <div className="addCandidateInputBox">
                <i className="fa-solid fa-users-rectangle"></i>
                <input
                  type="text"
                  name="partyname"
                  placeholder="Enter Candidate Party Name"
                  autoComplete="off"
                  className="addCandidateInput"
                  onChange={handleChanges}
                  value={candidateDetails.partyname}
                  required
                />
              </div>

              <div className="addCandidateInputBox">
                <i className="fa-solid fa-universal-access"></i>
                <input
                  name="candidateage"
                  type="number"
                  placeholder="Enter Candidate Age"
                  autoComplete="off"
                  className="addCandidateInput"
                  onChange={handleChanges}
                  value={candidateDetails.candidateage}
                  required
                />
              </div>
              
              <div className=" fileInputBox">
                <i className="fa-solid fa-folder"></i>
                <input
                  name="CandidateImage"
                  type="file"
                  placeholder="Upload Candidate Photo : "
                  className=" fileInput"
                  accept="image/*"
                  onChange={(e) => setCandidateImageFile(e.target.files[0])}
                  required
                />
              </div>

              <div className="canFormbtnGrp">
                <input
                  type="submit"
                  className="regiterCanBtn"
                  onClick={RegisersCanFunc}
                />
                <input
                  type="reset"
                  className="resetCanBtn"
                  onClick={resetBtnFunc}
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
