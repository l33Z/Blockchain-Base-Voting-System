import { useState, useEffect } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./VotingArea.css";
import userPng from "../../assets/user.png";
const VotingArea = () => {
  const [canName, setcanName] = useState("");
  const [canParty, setcanParty] = useState("");
  const [canImg, setcanImg] = useState("");
  const [canage, setcanage] = useState("");

  const [Candidates, setCandidates] = useState([]);

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
      setCandidates(data);
    } else {
      throw new Error(response.error);
    }
  };
  useEffect(() => {
    getCandidatesData();
  }, []);

  return (
    <>
      <SideNavbar />
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
      ///////////////////////////// MODAL END //////////////////////////////
      <div className="votingAreaConatiner">
        <div className="votingAreaMain">
          <h1>Candidates</h1>
          <div className="candidates">
            {Candidates.map((can) => {
              return (
                <div className="candidateBox" key={can._id}>
                  <img
                    src={`/uploads/${can.CandidateImage}`}
                    alt="img"
                    id="candidateImg"
                  />
                  <div className="candidateName">
                    <h2>
                      Name : <span id="cname">{can.CandidateName}</span>
                    </h2>
                    <h2>
                      Party : <span id="cparty">{can.CandidatePartyName}</span>
                    </h2>

                    <h6 id="cage">{can.CandidateAge}</h6>
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
                          e.target.parentNode.parentNode.querySelector("#cage")
                            .innerHTML
                        );
                      }}
                    >
                      Info
                    </button>
                    <button className="voteCandidateBtn">Vote</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VotingArea;
