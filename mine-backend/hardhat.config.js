require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const DEPLOYER_SIGNER_PRIVATE_KEY= process.env.DEPLOYER_SIGNER_PRIVATE_KEY;
const INFURA_PROJECT_ID_API_KEY= process.env.INFURA_PROJECT_ID_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      // Target URL when Hardhat deploy the Smart Contract
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID_API_KEY}`,
      // Indicates which account will sign the transaction
      accounts: [
        DEPLOYER_SIGNER_PRIVATE_KEY
      ]
    }
  }
};
