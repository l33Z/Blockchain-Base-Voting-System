import React, { useEffect, useState } from "react";
import "./Welcome.css";
import SideNavbar from "../../Components/SideNavbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";

const Welcome = () => {
  const navigate = useNavigate();
  const [currentVoter, setCurrentVoter] = useState("");

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

      const data = await response.json();
      setCurrentVoter(data);
      if (response.status === 401) {
        navigate("/login");
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
      }

      if (!response.status === 200) {
        throw new Error(response.error);
      }
    } catch (e) {
      console.log("Errorrrrr : " + e);
      navigate("/login");
    }
  };
  useEffect(() => {
    getCurrentVoter();
  }, []);

  return (
    <>
      <SideNavbar />
      <div className="welcomeContainer">
        <ToastContainer theme="colored" />
        <div className="topWlcomePart">
          <h1>👋 Hello, {currentVoter}</h1>
          <button id="metaBtn">Connect To Metamask</button>
        </div>

        <div className="middleWelcomeDiv">
          <div className="connectionProcess">
            <h2> - Follow Below Step To Connect To BlockChain</h2>
            <div className="steps">
              <h3>1. First Connect To Metamask Wallet</h3>
              <h3>2. Select Network To Rinkeby Test Network</h3>
              <h3>
                3. Check The Balance Of connected Account It should be not Zero
              </h3>
              <h3>4. After that proceed to next Step</h3>
            </div>
          </div>
        </div>

        <div className="accountDetails">
          <h2> - Account Details</h2>
          <div className="accountAddress">
            <h3>
              Account Address : 0x5193B5DFfBaa7b75BcF00B0090b89a79C01CD327
            </h3>
            <h3>Account Balance : 6.6592 ETH</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
