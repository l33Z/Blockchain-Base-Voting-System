import { useState, useEffect } from "react";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import "./AllCandidates.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const VotingArea = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(false);
  const [Candidates, setCandidates] = useState([]);

  //////////////////////////////// RETRIVING DATA FROM API ////////////////////////////////
  const getCandidatesData = async () => {
    const response = await fetch("/api/admin/allcandidates", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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

  return (
    <>
      {Renderd && (
        <>
          <ToastContainer theme="colored" />
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
      )}
    </>
  );
};

export default VotingArea;
