import "./style.css";
import NavbarView from "./components/NavbarView";
import HomeView from "./components/HomeView";
import FooterView from "./components/FooterView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProposalView from "./components/ProposalView";
import ConnectWallet from "./components/ConnectWallet";
import DiscoverView from "./components/DiscoverView";
import ProjectView from "./components/ProjectView";
import ProfileView from "./components/ProfileView";
import { useState } from "react";
import { ethers } from "ethers";
import { abi } from "./abi";
const CONTRACT_ADDRESS = "0xa78b46809902e1Bf265D709004c171F91dD27691";

function App() {
  const [myContract, setMyContract] = useState(null);
  const [address, setAddress] = useState();
  let provider, signer, add;

  async function changeNetwork() {
    // switch network to avalanche
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x29" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x29",
                chainName: "Telos Testnet",
                nativeCurrency: {
                  name: "Telos",
                  symbol: "TLOS",
                  decimals: 18,
                },
                rpcUrls: ["https://testnet.telos.net/evm"],
              },
            ],
          });
        } catch (addError) {
          alert("Error in add Telos testnet");
        }
      }
    }
  }

  // Connects to Metamask and sets the myContract state with a new instance of the contract
  async function connect() {
    let res = await connectToMetamask();
    if (res === true) {
      await changeNetwork();
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      add = await signer.getAddress();
      setAddress(add);

      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        setMyContract(contract);
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly");
        console.log(err);
      }
    } else {
      alert("Couldn't connect to Metamask");
    }
  }

  // Helps open Metamask
  async function connectToMetamask() {
    try {
      await window.ethereum.enable();
      return true;
    } catch (err) {
      return false;
    }
  }
  const checkConnected = (component) => {
    return !myContract ? (
      <ConnectWallet connectMetamask={connect} />
    ) : (
      component
    );
  };
  return (
    <div className="app">
      <BrowserRouter>
        {myContract && <NavbarView address={address} />}
        <Routes>
          <Route
            path="/"
            element={checkConnected(<HomeView contract={myContract} />)}
          />
          <Route
            path="create_project"
            element={checkConnected(
              <ProposalView contract={myContract} />
            )}
          />
          <Route
            path="discover"
            element={checkConnected(
              <DiscoverView contract={myContract} />
            )}
          />
          <Route
            path="profile"
            element={checkConnected(
              <ProfileView contract={myContract} userAddress={address} />
            )}
          />
          <Route
            path="project"
            element={checkConnected(
              <ProjectView contract={myContract} userAddress={address} />
            )}
          />
        </Routes>
        {myContract && <FooterView />}
      </BrowserRouter>
    </div>
  );
}

export default App;
