import { useState, useEffect } from "react";
import "./AddCandidates.css";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import electionAbi from "../../Contract/election.json";
const contractAddress = "0x7148738AA7503e41Db6Ab6143eAccd68641E3EcF";

const AddCandidates = () => {
  const navigate = useNavigate();
  const [statusOfPage, setStatusOfPage] = useState(true);

  //------------------------------- CHECK OWNER -------------------------------
  const checkOwner = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (
          accounts[0].toString() != "0x4162daaa49cb714d2a059331e3e59e30e7f6f5ce"
        ) {
          navigate("/adminwelcome");
        }
      } catch (e) {
        navigate("/adminwelcome");
      }
    } else {
      navigate("/adminwelcome");
    }
  };

  //--------------------------------- CHECKING PHASE STATE ------------------------------
  const checkState = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContarct = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const StateOfCon = await ElectionContarct.ElectionState();
    if (StateOfCon == 0) {
      setStatusOfPage(true);
    } else {
      setStatusOfPage(false);
    }
  };

  var zz = true;
  useEffect(() => {
    if (zz) {
      checkOwner();
      checkState();
      zz = false;
    }
  }, []);

  const [candidateDetails, setCandidateDetails] = useState({
    candidatename: "",
    partyname: "",
    candidateage: "",
  });
  const [candidateImageFile, setCandidateImageFile] = useState("");

  //------------------------------- ADD CANDIDATE TO BLOCKCHAIN -------------------------------
  const addCandidateToBlockChain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContarct = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const signer = provider.getSigner();

    try {
      const generatedCandidateId =
        candidateDetails.partyname.replace(" ", "") +
        candidateDetails.candidateage;

      const tx = await ElectionContarct.connect(signer).addCandidate(
        generatedCandidateId,
        candidateDetails.candidatename,
        candidateDetails.partyname,
        candidateImageFile.name.toString(),
        candidateDetails.candidateage
      );
      console.log(tx);
      toast.info("Processing to Blockchain", {
        style: {
          fontSize: "15px",
          letterSpacing: "1px",
        },
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
    } catch (e) {
      console.log(e);
      if (e.message.indexOf("missing argument: passed to contract") > -1) {
        toast.error("Missing argument: passed to contract", {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Somthing went wrong !!", {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

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
      const generatedCandidateId =
        candidateDetails.partyname.replace(" ", "") +
        candidateDetails.candidateage;

      const formData = new FormData();
      formData.append("CandidateName", candidateDetails.candidatename);
      formData.append("CandidatePartyName", candidateDetails.partyname);
      formData.append("CandidateAge", candidateDetails.candidateage);
      formData.append("CandidateId", generatedCandidateId);
      formData.append("CandidateImage", candidateImageFile);

      const response = await fetch("/api/addcandidate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success("Successfully Added Candidate To DB", {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        addCandidateToBlockChain();
        resetBtnFunc();
      } else if (response.status === 409) {
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
        toast.error("Somthing went wrong !!", {
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
      <AdminSideNavbar />
      {statusOfPage ? (
        <>
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
      ) : (
        <>
          <div className="MainStatusCandidate">
            <h1>Registration Phase Is Over !!</h1>
          </div>
        </>
      )}
    </>
  );
};

export default AddCandidates;
