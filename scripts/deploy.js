require('dotenv').config({ path: '../.env' });
const fs = require('fs');

const ethers = require('ethers');
const hre = require("hardhat");

async function deploy() {
  const provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL); //v5 ethers.providers.JsonRpcProvider() --> ethers.JsonRpcProvider()
  let wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
  let artifacts = await hre.artifacts.readArtifact("HealthCareToken");
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
  let HospitalDonationV6 = await factory.deploy();
  HospitalDonationV6.waitForDeployment();
  return HospitalDonationV6;//to-do for testing it does make sense returning the istance of the contract
                            //at build it will be always retrieved from blockchain
}


module.exports = deploy;