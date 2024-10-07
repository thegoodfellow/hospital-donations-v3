const ethers = require('ethers');
const getContractBySigner = require("./getContractBySigner");
//const getContract = require("./getContract");

async function readDonations(signer) {

    try{
        const contract = await getContractBySigner(signer.signer);
        //const contract = await getContract();

        const events = await contract.queryFilter("DonationReceived", 0, "latest");
        const redEvents = events.map((x) => {
            const ret = {};
            ret.blockHash = x.blockHash;
            ret.transactionHash = x.transactionHash;
            ret.blockNumber = x.blockNumber;
            ret.donor = x.args[0];
            ret.name = x.args[1];
            ret.surname = x.args[2];
            const a = x.args[3] / (1000000000000000000n);
            const b = x.args[3] % (1000000000000000000n);
            ret.amount = a.toString() + "." + b.toString(); //necessarry otherwise express app --> TypeError: Do not know how to serialize a BigInt
            console.log("type of ret.amount: " +  typeof ret.amount);
            return ret;
        });


        return redEvents;

    } catch (error) {
        console.error("Error donations:", error);
        return null;
    } 
}

module.exports = readDonations;