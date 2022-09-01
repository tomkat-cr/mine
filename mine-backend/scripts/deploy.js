const hre = require("hardhat");
const fs = require("fs")

const CONTRACT_NAME_SOL = 'Mine.sol'
const CONTRACT_NAME_JSON = 'Mine.json'

async function main() {
  const Mine = await hre.ethers.getContractFactory("Mine");
  const mine = await Mine.deploy();

  await mine.deployed();

  console.log(
    `Mine deployed to ${mine.address}`
  );

  let config = `export const abiMineAddress="${mine.address}"`;

  let data = JSON.stringify(config);
  fs.writeFileSync("../mine-frontend/src/config.js", JSON.parse(data));
  fs.copyFile(
    `./artifacts/contracts/${CONTRACT_NAME_SOL}/${CONTRACT_NAME_JSON}`, 
    `../mine-frontend/src/utils/abi/${CONTRACT_NAME_JSON}`
  ,
   (err) => {
    if (err){
      console.log('Error ocurred ', err);
    }
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
