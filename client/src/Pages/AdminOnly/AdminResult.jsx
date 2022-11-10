import { useEffect, useState } from "react";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import "./AdminResult.css";
import modi from "../../assets/modi.jpg";
import party from "../../assets/party.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import electionAbi from "../../Contract/election.json";
const contractAddress = "0xab6D16DC8982DA77C4d8Fb1b01CD0053AbFc8007";

const Result = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(false);
  const [Candidates, setCandidates] = useState([]);
  const [phaseOfElec, setPhaseOfElec] = useState(198);
  const [winnerCandidate, setWinnerCandidate] = useState([]);

  // ------------------------------GET CANDIDATE FROM BLOCKCHAIN -----------------------------
  const getCandidatesDataFromBlockchain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContarct = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const signer = provider.getSigner();
    const phaseStatus = await ElectionContarct.ElectionState();
    setPhaseOfElec(phaseStatus);

    if (phaseStatus === 2) {
      const resultcandidates = await ElectionContarct.connect(
        signer
      ).getUpdatedCandidateList();
      const winnerId = await ElectionContarct.getWinner();
      const winnerDetails = await ElectionContarct.candidates(winnerId);

      const ans = [...resultcandidates];
      ans.sort((a, b) => {
        return parseInt(a.candidate_totalVotes) <
          parseInt(b.candidate_totalVotes)
          ? 1
          : -1;
      });

      setCandidates(ans);
      setWinnerCandidate(winnerDetails);
    }
  };

  ////////////////////////////////////// Get Candidate Data From DB //////////////////////////////
  const getCandidatesData = async () => {
    const response = await fetch("/api/admin/resultcandidates", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200) {
      // setCandidates(data);
      getCandidatesDataFromBlockchain();
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
      setRenderd(true);
      throw new Error(response.error);
    }
  };

  var zz = true;
  useEffect(() => {
    if (zz) {
      getCandidatesData();
      zz = false;
    }
  }, []);

  var CandidatePostionId = 1;
  return (
    <>
      {Renderd && (
        <>
          <AdminSideNavbar />
          <ToastContainer theme="colored" />
          {phaseOfElec === 2 ? (
            <>
              {Candidates.length !== 0 ? (
                <>
                  <div className="AdminresultConatiner">
                    <div className="AdminresultMain">
                      <h1>Result Area</h1>
                      <div className="AdminwinnerInfo">
                        <div className="winnerImg">
                          <img
                            src={`/uploads/${winnerCandidate.candidate_imageName}`}
                            alt="winner"
                          />
                        </div>
                        <div className="winnerName">
                          <h3 id="winnerHead">
                            <span id="PopperDiv">
                              <img
                                src={party}
                                alt="popper"
                                id="partyPopperImg"
                              />
                            </span>
                            Winner 🎉 is
                          </h3>
                          <h2> Name : {winnerCandidate.candidate_name}</h2>
                          <h2>
                            {" "}
                            Party : {winnerCandidate.candidate_partyName}
                          </h2>
                          <h2>
                            {" "}
                            Total Votes :{" "}
                            {parseInt(
                              winnerCandidate.candidate_totalVotes
                            )}{" "}
                          </h2>
                        </div>
                      </div>

                      <div className="runnerUpTableConatiner">
                        <table className="runnerUpTable">
                          <thead className="table-heading">
                            <tr>
                              <th>Position</th>
                              <th>Name</th>
                              <th>Party</th>
                              <th>Total Votes</th>
                            </tr>
                          </thead>

                          <tbody className="runnerUpTableBody">
                            {Candidates.map((can) => {
                              return (
                                <tr key={can.candidate_id}>
                                  <td>{CandidatePostionId++}</td>
                                  <td>{can.candidate_name}</td>
                                  <td>{can.candidate_partyName}</td>
                                  <td>{parseInt(can.candidate_totalVotes)}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="WaitForResult">
                    <h1>Wait For Result ...</h1>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="stausResult">
                <h1>Election Result is Not Declared !!</h1>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Result;
