import { useEffect, useState } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./Result.css";
import modi from "../../assets/modi.jpg";
import party from "../../assets/party.png";

const Result = () => {
  const [Candidates, setCandidates] = useState([]);

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
          <h1>Result Area</h1>
          <div className="winnerInfo">
            <div className="winnerImg">
              <img src={modi} alt="winner" />
            </div>
            <div className="winnerName">
              <h3 id="winnerHead">
                <span id="PopperDiv">
                  <img src={party} alt="popper" id="partyPopperImg" />
                </span>
                Winner 🎉 is
              </h3>
              <h2> Name : Narendra Modi</h2>
              <h2> Party : Bhajap</h2>
              <h2> Total Votes : 562 </h2>
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
