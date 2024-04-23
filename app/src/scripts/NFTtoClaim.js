const ethers = require('ethers');
const getContract = require("./getContract");

async function NFTtoCLaim(signer) {

    try{
        if(signer === undefined)//if no wallet is connected
            //to-do check if it is the best way of checking this out
          return "NO TOKEN";
        else{
          const baseContract = await getContract();
          const contract = await baseContract.connect(signer);
          const donation = await contract.donations(signer.address);

          const BRONZE_THRESHOLD = await contract.BRONZE_THRESHOLD();
          const SILVER_THRESHOLD = await contract.SILVER_THRESHOLD();
          const GOLD_THRESHOLD = await contract.GOLD_THRESHOLD();

          const ret = {
              "donation": donation, "BRONZE_THRESHOLD": BRONZE_THRESHOLD, 
              "SILVER_THRESHOLD": SILVER_THRESHOLD, "GOLD_THRESHOLD": GOLD_THRESHOLD
          };

          function whichToken(){//to-do refurmulate this code..looks really bad
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

          return whichToken();
        }
    } catch (error) {
        console.error("Error during NFTtoCLaim:", error);
        return null;
    }

}

module.exports = NFTtoCLaim;