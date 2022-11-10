import { useState, useEffect } from "react";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import "./AllCandidates.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import electionAbi from "../../Contract/election.json";
const contractAddress = "0xab6D16DC8982DA77C4d8Fb1b01CD0053AbFc8007";

const VotingArea = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(false);
  const [Candidates, setCandidates] = useState([]);
  const [noCandidates, setNoCandidates] = useState(0);

  // ------------------------------GET CANDIDATE FROM BLOCKCHAIN -----------------------------
  const getCandidatesDataFromBlockchain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContarct = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );

    const data = await ElectionContarct.allCandidates();
    const candidateCount = await ElectionContarct.candidatesCount();

    setNoCandidates(parseInt(candidateCount));
    setCandidates(data);
  };

  //////////////////////////////// RETRIVING DATA FROM DB ////////////////////////////////
  const getCandidatesData = async () => {
    const response = await fetch("/api/admin/allcandidates", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      // setCandidates(data);
      setRenderd(true);
    } else if (response.status === 404) {
      setRenderd(true);
    } else if (response.status === 401) {
      navigate("/admin");
      setTimeout(function () {
        toast.error(data, {
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
    } else {
      throw new Error(response.error);
    }
  };

  var zz = true;
  useEffect(() => {
    if (zz) {
      getCandidatesData();
      getCandidatesDataFromBlockchain();
      zz = false;
    }
  }, []);

  return (
    <>
      {Renderd && (
        <>
          <ToastContainer theme="colored" />
          <AdminSideNavbar />
          {noCandidates != 0 ? (
            <>
              <div className="AdminvotingAreaConatiner">
                <div className="AdminvotingAreaMain">
                  <h1>Candidates</h1>
                  <div className="Admincandidates">
                    {Candidates.map((can) => {
                      return (
                        <div
                          className="AdmincandidateBox"
                          key={can.candidate_id}
                        >
                          <div className="acandidateImg">
                            <img
                              src={`/uploads/${can.candidate_imageName}`}
                              alt="img"
                            />
                          </div>
                          <div className="acandidateName">
                            <h2>Name : {can.candidate_name}</h2>
                            <h2>Party : {can.candidate_partyName}</h2>
                            <h2>Party : {parseInt(can.candidate_age)}</h2>
                            {/* <h2>Id : {can.candidate_id} </h2> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="noCandidatesMian">
                <h1>No Candidates !!</h1>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default VotingArea;
