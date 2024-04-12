const ethers = require('ethers');
const getContractBySigner = require("./getContractBySigner");
const { red } = require('@mui/material/colors');

async function whichBadge(signer) {

    try{

        console.log("START - scirpts/whichBadge.js");
        console.log("signer: ");
        console.log(JSON.stringify(signer));
        
        const contract = await getContractBySigner(signer);
        const events = await contract.queryFilter("NFTClaimed", 0, "latest");
        
        const addressesTokenIds = events.map((x) => {
            const ret = {};
            ret.donor = x.args[0];
            ret.tokenId = x.args[1];
            return ret;
        });
        console.log("addressesTokenIds: ");
        console.log(addressesTokenIds);
        const onlySignerAddrIds = addressesTokenIds.filter( (item) => item.donor === signer.address);
        console.log("onlySignerAddrIds: ");
        console.log(onlySignerAddrIds);
        const BRONZE_START_ID = await contract.BRONZE_START_ID();
        const SILVER_START_ID = await contract.SILVER_START_ID();
        const GOLD_START_ID = await contract.GOLD_START_ID();
        const PLATINUM_START_ID = await contract.PLATINUM_START_ID();
        //console.log(PLATINUM_START_ID);

        const bigIntMax = onlySignerAddrIds.reduce((accumulator, currentValue) => currentValue.tokenId > accumulator ? currentValue.tokenId : accumulator, 0n);
        //const bigIntMax = 1752n;
        console.log("bigIntMax:");
        console.log(bigIntMax);

        let which = "NO TOKEN";
        if(onlySignerAddrIds.length > 0){
            if(bigIntMax < SILVER_START_ID){
                which = "BRONZE";
            }
            else{
                if(bigIntMax < GOLD_START_ID){
                    which = "SILVER";
                }
                else{
                    if(bigIntMax < PLATINUM_START_ID){
                        which = "GOLD";
                    }
                    else{
                        which = "PLATINUM";
                    }

                }

            }
        }
        console.log("which " + which);

        console.log("END - scirpts/whichBadge.js");
        return which;

    } catch (error) {
        console.error("Error during whichBadge:", error);
        return null;
    }

}
//whichBadge();
module.exports = whichBadge;