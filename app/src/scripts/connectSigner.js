const ethers = require('ethers');
const hre = require("hardhat");

async function connectSigner(contract, signer) {

    try{

        console.log("START - scirpts/connectSigner.js");
        
        const baseContract = contract.connect(signer);
        console.log("END - scirpts/connectSigner.js");
    
        return baseContract;

    } catch (error) {
        console.error("Error connecting signer:", error);
        return null;
    }
    
}

module.exports = connectSigner;