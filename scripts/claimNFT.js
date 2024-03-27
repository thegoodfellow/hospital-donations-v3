const ethers = require('ethers');

const hre = require("hardhat");

async function claimNFT(contract, signer) {

    try{

        console.log("START - scirpts/claimNFT.js");
        //got to write some logic to decide which ipfsHash to feed in for the time being just a random one
        const ipfsHash = process.env.IPFS_HASH_BRONZE_TOKEN;
        const tx = await contract.connect(signer).claimNFT(ipfsHash);
        await tx.wait();
        console.log("END - scirpts/claimNFT.js");
    
        return tx;

    } catch (error) {
        console.error("Error claiming NFT:", error);
        return null;
    }
    
}

module.exports = claimNFT;