require('dotenv').config({ path: '../.env' })
//console.log(process.env)
const ethers = require('ethers');
const hre = require("hardhat");

const fs = require('fs');


//it does deploy the contract on the local newtwork but for some reason won't terminate execution...

async function deploy() {
  console.log("START - scripts/deploy.js");

  //console.log("process.env.NETWORK_URL: " + process.env.NETWORK_URL);
  const provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL); //v5 ethers.providers.JsonRpcProvider() --> ethers.JsonRpcProvider()
  //console.log("JSON.stringify(provider): " + JSON.stringify(provider));
  let wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
  //console.log("JSON.stringify(wallet): " + JSON.stringify(wallet));

  let artifacts = await hre.artifacts.readArtifact("HealthCareToken");

  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let HospitalDonationV6 = await factory.deploy();

  HospitalDonationV6.waitForDeployment();

  //const address = await HospitalDonationV6.getAddress();//v5 address --> v6 getAddress()
  //console.log("HospitalDonationV6 contract deployed at address:", address);
  
  console.log("END - scripts/deploy.js");
  return HospitalDonationV6;//to-do for testing it does make sense returning the istance of the contract
                            //at build it will be always retrieved from blockchain

}


module.exports = deploy;