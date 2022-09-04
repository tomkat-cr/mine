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
    rinkeby: {
      // Target URL when Hardhat deploy the Smart Contract
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID_API_KEY}`,
      // Indicates which account will sign the transaction
      accounts: [
        DEPLOYER_SIGNER_PRIVATE_KEY
      ]
    },
    ropsten: {
      // Target URL when Hardhat deploy the Smart Contract
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID_API_KEY}`,
      // Indicates which account will sign the transaction
      accounts: [
        DEPLOYER_SIGNER_PRIVATE_KEY
      ]
    },
    goerli: {
      // Target URL when Hardhat deploy the Smart Contract
      url: `https://eth-goerli.g.infura.com/v2/${INFURA_PROJECT_ID_API_KEY}`,
      // Indicates which account will sign the transaction
      accounts: [
        DEPLOYER_SIGNER_PRIVATE_KEY
      ]
    },
    kovan: {
      // Target URL when Hardhat deploy the Smart Contract
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID_API_KEY}`,
      // Indicates which account will sign the transaction
      accounts: [
        DEPLOYER_SIGNER_PRIVATE_KEY
      ]
    },
    sepolia: {
      // Target URL when Hardhat deploy the Smart Contract
      url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID_API_KEY}`,
      // Indicates which account will sign the transaction
      accounts: [
        DEPLOYER_SIGNER_PRIVATE_KEY
      ]
    }
  }
};
