import { useState, useEffect } from "react";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import "./AllCandidates.css";

const VotingArea = () => {
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
      <AdminSideNavbar />
      <div className="AdminvotingAreaConatiner">
        <div className="AdminvotingAreaMain">
          <h1>Candidates</h1>
          <div className="Admincandidates">
            {Candidates.map((can) => {
              return (
                <div className="AdmincandidateBox" key={can._id}>
                  <div className="acandidateImg">
                    <img src={`/uploads/${can.CandidateImage}`} alt="img" />
                  </div>
                  <div className="acandidateName">
                    <h2>Name : {can.CandidateName}</h2>
                    <h2>Party : {can.CandidatePartyName}</h2>
                    <h2>Party : {can.CandidateAge}</h2>
                    <h2>Votes : {can.TotalVotes}</h2>
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
