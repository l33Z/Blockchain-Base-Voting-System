import { useEffect, useState } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./Result.css";
import party from "../../assets/party.png";

const Result = () => {
  const [Candidates, setCandidates] = useState([]);
  const [winnerHeading, setwinnerHeading] = useState("Winner 🎉 is");
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
      setCandidates(data);
      if (data[0].TotalVotes === data[1].TotalVotes) {
        setwinnerHeading("Election Is Draw");
      }
    } else {
      throw new Error(response.error);
    }
  };
  useEffect(() => {
    getCandidatesData();
  }, []);

  var CandidatePostionId = 1;
  return (
    <>
      <SideNavbar />
      <div className="resultConatiner">
        <div className="resultMain">
          {Candidates[0] && (
            <div className="renderCondition">
              <h1>Result Area</h1>
              <div className="winnerInfo">
                <div className="winnerImg">
                  <img
                    src={`/uploads/${Candidates[0].CandidateImage}`}
                    alt="winner"
                  />
                </div>
                <div className="winnerName">
                  <h3 id="winnerHead">
                    <span id="PopperDiv">
                      <img src={party} alt="popper" id="partyPopperImg" />
                    </span>
                    {winnerHeading}
                  </h3>

                  <h2> Name : {Candidates[0].CandidateName}</h2>
                  <h2> Party : {Candidates[0].CandidatePartyName}</h2>
                  <h2> Total Votes : {Candidates[0].TotalVotes} </h2>
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
                {Candidates.map((can) => {
                  return (
                    <tr key={can._id}>
                      <td>{CandidatePostionId++}</td>
                      <td>{can.CandidateName}</td>
                      <td>{can.CandidatePartyName}</td>
                      <td>{can.TotalVotes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
