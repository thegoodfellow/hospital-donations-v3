//require('dotenv').config({ path: '../../../.env' }); //not necessary with react v5 and higher --> react-scripts does the job
const ethers = require('ethers');
//const hre = require("hardhat");

//to-do take off all this stuff of fs reading and so on
//to-do just assign what is inside the json files to consts and ...

//const fs = require('fs');
//const addressPath = "../contractInfo/contractAddress.json";
//const abiPath = "../contractInfo/abi.json";
const addressJson = require("../contractAddress.json");
const artifactJson = require("../artifacts/contracts/HospitalDonationV6.sol/HealthCareToken.json");

async function getContract() {
  console.log("START - scripts/getContract.js");

  //console.log("JSON.stringify(addressJson): " + JSON.stringify(addressJson));
  //console.log("JSON.stringify(artifactJson): " + JSON.stringify(artifactJson));
  //console.log("JSON.stringify(artifactJson.contractName): " + JSON.stringify(artifactJson.contractName));
  const address = addressJson.address;
  const abi = artifactJson.abi;
  console.log("address: " + address);
  //console.log("abi: " + abi);

    //retrieve data from json file
    //let rawData = fs.readFileSync(addressPath); 
    //let jsonData = JSON.parse(rawData); 
    //const address = jsonData.address;
    //console.log("address: " + address);
  
    //retrieve contract from node
    //console.log("abiPath: " + abiPath);
    //rawData = fs.readFileSync(abiPath);
    //console.log("abi - JSON.stringify(rawData): " + JSON.stringify(rawData)); 
    //jsonData = JSON.parse(rawData); 
    //const abi = jsonData.abi;
    //console.log("JSON.stringify(abi): " + JSON.stringify(abi));
  
  console.log("process.env.NETWORK_URL: " + process.env.REACT_APP_NETWORK_URL);//to-do check if react can read the variable
  //to-do provider seems to be an empty object..check that out
  const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_NETWORK_URL); //v5 ethers.providers.JsonRpcProvider() --> ethers.JsonRpcProvider()
  console.log("JSON.stringify(provider): " + JSON.stringify(provider));

  const HospitalDonationV6 = new ethers.Contract(address, abi, provider);
  //console.log("JSON.stringify(HospitalDonationV6): " + JSON.stringify(HospitalDonationV6));
  //const addressOfContr = await HospitalDonationV6.getAddress();
  //console.log("addressOfContr: " + addressOfContr);
  
  console.log("END - scripts/getContract.js");
  return HospitalDonationV6;

}

//getContract();
module.exports = getContract;