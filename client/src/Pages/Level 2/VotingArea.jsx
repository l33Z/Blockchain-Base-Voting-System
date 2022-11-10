import { useState, useEffect } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./VotingArea.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import electionAbi from "../../Contract/election.json";
const contractAddress = "0xab6D16DC8982DA77C4d8Fb1b01CD0053AbFc8007";

const VotingArea = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(false);
  const [canName, setcanName] = useState("");
  const [canParty, setcanParty] = useState("");
  const [canImg, setcanImg] = useState("");
  const [canage, setcanage] = useState("");
  const [candidateCount, setCandidateCount] = useState(1);
  const [Candidates, setCandidates] = useState([]);
  const [PhaseOfElec, setPhaseOfElec] = useState(198);

  // --------------------------------------- RETRIVING Data From Blockchain --------------------------------
  const getCandidatesDataFromBlockchain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContarct = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const signer = provider.getSigner();

    const data = await ElectionContarct.allCandidates();
    const phase = await ElectionContarct.ElectionState();
    const CCount = await ElectionContarct.candidatesCount();
    console.log(phase);
    setPhaseOfElec(phase);
    setCandidates(data);
    setCandidateCount(parseInt(CCount));
    // console.log(data);
  };

  // --------------------------------------- Count Vote In Blockchain --------------------------------
  const countVoteInBlockchain = async (voterId, candidateId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContarct = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const signer = provider.getSigner();

    try {
      console.log("v " + voterId.toString());
      console.log(candidateId.toString());
      const tx = await ElectionContarct.connect(signer).vote(
        voterId.toString(),
        candidateId.toString()
      );

      console.log(tx);
    } catch (e) {
      console.log(e);
    }
  };

  //////////////////////////////// RETRIVING DATA FROM API ////////////////////////////////
  const getCandidatesData = async () => {
    const response = await fetch("/api/allcandidates", {
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
      getCandidatesDataFromBlockchain();
      getCandidatesData();
      zz = false;
    }
  }, []);

  //////////////////////////////// VOTE COUNT FUNC ////////////////////////////////
  const VoteCountFunc = async (e) => {
    const CanDidateName = e.target.parentNode.parentNode
      .querySelector("#cname")
      .innerHTML.toString();

    const responseForUpdationVoter = await fetch("/api/currentvoter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const DataForVoter = await responseForUpdationVoter.json();

    if (responseForUpdationVoter.status === 201) {
      const response = await fetch("/api/countvotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentcandidatename: CanDidateName,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.msg, {
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

        setTimeout(() => {
          countVoteInBlockchain(DataForVoter, data.ans);
        }, 1500);
      } else {
        toast.error("Somthing Went Wrong !!", {
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
    } else if (responseForUpdationVoter.status === 401) {
      toast.error(DataForVoter, {
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
    } else {
      toast.error(DataForVoter, {
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
      setTimeout(() => {
        navigate("/voteregistration");
      }, 2500);
    }
  };

  return (
    <>
      {Renderd && (
        <>
          <SideNavbar />
          <ToastContainer theme="colored" />
          {PhaseOfElec === 1 ? (
            <>
              {candidateCount != 0 ? (
                <>
                  <div
                    className="modal fade modal-dialog modal-xl"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog ">
                      <div className="modal-content modal_zz">
                        <div className="modal-header ">
                          <h2 className="modal-title " id="staticBackdropLabel">
                            Candidate Info
                          </h2>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="mainModal">
                            <div className="leftModalSide">
                              <img src={canImg} alt="img" />
                            </div>
                            <div className="rightModalSide">
                              <h2>Name : {canName}</h2>
                              <h2>Party : {canParty}</h2>
                              <h2>Age : {canage}</h2>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary btn-lg"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            data-bs-dismiss="modal"
                            className="btn btn-primary btn-lg"
                          >
                            Understood
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  //////////////////// MODAL END //////////////////////////////
                  <div className="votingAreaConatiner">
                    <div className="votingAreaMain">
                      <h1>Candidates</h1>
                      <div className="candidates">
                        {Candidates.map((can) => {
                          return (
                            <div
                              className="candidateBox"
                              key={can.candidate_id}
                            >
                              <img
                                src={`/uploads/${can.candidate_imageName}`}
                                alt="img"
                                id="candidateImg"
                              />
                              <div className="candidateName">
                                <h2>
                                  Name :{" "}
                                  <span id="cname">{can.candidate_name}</span>
                                </h2>
                                <h2>
                                  Party :{" "}
                                  <span id="cparty">
                                    {can.candidate_partyName}
                                  </span>
                                </h2>

                                <h6 id="cage">{parseInt(can.candidate_age)}</h6>
                              </div>
                              <div className="btnGroupCan">
                                <button
                                  className="infoCandidateBtn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop"
                                  onClick={(e) => {
                                    setcanImg(
                                      e.target.parentNode.parentNode.querySelector(
                                        "#candidateImg"
                                      ).src
                                    );
                                    setcanName(
                                      e.target.parentNode.parentNode
                                        .querySelector("#cname")
                                        .innerHTML.toString()
                                    );
                                    setcanParty(
                                      e.target.parentNode.parentNode.querySelector(
                                        "#cparty"
                                      ).innerHTML
                                    );
                                    setcanage(
                                      e.target.parentNode.parentNode.querySelector(
                                        "#cage"
                                      ).innerHTML
                                    );
                                  }}
                                >
                                  Info
                                </button>
                                <button
                                  className="voteCandidateBtn"
                                  onClick={VoteCountFunc}
                                >
                                  Vote
                                </button>
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
                  <div className="ZeroCountCandi">
                    <h1>Here No Candidates Added !!</h1>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {PhaseOfElec === 2 ? (
                <>
                  <div className="ElectionPhaseMain">
                    <h1> Voting is Over !!</h1>
                  </div>
                </>
              ) : (
                <>
                  <div className="ElectionPhaseMain">
                    <h1>Voting Not Started Yet !!</h1>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default VotingArea;
