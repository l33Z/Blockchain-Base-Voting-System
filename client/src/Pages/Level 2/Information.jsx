import { useState, useEffect } from "react";
import SideNavbar from "../../Components/SideNavbar";
import "./Information.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
          </div>
        </>
      )}
    </>
  );
};

export default Information;
