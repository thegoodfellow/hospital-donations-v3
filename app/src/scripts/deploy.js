require('dotenv').config({ path: '../.env' })
//console.log(process.env)
const ethers = require('ethers');
const hre = require("hardhat");

const fs = require('fs');
const filePath = "../contractAddress.json";


//it does deploy the contract on the local newtwork but for some reason won't terminate execution...

async function deploy() {
  console.log("START - scripts/deploy.js");

  //to-do each time the function is called it overwrites the contractAdress file with the new address 
  //to-do of the deployed contract
  //to-do it coul make sense to check if it already exists an address..

  console.log("contractAddress.json reading...")
  console.log("filePath: " + filePath);
  //retrieve data from json file
  const rawData = fs.readFileSync(filePath); 
  console.log("rawData: " + rawData);
  const jsonData = JSON.parse(rawData); 
  console.log("jsonData: " + jsonData);

  console.log("process.env.NETWORK_URL: " + process.env.NETWORK_URL);
  const provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL); //v5 ethers.providers.JsonRpcProvider() --> ethers.JsonRpcProvider()
  console.log("JSON.stringify(provider): " + JSON.stringify(provider));
  let wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
  console.log("JSON.stringify(wallet): " + JSON.stringify(wallet));

  let artifacts = await hre.artifacts.readArtifact("HealthCareToken");

  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let HospitalDonationV6 = await factory.deploy();

  HospitalDonationV6.waitForDeployment();

  const address = await HospitalDonationV6.getAddress();//v5 address --> v6 getAddress()


  //add new address
  console.log("jsonData.addressesArray: " + jsonData.address);
  jsonData.address = address;

  //write back to json file
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

  console.log("HospitalDonationV6 contract deployed at address:", address);
  
  console.log("END - scripts/deploy.js");
  return HospitalDonationV6;//to-do for testing it does make sense returning the istance of the contract
                            //at build it will be always retrieved from blockchain

}


module.exports = deploy;