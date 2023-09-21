import Web3 from "web3";

/**
 * Gets the Ethereum provider using MetaMask or a compatible wallet extension.
 * @returns {Web3} The Ethereum provider.
 * @throws {Error} If no Ethereum provider is found.
 */
export function getEthereumProvider() {
  if (window.ethereum) {
    const { ethereum } = window;
    console.log("ethereum", ethereum);
    return new Web3(ethereum);
  } else {
    throw new Error(
      "No Ethereum provider found. Please install MetaMask or a compatible wallet extension."
    );
  }
}

/**
 * Creates a contract instance using the provided ABI, address, and provider.
 * @param {Object} ABI - The contract ABI (Application Binary Interface).
 * @param {string} address - The contract address.
 * @param {Web3} provider - The Ethereum provider.
 * @returns {Contract} The contract instance.
 */
export async function createContractInstance(ABI, address) {
  const provider = getEthereumProvider();
  return new provider.eth.Contract(ABI, address);
}

/**
 * Gets the current Ethereum network ID.
 * @param {Web3} provider - The Ethereum provider.
 * @returns {number} The network ID.
 */
export async function getCurrentNetworkId(provider) {
  const networkId = await provider.eth.net.getId();
  return networkId;
}

/**
 * Gets the currently selected Ethereum account.
 * @returns {string} The Ethereum account address.
 * @throws {Error} If there is an error requesting the account.
 */
export async function getCurrentAccount() {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (error) {
    throw new Error("Error requesting accounts: " + error.message);
  }
}

/**
 * Gets the current Ethereum chain ID.
 * @returns {string} The Ethereum chain ID.
 * @throws {Error} If there is an error getting the chain ID.
 */
export async function getCurrentChainId() {
  try {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    return chainId;
  } catch (error) {
    throw new Error("Error getting chain ID: " + error.message);
  }
}
/**
 * Calls a read-only method on a smart contract using Web3.js.
 * @param {Object} ABI - The contract ABI (Application Binary Interface).
 * @param {string} contractAddress - The contract address.
 * @param {string} method - The name of the method to call.
 * @param {Array} data - An array of method parameters.
 */

export async function callGetMethod(ABI, contractAddress, method, data) {
  const contractInstance = await createContractInstance(ABI, contractAddress);

  try {
    const result = await contractInstance.methods[method]
      .apply(null, Array.prototype.slice.call(data))
      .call();

    console.log("Transaction result:", result);
  } catch (error) {
    console.error("Error in the callGetMethod:", error);
  }
}
/**
 * Calls a method on a smart contract that modifies the blockchain using Web3.js.
 * @param {Object} ABI - The contract ABI (Application Binary Interface).
 * @param {string} contractAddress - The contract address.
 * @param {string} walletAddress - The Ethereum wallet address initiating the transaction.
 * @param {string} method - The name of the method to call.
 * @param {Array} data - An array of method parameters.
 * @param {number} value - The value to send with the transaction (in Wei).
 */

export async function callSendMethod(
  ABI,
  contractAddress,
  walletAddress,
  method,
  data,
  value
) {
  const contractInstance = await createContractInstance(ABI, contractAddress);

  if (walletAddress === "") {
    console.error("Wallet address is incorrect");
    return;
  }

  const dataToSend = { from: walletAddress };

  if (value) {
    dataToSend.value = value;
  }

  try {
    const estGas = await contractInstance.methods[method]
      .apply(null, Array.prototype.slice.call(data))
      .estimateGas(dataToSend);

    dataToSend.estGas = estGas;

    const tx = await contractInstance.methods[method]
      .apply(null, Array.prototype.slice.call(data))
      .send(dataToSend);

    console.log("Transaction hash:", tx.transactionHash);
  } catch (error) {
    console.error("Error occurred in the send method:", error);
  }
}
