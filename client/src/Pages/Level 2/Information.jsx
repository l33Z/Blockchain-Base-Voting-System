import { useState, useEffect } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./Information.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import regis from "../../assets/infoAssets/registrationDemo.png";
import vote1 from "../../assets/infoAssets/vote1.png";
import vote2 from "../../assets/infoAssets/vote2.png";
import resultImg from "../../assets/infoAssets/resultImg.png";

const Information = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(false);

  //////////////////////////////// RETRIVING DATA FROM API ////////////////////////////////
  const getCurrentVoter = async () => {
    try {
      const response = await fetch("/api/welcomee", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        setRenderd(true);
      } else if (response.status === 401) {
        navigate("/login");
        setTimeout(function () {
          toast.error("Please Login First ", {
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
    } catch (e) {
      console.log("Errorrrrr : " + e);
      navigate("/login");
    }
  };
  var zz = true;
  useEffect(() => {
    if (zz) {
      getCurrentVoter();
      zz = false;
    }
  }, []);
  return (
    <>
      {Renderd && (
        <>
          <SideNavbar />
          <ToastContainer theme="colored" />
          <div className="informationMain">
            <h1>Information Section</h1>
            <div className="infoSteps">
              <div className="step">
                <h2> 1. How To Install Metamask ?</h2>
                <div className="conenetImg">
                  <iframe
                    width="900"
                    height="415"
                    src="https://www.youtube.com/embed/cn8gKxUSquo"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="step">
                <h2> 2. Select Goerli Test Network In Metamask</h2>
                <div className="conenetImg">
                  <iframe
                    width="900"
                    height="415"
                    src="https://www.youtube.com/embed/dSx14epF1lc"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>

              <div className="step">
                <h2> 3. Add Ether To Goerli Test Network</h2>
                <div className="conenetImg">
                  <iframe
                    width="900"
                    height="415"
                    src="https://www.youtube.com/embed/f9-mxDQQ3-g"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>

              <div className="step">
                <h2>
                  4. Fill the Details For Voting In Vote Registration Section
                  And Wait For Metamask Confirmation
                </h2>
                <div className="conenetImg">
                  <img src={regis} alt="regisImg" />
                </div>
              </div>

              <div className="step">
                <h2>
                  5. Select Candidate In Voting Area Section and Wait For
                  Metamask Confirmation
                </h2>
                <div className="conenetImg">
                  <img src={vote1} alt="voteimg" />
                  <img src={vote2} alt="voteimg" />
                </div>
              </div>

              <div className="step">
                <h2>
                  6. After Result Declaration You Can See Result In Result area
                </h2>
                <div className="conenetImg">
                  <img src={resultImg} alt="resultImg" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Information;
