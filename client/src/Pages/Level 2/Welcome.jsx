import React from "react";
import "./Welcome.css";
import SideNavbar from "../../Components/SideNavbar";

const Welcome = () => {
  return (
    <>
      <SideNavbar />
      <div className="welcomeContainer">
        <div className="topWlcomePart">
          <h1>👋 Hello, Zeel Rabadiya</h1>
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
