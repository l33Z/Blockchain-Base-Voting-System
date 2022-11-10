import { useState, useEffect } from "react";
import "./AdminChangePhase.css";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import electionAbi from "../../Contract/election.json";
const contractAddress = "0xab6D16DC8982DA77C4d8Fb1b01CD0053AbFc8007";

const AdminChnagePhase = () => {
  const navigate = useNavigate();
  const [currPhase, setcurrPhase] = useState("Registration");
  const [nextPhase, setnextPhase] = useState("Change Phase To Voting");
  const [electionState, setElectionState] = useState(198);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const ElectionContarct = new ethers.Contract(
    contractAddress,
    electionAbi,
    provider
  );
  const signer = provider.getSigner();

  // ----------------------------- RETRIVE DATA FROM BLOCKCHAIN -----------------------
  const retriveElectionResult = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ElectionContarct = new ethers.Contract(
      contractAddress,
      electionAbi,
      provider
    );
    const signer = provider.getSigner();

    const datax = await ElectionContarct.connect(
      signer
    ).addCandidateToResultList();
    console.log(datax);
  };

  // ----------------------------- RESET ALL FUNC BLOCKCHAIN -----------------------
  const resetAll = async () => {
    const tx = await ElectionContarct.connect(signer).resetAll();
    console.log(tx);
  };
  //////////////////////////////// CHECK THE OWNER //////////////////////////////////
  const checkOwner = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        if (
          accounts[0].toString() != "0x4162daaa49cb714d2a059331e3e59e30e7f6f5ce"
        ) {
          navigate("/adminwelcome");
        }
      } catch (e) {
        navigate("/adminwelcome");
      }
    } else {
      navigate("/adminwelcome");
    }
  };

  //////////////////////////////// CHECKING PHASE STATE //////////////////////////////////
  const checkState = async () => {
    const StateOfCon = await ElectionContarct.ElectionState();
    console.log(StateOfCon);
    setElectionState(StateOfCon);

    if (StateOfCon === 0) {
      setcurrPhase("Registration");
      setnextPhase("Change Phase To Voting");
    } else if (StateOfCon === 1) {
      setcurrPhase("Voting");
      setnextPhase("Change Phase To Result");
    } else if (StateOfCon === 2) {
      setcurrPhase("Result");
      setnextPhase("Change Phase To Reset All");
    } else if (StateOfCon === 3) {
      setcurrPhase("Reset All");
      setnextPhase("Change Phase To Registration");
    }
  };

  const listOfCan = async () => {
    console.log(await ElectionContarct.allCandidates());
  };
  var zz = true;
  useEffect(() => {
    if (zz) {
      window.ethereum.on("accountchanged", checkOwner);
      checkOwner();
      checkState();
      listOfCan();
      zz = false;
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", checkOwner);
      checkState();

      return () => {
        window.ethereum.removeListener("accountsChanged", checkOwner);
        checkState();
      };
    }
  });

  //////////////////////////////// CHANGING PHASE STATE //////////////////////////////////
  const changePhaseFunc = async () => {
    const StateOfCon = await ElectionContarct.ElectionState();

    if (StateOfCon === 0) {
      try {
        console.log("done");
        const tx = await ElectionContarct.connect(signer).changeState(1);
        console.log(tx);
        console.log(StateOfCon);
      } catch (e) {
        if (e.message.indexOf("user rejected transaction") > -1) {
          toast.error("Transaction Rejected", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Somthing went wrong !!", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else if (StateOfCon === 1) {
      try {
        console.log("done");
        const tx = await ElectionContarct.connect(signer).changeState(2);
        console.log(tx);
        console.log(StateOfCon);
      } catch (e) {
        if (e.message.indexOf("user rejected transaction") > -1) {
          toast.error("Transaction Rejected", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Somthing went wrong !!", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else if (StateOfCon === 2) {
      try {
        console.log("done");
        const tx = await ElectionContarct.connect(signer).changeState(3);
        console.log(tx);
        console.log(StateOfCon);
      } catch (e) {
        if (e.message.indexOf("user rejected transaction") > -1) {
          toast.error("Transaction Rejected", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Somthing went wrong !!", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } else if (StateOfCon === 3) {
      try {
        console.log("done");
        const txs = await ElectionContarct.connect(signer).changeState(0);
        console.log(txs);
        console.log(StateOfCon);
      } catch (e) {
        if (e.message.indexOf("user rejected transaction") > -1) {
          toast.error("Transaction Rejected", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Somthing went wrong !!", {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  };

  return (
    <>
      <AdminSideNavbar />
      <ToastContainer theme="colored" />

      <div className="phaseContainer">
        <div className="mainPhase">
          <h1>Change Phase Of Election</h1>

          <div className="phaseInfo">
            <h2>Current Phase : {currPhase}</h2>
            <button className="phaseBtnChng" onClick={changePhaseFunc}>
              {nextPhase}
            </button>

            {electionState === 2 && (
              <>
                <button
                  onClick={retriveElectionResult}
                  className="updateResultBtn"
                >
                  Get Result
                </button>
              </>
            )}
            {electionState === 3 && (
              <>
                <button onClick={resetAll} className="updateResultBtn">
                  Reset All
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminChnagePhase;
