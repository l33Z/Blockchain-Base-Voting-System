import { useEffect, useState } from "react";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import "./AdminResult.css";
import modi from "../../assets/modi.jpg";
import party from "../../assets/party.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Result = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(false);
  const [Candidates, setCandidates] = useState([]);

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
      setCandidates(data);
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
          <div className="AdminresultConatiner">
            <div className="AdminresultMain">
              <h1>Result Area</h1>
              <div className="AdminwinnerInfo">
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
      )}
    </>
  );
};

export default Result;
