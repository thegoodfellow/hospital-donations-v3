const ethers = require('ethers');
const getContractBySigner = require("./getContractBySigner");

async function whichBadge(signer) {

    try{
        const contract = await getContractBySigner(signer);
        const events = await contract.queryFilter("NFTClaimed", 0, "latest");
        
        const addressesTokenIds = events.map((x) => {
            const ret = {};
            ret.donor = x.args[0];
            ret.tokenId = x.args[1];
            return ret;
        });
        const onlySignerAddrIds = addressesTokenIds.filter( (item) => item.donor === signer.address);

        //const BRONZE_START_ID = await contract.BRONZE_START_ID(); //not necessary
        const SILVER_START_ID = await contract.SILVER_START_ID();
        const GOLD_START_ID = await contract.GOLD_START_ID();
        const PLATINUM_START_ID = await contract.PLATINUM_START_ID();

        const bigIntMax = onlySignerAddrIds.reduce((accumulator, currentValue) => currentValue.tokenId > accumulator ? currentValue.tokenId : accumulator, 0n);

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

        return which;

    } catch (error) {
        console.error("Error during whichBadge:", error);
        return null;
    }

}

module.exports = whichBadge;