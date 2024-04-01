require('dotenv').config({ path: '../.env' });
const donate = require('../scripts/donate');


async function checkDonate(){
    console.log("START - /test/checkDonate.js");

    console.log("process.env.NETWORK_URL: " + process.env.NETWORK_URL);
    const provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL);

    const name = "fra";
    const surname = "sap";
    const amount = "10"; //assumed this value will be retrived from a form and it will be a string
    const signer = await provider.getSigner(process.env.DONOR1_ADDRESS);
    console.log("signer for the first donation is: JSON.stringify(signer): " + JSON.stringify(signer));

    const donateTx1 = await donate(signer, name, surname, amount);
    console.log("JSON.stringify(donateTx1): " + JSON.stringify(donateTx1));

    console.log("END - /test/checkDonate.js");
}

checkDonate()
  .then(() => {
    console.log("checkDonate executed successfully!!!");
    process.exit(0);
})
  .catch((error) => {
    console.log("checkDonate got errors!!!");
    console.error(error);
    process.exit(1);
});