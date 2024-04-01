const ethers = require('ethers');
//const hre = require("hardhat");
const getContract = require("./getContract");
//const connectSigner = require('./connectSigner');

async function donate(signer, name, surname, amount) {

    try{

        console.log("START - scirpts/donate.js");
        const contract = await getContract();
        const parsedAmount = ethers.parseEther(amount);
        console.log("BigInt.toString(parsedAmount): " + BigInt.toString(parsedAmount));
        //const baseContract = await connectSigner(contract, signer);
        const baseContract = contract.connect(signer);
        const tx = await baseContract.donate(name, surname, {value: parsedAmount});
        await tx.wait();
        console.log("END - scirpts/donate.js");
    
        return tx;

    } catch (error) {
        console.error("Error donating:", error);
        return null;
    }

    
}

module.exports = donate;