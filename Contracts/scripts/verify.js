const Hre = require("hardhat");
async function main() {
//     token address 0xf1022Df092dd4dcFAAd562d2AEC9a03e00DF66C5
// buyContract address 0x8DDc691461217401b4e04d3DAEE30a30eA48285f
 

  await Hre.run("verify:verify", {
    //Deployed contract OwnedUpgradeabilityProxy address
    address: "0xf1022Df092dd4dcFAAd562d2AEC9a03e00DF66C5",
    //Path of your main contract.
    contract: "contracts/BookToken.sol:BookToken",
  });
  await Hre.run("verify:verify", {
    //Deployed contract Exchange address
    address: "0x8DDc691461217401b4e04d3DAEE30a30eA48285f",
    constructorArguments: ["0xf1022Df092dd4dcFAAd562d2AEC9a03e00DF66C5"],
    //Path of your main contract.
    contract: "contracts/BookContract.sol:BookContract",
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//FactoryContract address 0xcC2871445A3594c2aC16f7Ea868c586eD5DB107E
