

//to-do read donations from contract
//to-do read them from varibles stored on contract memory or from events?
//to-do which one is cheaper/faster/easier?
//to-do if i read from events got tu sum the amounts donated to decide which token, on storage already got the sum...

//to-do for the time being HealthCareToken/Donation struct might be used only to see at which NFTs one is entiled
//to-do as it gets setted to 0 once the NFT is claimed..consider canging the behaviour
//to-do for a full list of the donations the events DonationRecevied might be accessed...

//to-do one function read more values..are they needed all together??how much time i waste retriving all of them??

//to-do for the time-being i export the functions one by one..consider a different architecture..library??class??which one is more easy/efficient??

const getContract = require("../app/src/scripts/getContract"); //to-do make sure this import is legal




/**
 * read the events DonationReceived from contract return a list of them
 * @returns {[{string, string, number, string, string, string, BigInt}]} is an array of Objects {blockHash, transactionHash, blockNumber, donorAddress, name, surname, amount} 
 */
async function donations(){
    const contract = await getContract();

    const events = await contract.queryFilter("DonationReceived", 0, "latest");
    const redEvents = events.map((x) => {
        ret = {};
        ret.blockHash = x.blockHash;
        ret.transactionHash = x.transactionHash;
        ret.blockNumber = x.blockNumber;
        ret.donor = x.args[0];
        ret.name = x.args[1];
        ret.surname = x.args[2];
        ret.amount = x.args[3];
        return ret;
    });
    return redEvents;
}

/**
 * read the events NFTClaimed from contract return a list of them
 * @returns {[{string, string, number, string, string, string}]} is an array of Objects {blockHash, transactionHash, blockNumber, donorAddress, tokenId, ipfsHash} 
 */
async function claimedNFTs(){
    const contract = await getContract();

    const events = await contract.queryFilter("NFTClaimed", 0, "latest");
    const redEvents = events.map((x) => {
        ret = {};
        ret.blockHash = x.blockHash;
        ret.transactionHash = x.transactionHash;
        ret.blockNumber = x.blockNumber;
        ret.donor = x.args[0];
        ret.tokenId = x.args[1];
        ret.ipfsHash = x.args[2];
        return ret;
    });

    return redEvents;

}
/**
 * 
 * @returns {Object} {BRONZE_MAX_SUPPLY, SILVER_MAX_SUPPLY, GOLD_MAX_SUPPLY, PLATINUM_MAX_SUPPLY, BRONZE_THRESHOLD, SILVER_THRESHOLD, GOLD_THRESHOLD, 
 * BRONZE_START_ID, SILVER_START_ID, GOLD_START_ID, PLATINUM_START_ID}
 */
async function constants(){
    const contract = await getContract();

    const ret = {};
    ret.BRONZE_MAX_SUPPLY = await  contract.BRONZE_MAX_SUPPLY();
    ret.SILVER_MAX_SUPPLY = await  contract.SILVER_MAX_SUPPLY();
    ret.GOLD_MAX_SUPPLY = await contract.GOLD_MAX_SUPPLY();
    ret.PLATINUM_MAX_SUPPLY = await contract.PLATINUM_MAX_SUPPLY();

    ret.BRONZE_THRESHOLD = await contract.BRONZE_THRESHOLD();
    ret.SILVER_THRESHOLD = await contract.SILVER_THRESHOLD();
    ret.GOLD_THRESHOLD = await contract.GOLD_THRESHOLD();
    //there is not PLATINUM_THRESHOLD as it won't be used in the smart contract --> there is not better token thant the platinum one so..

    ret.BRONZE_START_ID = await contract.BRONZE_START_ID();
    ret.SILVER_START_ID = await contract.SILVER_START_ID();
    ret.GOLD_START_ID = await contract.GOLD_START_ID();
    ret.PLATINUM_START_ID = await contract.PLATINUM_START_ID();

    return ret;

}

/**
 * @returns {{ BigInt, BigInt, BigInt, BigInt }} { bronzeSupply, silverSupply, goldSupply, platinumSupply }
 */
async function numberClaimedNFTSperType() {


    const contract = await getContract();

    const ret = {};
    ret.bronzeSupply = await  contract.bronzeSupply();
    ret.silverSupply = await  contract.silverSupply();
    ret.goldSupply = await contract.goldSupply();
    ret.platinumSupply = await contract.platinumSupply();

    return ret;
}

/**
 * @returns {{ string: {string, string, number, string, string, string, BigInt} }} { donorAddress: {blockHash, transactionHash, blockNumber, donorAddress, name, surname, amount} }
 */
async function donationsPerAddress(){
    const donationsArray = await donations();

    const result = donationsArray.reduce((result, item) => {
        const donor = (result[item.donor] || []);
        donor.push(item);
        result[item.donor] = donor;
        return result;
      }, []);
      //to-do the above code is able to retrieve all the data needed but it is abit complicated
      //to-do find a way to iterate through this objects more comfortable
/* 
      Object.entries(result).forEach(([key, value]) => {
        console.log("first call");
        console.log(`${key}: ${value}`);
        Object.entries(value).forEach(([key, value]) => {
            console.log("second call");
            console.log(`${key}: ${value}`);
            Object.entries(value).forEach(([key, value]) => {
                console.log("third call");
                console.log(`${key}: ${value}`);
            });
        });
    });
  */
 return result;
}

/**
 * @returns {{ string: {string, string, number, string, string, string} }} { donorAddress: {blockHash, transactionHash, blockNumber, donorAddress, tokenId, ipfsHash} }
 */
async function claimedNFTsPerAddress(){
    const claimedNFTsArray = await claimedNFTs();

    const result = claimedNFTsArray.reduce((result, item) => {
        const donor = (result[item.donor] || []);
        donor.push(item);
        result[item.donor] = donor;
        return result;
      }, []);
      //to-do the above code is able to retrieve all the data needed but it is abit complicated
      //to-do find a way to iterate through this objects more comfortable
/*
      console.log("claimed NFTS return value:");
      Object.entries(result).forEach(([key, value]) => {
        console.log("first call");
        console.log(`${key}: ${value}`);
        Object.entries(value).forEach(([key, value]) => {
            console.log("second call");
            console.log(`${key}: ${value}`);
            Object.entries(value).forEach(([key, value]) => {
                console.log("third call");
                console.log(`${key}: ${value}`);
            });
        });
    });
  */
 return result;
}


module.exports = {donations, claimedNFTs, donationsPerAddress, claimedNFTsPerAddress, constants, numberClaimedNFTSperType};