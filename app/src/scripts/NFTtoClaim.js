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

        function whichToken(){//to-do refurmulate this code..looks really bad
            console.log("donation.amount: " + donation.amount);
        
            let which = "NO TOKEN";
            if(donation.amount>0){
              if(donation.amount <= BRONZE_THRESHOLD){
                which = "BRONZE";
              }
              else{
                if(donation.amount <= SILVER_THRESHOLD){
                  which = "SILVER";
                }
                else{
                  if(donation.amount <= GOLD_THRESHOLD){
                    which = "GOLD";
                  }
                  else{
                    which = "PLATINUM";
                  }
                }
              }
            }
            return which;
          }


        console.log("END - scirpts/NFTtoCLaim.js");
    
        return whichToken();

    } catch (error) {
        console.error("Error during NFTtoCLaim:", error);
        return null;
    }

}
//NFTtoCLaim();
module.exports = NFTtoCLaim;