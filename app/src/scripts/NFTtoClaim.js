const getContract = require("./getContract");

async function NFTtoCLaim(signer) {


    try{
        if(signer === undefined)//if no wallet is connected
          {

            return "NO TOKEN";
          }
        else{
          const baseContract = await getContract();
          const donation = await baseContract.donations(signer.address);
          const contract = await baseContract.connect(signer);

          const BRONZE_THRESHOLD = await contract.BRONZE_THRESHOLD();
          const SILVER_THRESHOLD = await contract.SILVER_THRESHOLD();
          const GOLD_THRESHOLD = await contract.GOLD_THRESHOLD();



          function whichToken(){
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