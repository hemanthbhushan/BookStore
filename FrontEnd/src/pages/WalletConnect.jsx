import { useState, useEffect, React } from "react";
import {
  getAccount,
  getProvider,
  getContract,
} from "../constants/commonEthFunctions.js";
import { Link } from "react-router-dom";
import { BOOKADDRESS } from "../config.js";
import BookContractAbi from "../constants/ABI/BookContractAbi.json";
const WalletConnect = () => {
  const [account, setAccount] = useState("");
  const [connButtonText, setConnButtonText] = useState("");

  const handleConnectWallet = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const account = await getAccount();
        handleAccountChange(account);
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccountChange = (newAccount) => {
    setAccount(newAccount);
    setConnButtonText(
      newAccount === null
        ? "-"
        : newAccount
        ? `${newAccount.substring(0, 6)}...${newAccount.substring(
            newAccount.length - 5
          )}`
        : ""
    );
  };

  const handleChainChange = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.on("accountsChanged", handleAccountChange);
      window.ethereum.on("chainChanged", handleChainChange);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
        window.ethereum.removeListener("chainChanged", handleChainChange);
      };
    }
  }, []);

  return (
    <div>
      <Link to="/">Home</Link>
      walletConnect
    </div>
  );
};

export default WalletConnect;
