const deploy = require('../scripts/deploy'); //returns a istance of the contract deployed
const writeContractInfo = require('../scripts/writeContractInfo');


async function main(){
    console.log("START - /scripts/jumpStart.js");

    const contract = await deploy();
    //console.log("JSON.stringify(contract): " + JSON.stringify(contract));
    const address = await contract.getAddress();
    console.log("/scripts/deploy returned a deployed contract with address: " + address);

    writeContractInfo(address);

     
    console.log("END - /scripts/jumpStart.js");
}

main()
  .then(() => {
    console.log("jumpStart executed successfully!!!");
    process.exit(0);
})
  .catch((error) => {
    console.log("jumpStart got errors!!!");
    console.error(error);
    process.exit(1);
});