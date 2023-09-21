import React, { useEffect } from "react";

import { getCurrentAccount } from "../../commonEthFunctions";

const WalletFormik = ({ setAccount, setConnButtonText }) => {
  const fetchWalletAddress = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const account = await getCurrentAccount();
        updateAccount(account);
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error in fetchWalletAddress:", error);
    }
  };

  const updateAccount = (newAccount) => {
    try {
      setAccount(newAccount);
      setConnButtonText(
        newAccount === null
          ? "-"
          : newAccount
          ? `${newAccount.slice(0, 6)}...${newAccount.slice(-5)}`
          : ""
      );
    } catch (error) {
      console.log("Error in updateAccount:", error);
    }
  };

  const handleChainChange = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.on("accountsChanged", (account) => {
        updateAccount(account[0]);
      });
      window.ethereum.on("chainChanged", handleChainChange);

      return () => {
        window.ethereum.removeListener("accountsChanged", updateAccount);
        window.ethereum.removeListener("chainChanged", handleChainChange);
      };
    }
  }, []);

  const handleConnectClick = () => {
    fetchWalletAddress();
    // onSubmit(values); // Uncomment this line if you plan to use form values
  };

  return (
    <div>
      <button type="submit" onClick={handleConnectClick}>
        Connect
      </button>
    </div>
  );
};

export default WalletFormik;
