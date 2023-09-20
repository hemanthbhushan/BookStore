const BN = require("ethers").BigNumber;
const { ethers, upgrades } = require("hardhat");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function main() {
  const Token = await ethers.getContractFactory("BookToken");

  const BuyContracy = await ethers.getContractFactory("BookContract");

  let token = await Token.deploy();
  console.log("token address", await token.getAddress());
  await sleep(6000);

  let buyContracy = await BuyContracy.deploy(token.getAddress());
  console.log("buyContract address", await buyContracy.getAddress());
  await sleep(6000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
