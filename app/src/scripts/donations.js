const { formatUnits } = require('ethers');
//const getContractBySigner = require("./getContractBySigner");
const getContract = require("./getContract");

async function readDonations() {

    try{
        const contract = await getContract();
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
            const val = formatUnits(x.args[3], 18); ;
            const a = x.args[3] / (1000000000000000000n);
            const reminder = x.args[3] % (1000000000000000000n);
            const howManyZero = 18 - reminder.toString().length;
            let zerosBefore = "0".repeat(howManyZero);
            const b = reminder.toString().substring(0,0);
            //ret.amount = a.toString() + "." + zerosBefore + b.toString(); //necessarry otherwise express app --> TypeError: Do not know how to serialize a BigInt
            ret.amount = val;
            return ret;
        });

        return redEvents;

    } catch (error) {
        console.error("Error donations:", error);
        return null;
    } 
}

module.exports = readDonations;