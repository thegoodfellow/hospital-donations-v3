require('dotenv').config({ path: '../.env' });
const getContract = require('../scripts/getContract');

async function checkGetContract(){
    console.log("START - /test/checkGetContract.js");

    console.log("process.env.NETWORK_URL: " + process.env.NETWORK_URL);
    const provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL);
    const signer = await provider.getSigner(process.env.DONOR1_ADDRESS);
    console.log("signer for the first donation is: JSON.stringify(signer): " + JSON.stringify(signer));

    const contract = await getContract();
    //console.log("JSON.stringify(contract): " + JSON.stringify(contract));
    const baseContr = contract.connect(signer);
    console.log("JSON.stringify(baseContr): " + JSON.stringify(baseContr));


    console.log("END - /test/checkGetContract.js");
}

checkGetContract()
  .then(() => {
    console.log("checkGetContract executed successfully!!!");
    process.exit(0);
})
  .catch((error) => {
    console.log("checkGetContract got errors!!!");
    console.error(error);
    process.exit(1);
});