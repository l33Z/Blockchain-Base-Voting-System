import React from "react";
import { useState } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./VotingArea.css";
import modi from "../../assets/modi.jpg";
import rahul from "../../assets/rahul.jpg";
import kejriwal from "../../assets/kejriwal.jpg";

const VotingArea = () => {
  const [canName, setcanName] = useState("");
  const [canParty, setcanParty] = useState("");
  const [canImg, setcanImg] = useState("");

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
                  <h2>Age : 71 Years Old</h2>
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
      <div className="votingAreaConatiner">
        <div className="votingAreaMain">
          <h1>Candidates</h1>

          <div className="candidates">
            <div className="candidateBox">
              <img src={modi} alt="img" id="candidateImg" />
              <div className="candidateName">
                <h2>
                  Name : <span id="cname">Narendra Modi</span>{" "}
                </h2>
                <h2>
                  Party : <span id="cparty">BJP</span>
                </h2>
              </div>
              <button
                className="voteCandidateBtn"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={(e) => {
                  setcanImg(
                    e.target.parentNode.querySelector("#candidateImg").src
                  );
                  setcanName(
                    e.target.parentNode
                      .querySelector("#cname")
                      .innerHTML.toString()
                  );
                  setcanParty(
                    e.target.parentNode.querySelector("#cparty").innerHTML
                  );
                }}
              >
                Vote
              </button>
            </div>

            <div className="candidateBox">
              <img src={rahul} alt="img" id="candidateImg" />
              <div className="candidateName">
                <h2>
                  Name : <span id="cname">Rahul Gandhi</span>{" "}
                </h2>
                <h2>
                  Party : <span id="cparty">CONGRESS</span>
                </h2>
              </div>
              <button
                className="voteCandidateBtn"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={(e) => {
                  setcanImg(
                    e.target.parentNode.querySelector("#candidateImg").src
                  );
                  setcanName(
                    e.target.parentNode
                      .querySelector("#cname")
                      .innerHTML.toString()
                  );
                  setcanParty(
                    e.target.parentNode
                      .querySelector("#cparty")
                      .innerHTML.toString()
                  );
                }}
              >
                Vote
              </button>
            </div>
            <div className="candidateBox">
              <img src={kejriwal} alt="img" id="candidateImg" />
              <div className="candidateName">
                <h2>
                  Name : <span id="cname">Arvind Kejriwal</span>
                </h2>
                <h2>
                  Party : <span id="cparty">AAP</span>
                </h2>
              </div>
              <button
                className="voteCandidateBtn"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={(e) => {
                  setcanImg(
                    e.target.parentNode.querySelector("#candidateImg").src
                  );
                  setcanName(
                    e.target.parentNode
                      .querySelector("#cname")
                      .innerHTML.toString()
                  );
                  setcanParty(
                    e.target.parentNode
                      .querySelector("#cparty")
                      .innerHTML.toString()
                  );
                }}
              >
                Vote
              </button>
            </div>
            <div className="candidateBox">
              <img src={kejriwal} alt="img" id="candidateImg" />
              <div className="candidateName">
                <h2>
                  Name : <span id="cname">Arvind Kejriwal</span>
                </h2>
                <h2>
                  Party : <span id="cparty">AAP</span>
                </h2>
              </div>
              <button
                className="voteCandidateBtn"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={(e) => {
                  setcanImg(
                    e.target.parentNode.querySelector("#candidateImg").src
                  );
                  setcanName(
                    e.target.parentNode
                      .querySelector("#cname")
                      .innerHTML.toString()
                  );
                  setcanParty(
                    e.target.parentNode
                      .querySelector("#cparty")
                      .innerHTML.toString()
                  );
                }}
              >
                Vote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VotingArea;
