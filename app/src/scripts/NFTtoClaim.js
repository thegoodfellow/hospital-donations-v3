const ethers = require('ethers');
const getContract = require("./getContract");

async function NFTtoCLaim(signer) {

    try{

        console.log("START - scirpts/NFTtoCLaim.js");
        console.log("JSON.stringify(signer): " + JSON.stringify(signer));

        const baseContract = await getContract();
        const contract = await baseContract.connect(signer);
        
        const addr = await contract.getAddress();
        console.log("addr: " + addr);
        const donation = await contract.donations(signer.address);
        const BRONZE_THRESHOLD = await contract.BRONZE_THRESHOLD();
        const SILVER_THRESHOLD = await contract.SILVER_THRESHOLD();
        const GOLD_THRESHOLD = await contract.GOLD_THRESHOLD();
        const ret = {
            "donation": donation, "BRONZE_THRESHOLD": BRONZE_THRESHOLD, 
            "SILVER_THRESHOLD": SILVER_THRESHOLD, "GOLD_THRESHOLD": GOLD_THRESHOLD
        };
        //console.log("JSON.stringify(ret): " + JSON.stringify(ret));
        //console.log("donation.name: " + donation.name);
        console.log("END - scirpts/NFTtoCLaim.js");
    
        return ret;

    } catch (error) {
        console.error("Error during NFTtoCLaim:", error);
        return null;
    }

}
//NFTtoCLaim();
module.exports = NFTtoCLaim;