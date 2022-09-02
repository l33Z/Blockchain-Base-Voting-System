import { useEffect, useState } from "react";
import "./AdminWelcome.css";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import { ToastContainer, toast, Flip } from "react-toastify";
import { ethers } from "ethers";
import { NavLink, useNavigate } from "react-router-dom";

const AdminWelcome = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(false);

  const [currentVoter, setCurrentVoter] = useState("");
  const [BtnStateMsg, setBtnStateMsg] = useState("Connect To Metamask");
  const [CurrentAccount, setCurrentAccount] = useState(
    "0x00000000000000000000000000000000"
  );
  const [CurrentAccountBalance, setCurrentAccountBalance] = useState(0.0);
  const [OnlyOwner, setOnlyOwner] = useState(false);

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
      if (
        accounts[0].toString() == "0x4162daaa49cb714d2a059331e3e59e30e7f6f5ce"
      ) {
        setOnlyOwner(true);
      } else {
        setOnlyOwner(false);
      }

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
    if (
      accounts[0].toString() == "0x4162daaa49cb714d2a059331e3e59e30e7f6f5ce"
    ) {
      setOnlyOwner(true);
    } else {
      setOnlyOwner(false);
    }
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

  //////////////////////////////// RETRIVING ADMIN DATA FROM API ////////////////////////////////
  const getCurrentAdmin = async () => {
    try {
      const response = await fetch("/api/admin/welcomee", {
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
      }

      if (!response.status === 200) {
        throw new Error(response.error);
      }
    } catch (e) {
      console.log("Errorrrrr : " + e);
      navigate("/admin");
    }
  };
  var zz = true;
  useEffect(() => {
    if (zz) {
      getCurrentAdmin();
      zz = false;
    }
  }, []);

  return (
    <>
      {Renderd && (
        <>
          <AdminSideNavbar />
          <div className="AinformationMain">
            <ToastContainer theme="colored" />
            <div className="AtopWlcomePart">
              <h1>
                <span id="awave">👋</span> Hello, {currentVoter}
              </h1>
              <button
                onClick={connectToMetamask}
                id={
                  BtnStateMsg === "Connect To Metamask"
                    ? "ametaBtn"
                    : "aconnected"
                }
              >
                {BtnStateMsg}
              </button>
            </div>
            <div className="AaccountDetails">
              <h2> - Account Details</h2>
              <div className="AaccountAddress">
                <h3>Account Address : {CurrentAccount}</h3>
                <h3>Account Balance : {CurrentAccountBalance} ETH</h3>
              </div>
            </div>

            <div className="adminPower">
              <h2> - Admin Access</h2>
              <div className="addCandidate">
                {OnlyOwner === true ? (
                  <>
                    <NavLink to="/addcandidates" id="addCanBtn">
                      <i className="fa-solid fa-circle-plus"></i>Add New
                      Candidate
                    </NavLink>
                    <NavLink to="/phase" id="phaseBtn">
                      <i className="fa-solid fa-file-pen"></i>Change Phase
                    </NavLink>
                  </>
                ) : (
                  <h3>You Dont Have Permision To Add New Candidate !!</h3>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminWelcome;
