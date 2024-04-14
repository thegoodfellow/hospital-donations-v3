const ethers = require('ethers');
const getContract = require("./getContract");

async function claimOneNtf(signer) {

    try{//to-do should check if there are still tokens available for that type...chargin bar?

        console.log("START - scirpts/claimOneNtf.js");
        const contract = await getContract();
        //to-do got to write some logic to decide which ipfsHash to feed in for the time being just a random one
        //to-do maybe use express server to have sandbox beahviour to prevent the user doing weird things like claiming what is not supposed to..
        const ipfsHash = process.env.REACT_APP_IPFS_HASH_BRONZE_TOKEN;
        console.log("ipfsHash: " + ipfsHash);
        const baseContract = contract.connect(signer);
        const tx = await baseContract.claimNFT(ipfsHash);
        await tx.wait();
        console.log("END - scirpts/claimOneNtf.js");
        return tx;

    } catch (error) {
        console.error("Error during claimOneNtf:", error);
        return null;
    }

}

module.exports = claimOneNtf;