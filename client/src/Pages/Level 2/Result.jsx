import React from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./Result.css";
import modi from "../../assets/modi.jpg";
import party from "../../assets/party.png";

const Result = () => {
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
                <tr>
                  <td>1</td>
                  <td>Narendra Modi</td>
                  <td>BJP</td>
                  <td>562</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Rahul Gandhi</td>
                  <td>Congress</td>
                  <td>400</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Arvind Kejriwal</td>
                  <td>AAP</td>
                  <td>350</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Arvind Kejriwal</td>
                  <td>AAP</td>
                  <td>350</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Arvind Kejriwal</td>
                  <td>AAP</td>
                  <td>350</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Arvind Kejriwal</td>
                  <td>AAP</td>
                  <td>350</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
