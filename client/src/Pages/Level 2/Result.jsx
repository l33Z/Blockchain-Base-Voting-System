import { useEffect, useState } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./Result.css";
import party from "../../assets/party.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ethers } from "ethers";
import electionAbi from "../../Contract/election.json";
const contractAddress = "0x7148738AA7503e41Db6Ab6143eAccd68641E3EcF";

const Result = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(false);
  const [winnerHeading, setwinnerHeading] = useState("Winner 🎉 is");
  const [PhaseOfElection, setPhaseOfElection] = useState(198);
  const [resultCandidates, setResultCandidates] = useState([]);
  const [winnerDetails, setwinnerDetails] = useState([]);
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
    setPhaseOfElection(phaseStatus);

    if (phaseStatus === 2) {
      const reultList = await ElectionContarct.connect(
        signer
      ).getUpdatedCandidateList();

      const winnerId = await ElectionContarct.getWinner();
      const winnerDetailss = await ElectionContarct.candidates(winnerId);

      const ans = [...reultList];
      ans.sort((a, b) => {
        return parseInt(a.candidate_totalVotes) <
          parseInt(b.candidate_totalVotes)
          ? 1
          : -1;
      });

      setwinnerDetails(winnerDetailss);
      setResultCandidates(ans);
      console.log(ans);
    }
  };

  const getCandidatesData = async () => {
    const response = await fetch("/api/resultcandidates", {
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
      getCandidatesDataFromBlockchain();
      if (data[0].TotalVotes === data[1].TotalVotes) {
        setwinnerHeading("Election Is Draw");
      }
    } else if (response.status === 401) {
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
    } else {
      setRenderd(true);
      // throw new Error(response.error);
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
          <SideNavbar />
          <ToastContainer theme="colored" />
          {PhaseOfElection === 2 ? (
            <>
              {resultCandidates.length !== 0 ? (
                <>
                  <div className="resultConatiner">
                    <div className="resultMain">
                      {resultCandidates[0] && (
                        <div className="renderCondition">
                          <h1>Result Area</h1>
                          <div className="winnerInfo">
                            <div className="winnerImg">
                              <img
                                src={`/uploads/${winnerDetails.candidate_imageName}`}
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
                                {winnerHeading}
                              </h3>

                              <h2> Name : {winnerDetails.candidate_name}</h2>
                              <h2>
                                {" "}
                                Party : {winnerDetails.candidate_partyName}
                              </h2>
                              <h2>
                                {" "}
                                Total Votes :{" "}
                                {parseInt(winnerDetails.candidate_totalVotes)}
                              </h2>
                            </div>
                          </div>
                        </div>
                      )}
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
                            {resultCandidates.map((can) => {
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
                  </div>{" "}
                </>
              ) : (
                <>
                  <div className="ResultWait">
                    <h1>Wait For Result ...</h1>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="StatusOfResultVote">
                <h1>Currently Election Result Is Not Declared !!</h1>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Result;
