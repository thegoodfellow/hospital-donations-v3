require('dotenv').config({ path: '../.env' })
const ethers = require('ethers');
//const hre = require("hardhat");

const fs = require('fs');
const addressPath = "../app/src/contractInfo/contractAddress.json";
//const abiPath = "../artifacts/contracts/HospitalDonationV6.sol/HealthCareToken.json";
//const abiFinalPath = "../app/src/contractInfo/abi.json";

//it writes the abi and the address of the contract into a folder isnide the app folder 
//so once the contract is deployed those infos can be used from the app

//to-do consider writing somewhere the contract name as well, it can gotten from the artifact as it reused many time
//to-do consider writing all info into a single file
//to-do consider modifying hardhat config to save the artifact inside the app/src folder

async function writeContractInfo(address) {
    console.log("START - scripts/writeContractInfo.js");

    //to-do each time the function is called it overwrites the contractAdress file with the new address 
    //to-do of the deployed contract
    //to-do it coul make sense to check if it already exists an address..

    //retrieve contract abi from artifact
    //let rawData = fs.readFileSync(abiPath);
    //let jsonData = JSON.parse(rawData); 
    //const abi = jsonData.abi;

    //write contract abi to contractInfo/abi
    //rawData = fs.readFileSync(abiFinalPath);
    //jsonData = JSON.parse(rawData); 
    //jsonData.abi = abi;
    //fs.writeFileSync(abiFinalPath, JSON.stringify(jsonData, null, 2));
    
    //write contract address to contractInfo/contractAddress
    rawData = fs.readFileSync(addressPath);
    jsonData = JSON.parse(rawData); 
    jsonData.address = address;
    fs.writeFileSync(addressPath, JSON.stringify(jsonData, null, 2));


    console.log("END - scripts/writeContractInfo.js");


}

module.exports = writeContractInfo;