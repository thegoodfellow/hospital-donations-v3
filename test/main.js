require('dotenv').config();
const { ethers } = require('ethers');
const hre = require("hardhat");
const deploy = require('../scripts/deploy'); //returns a istance of the contract deployed
const donate = require('../scripts/donate') //returns the transaction
const claimNFT = require('../scripts/claimNFT') //returns the transaction


async function main(){
    console.log("START - /test/main.js");

    console.log("process.env.NETWORK_URL: " + process.env.NETWORK_URL);
    const provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL); //v5 ethers.providers.JsonRpcProvider() --> ethers.JsonRpcProvider()
    console.log("JSON.stringify(provider): " + JSON.stringify(provider));
    let wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
    console.log("JSON.stringify(wallet): " + JSON.stringify(wallet));

    const contract = await deploy(wallet);
    console.log("wallet.address: " + wallet.address);

    //console.log("JSON.stringify(contract): " + JSON.stringify(contract));

    const address = await contract.getAddress();


    console.log("/scripts/deploy returned a deployed contract with address: " + address);
  
    const name = "fra";
    const surname = "sap";
    const amount = "10"; //assumed this value will be retrived from a form and it will be a string
    const signer = await provider.getSigner(process.env.DONOR1_ADDRESS);
    console.log("signer for the first donation is: JSON.stringify(signer): " + JSON.stringify(signer));

    const donateTx1 = await donate(contract, signer, name, surname, amount);
    console.log("JSON.stringify(donateTx1): " + JSON.stringify(donateTx1));

    const claimNftTx1 = await claimNFT(contract, signer);
    console.log("JSON.stringify(claimNftTx1): " + JSON.stringify(claimNftTx1));

    console.log("END - /test/main.js");
}

main()
  .then(() => {
    console.log("main executed successfully!!!");
    process.exit(0);
})
  .catch((error) => {
    console.log("main got errors!!!");
    console.error(error);
    process.exit(1);
});