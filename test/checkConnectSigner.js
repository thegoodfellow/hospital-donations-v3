require('dotenv').config({ path: '../.env' });
const getContract = require('../scripts/getContract');
const connectSigner = require('../scripts/connectSigner');

async function checkConnectSigner(){
    console.log("START - /test/checkConnectSigner.js");

    console.log("process.env.NETWORK_URL: " + process.env.NETWORK_URL);
    const provider = new ethers.JsonRpcProvider(process.env.NETWORK_URL);

    const signer = await provider.getSigner(process.env.DONOR1_ADDRESS);

    const contract = await getContract();

    const baseContr = connectSigner(contract, signer);



    console.log("END - /test/checkConnectSigner.js");
}

checkConnectSigner()
  .then(() => {
    console.log("checkConnectSigner executed successfully!!!");
    process.exit(0);
})
  .catch((error) => {
    console.log("checkConnectSigner got errors!!!");
    console.error(error);
    process.exit(1);
});