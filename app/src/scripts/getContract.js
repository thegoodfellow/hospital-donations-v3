require('dotenv').config({ path: '../.env' })
const ethers = require('ethers');
//const hre = require("hardhat");

const fs = require('fs');
const addressPath = "../contractInfo/contractAddress.json";
const abiPath = "../contractInfo/abi.json";

async function getContract() {
  console.log("START - scripts/getContract.js");

    //retrieve data from json file
    let rawData = fs.readFileSync(addressPath); 
    let jsonData = JSON.parse(rawData); 
    const address = jsonData.address;
    console.log("address: " + address);
  
    //retrieve contract from node
    console.log("abiPath: " + abiPath);
    rawData = fs.readFileSync(abiPath);
    //console.log("abi - JSON.stringify(rawData): " + JSON.stringify(rawData)); 
    jsonData = JSON.parse(rawData); 
    const abi = jsonData.abi;
    //console.log("JSON.stringify(abi): " + JSON.stringify(abi));
  
  console.log("process.env.NETWORK_URL: " + process.env.NETWORK_URL);
  const provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL); //v5 ethers.providers.JsonRpcProvider() --> ethers.JsonRpcProvider()
  console.log("JSON.stringify(provider): " + JSON.stringify(provider));

  const HospitalDonationV6 = new ethers.Contract(address, abi, provider);
  //console.log("JSON.stringify(HospitalDonationV6): " + JSON.stringify(HospitalDonationV6));
  //const addressOfContr = await HospitalDonationV6.getAddress();
  //console.log("addressOfContr: " + addressOfContr);
  
  console.log("END - scripts/getContract.js");
  return HospitalDonationV6;

}


module.exports = getContract;