const getContract = require("./getContract");

async function claimOneNtf(signer) {

    try{
        const contract = await getContract();
        const ipfsHash = process.env.REACT_APP_IPFS_HASH_BRONZE_TOKEN;
        const baseContract = contract.connect(signer);
        const tx = await baseContract.claimNFT(ipfsHash);
        await tx.wait();
        return tx;

    } catch (error) {
        console.error("Error during claimOneNtf:", error);
        return null;
    }

}

module.exports = claimOneNtf;