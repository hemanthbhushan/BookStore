import Web3 from "web3";

export function getProvider() {
  if (window.ethereum) {
    const { ethereum } = window;
    return new Web3(ethereum);
  } else {
    throw new Error(
      "No Ethereum provider found. Please install MetaMask or a compatible wallet extension."
    );
  }
}

export function getContract(ABI, address, provider) {
  return new provider.eth.Contract(ABI, address);
}

export async function getNetwork(provider) {
  const networkId = await provider.eth.net.getId();
  return networkId;
}

export async function getAccount() {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (error) {
    throw new Error("Error requesting accounts: " + error.message);
  }
}

export async function getChainId() {
  try {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    return chainId;
  } catch (error) {
    throw new Error("Error getting chain ID: " + error.message);
  }
}
