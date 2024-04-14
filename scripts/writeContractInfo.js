require('dotenv').config({ path: '../.env' });
const fs = require('fs');

const ethers = require('ethers');

const addressPath = "../app/src/contractAddress.json";

//it writes the abi and the address of the contract into a folder isnide the app folder 
//so once the contract is deployed those infos can be used from the app

//to-do consider writing somewhere the contract name as well, it can gotten from the artifact as it reused many time
//to-do consider writing all info into a single file
//to-do consider modifying hardhat config to save the artifact inside the app/src folder

async function writeContractInfo(address) {    
    //write contract address to contractInfo/contractAddress
    rawData = fs.readFileSync(addressPath);
    jsonData = JSON.parse(rawData); 
    jsonData.address = address;
    fs.writeFileSync(addressPath, JSON.stringify(jsonData, null, 2));
}

module.exports = writeContractInfo;