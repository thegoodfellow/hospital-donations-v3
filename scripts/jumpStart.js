const deploy = require('./deploy'); //returns a istance of the contract deployed
const writeContractInfo = require('./writeContractInfo');


async function main(){
    const contract = await deploy();
    const address = await contract.getAddress();
    writeContractInfo(address);
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