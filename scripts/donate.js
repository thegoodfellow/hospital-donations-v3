const ethers = require('ethers');

const hre = require("hardhat");

async function donate(contract, signer, name, surname, amount) {

    try{

        console.log("START - scirpts/donate.js");
        const parsedAmount = ethers.parseEther(amount);
        console.log("BigInt.toString(parsedAmount): " + BigInt.toString(parsedAmount));
        const tx = await contract.connect(signer).donate(name, surname, {value: parsedAmount});
        await tx.wait();
        console.log("END - scirpts/donate.js");
    
        return tx;

    } catch (error) {
        console.error("Error donating:", error);
        return null;
    }

    
}

module.exports = donate;