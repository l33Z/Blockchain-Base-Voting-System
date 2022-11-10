import React, { useEffect, useState } from "react";
import "./Welcome.css";
import SideNavbar from "../../Components/SideNavbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ethers } from "ethers";

const Welcome = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(false);
  const [currentVoter, setCurrentVoter] = useState("");
  const [BtnStateMsg, setBtnStateMsg] = useState("Connect To Metamask");
  const [CurrentAccount, setCurrentAccount] = useState(
    "0x00000000000000000000000000000000"
  );
  const [CurrentAccountBalance, setCurrentAccountBalance] = useState(0.0);

  //////////////////////////////// CONNECT TO METAMASK ////////////////////////////////
  const connectToMetamask = async (e) => {
    if (window.ethereum) {
      // handleAccountChange();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
      var balance = await provider.getBalance(accounts[0]);
      balance = ethers.utils.formatEther(balance);
      setCurrentAccountBalance(balance);

      if (accounts.length > 0) {
        setBtnStateMsg("Connected To Metamask");
        if (CurrentAccount === "0x00000000000000000000000000000000") {
          toast.success("Connected To Metamask", {
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
        }
      }
    } else {
      toast.error("Please Install Metamask", {
        style: {
          fontSize: "15px",
          letterSpacing: "1px",
        },
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleAccountChange = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setCurrentAccount(accounts[0]);
    var balance = await provider.getBalance(accounts[0]);
    balance = ethers.utils.formatEther(balance);
    setCurrentAccountBalance(balance);
    toast.info(`Connected To ${accounts[0]}`, {
      style: {
        fontSize: "13px",
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
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      };
    }
  });

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

      if (response.status === 200) {
        setCurrentVoter(data);
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
          <div className="welcomeContainer">
            <ToastContainer theme="colored" />
            <div className="topWlcomePart">
              <h1>
                <span id="wave">👋</span> Hello, {currentVoter}
              </h1>
              <button
                onClick={connectToMetamask}
                id={
                  BtnStateMsg === "Connect To Metamask"
                    ? "metaBtn"
                    : "connected"
                }
              >
                {BtnStateMsg}
              </button>
            </div>

            <div className="middleWelcomeDiv">
              <div className="connectionProcess">
                <h2> - Follow Below Step To Connect To BlockChain</h2>
                <div className="steps">
                  <h3>1. First Connect To Metamask Wallet</h3>
                  <h3>2. Select Network To Goerli Test Network</h3>
                  <h3>
                    3. Check The Balance Of connected Account It should be not
                    Zero
                  </h3>
                  <h3>4. After that proceed to next Step</h3>
                </div>
              </div>
            </div>

            <div className="accountDetails">
              <h2> - Account Details</h2>
              <div className="accountAddress">
                <h3>Account Address : {CurrentAccount}</h3>
                <h3>Account Balance : {CurrentAccountBalance} ETH</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Welcome;
