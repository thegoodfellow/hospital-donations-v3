const ethers = require('ethers');

const hre = require("hardhat");

//it does deploy the contract on the local newtwork but for some reason won't terminate execution...

async function deploy(wallet) {
  console.log("START - scripts/deploy.js");


  let artifacts = await hre.artifacts.readArtifact("HealthCareToken");

  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let HospitalDonationV6 = await factory.deploy();

  HospitalDonationV6.waitForDeployment();

  const address = await HospitalDonationV6.getAddress();//v5 address --> v6 getAddress()


  console.log("HospitalDonationV6 contract deployed at address:", address);
  
  console.log("END - scripts/deploy.js");
  return HospitalDonationV6;

}


module.exports = deploy;