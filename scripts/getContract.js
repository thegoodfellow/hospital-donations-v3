require('dotenv').config({ path: '../.env' });
const fs = require('fs');

const ethers = require('ethers');
const hre = require("hardhat");

const addressPath = "../contractAddress.json";
const abiPath = "../artifacts/contracts/HospitalDonationV6.sol/HealthCareToken.json";

async function getContract() {

  //retrieve data from json file
  let rawData = fs.readFileSync(addressPath); 
  let jsonData = JSON.parse(rawData); 
  const address = jsonData.address;
  //retrieve contract from node
  rawData = fs.readFileSync(abiPath);
  jsonData = JSON.parse(rawData); 
  const abi = jsonData.abi;

  const provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL); //v5 ethers.providers.JsonRpcProvider() --> ethers.JsonRpcProvider()
  const HospitalDonationV6 = new ethers.Contract(address, abi, provider);

  return HospitalDonationV6;
}


module.exports = getContract;