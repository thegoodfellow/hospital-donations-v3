const ethers = require('ethers');

const addressJson = require("../contractAddress.json");
const artifactJson = require("../artifacts/contracts/HospitalDonationV6.sol/HealthCareToken.json");

async function getContract() {
  const address = addressJson.address;
  const abi = artifactJson.abi;
  const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_NETWORK_URL); //v5 ethers.providers.JsonRpcProvider() --> ethers.JsonRpcProvider()
  const HospitalDonationV6 = new ethers.Contract(address, abi, provider);
  return HospitalDonationV6;
}

module.exports = getContract;