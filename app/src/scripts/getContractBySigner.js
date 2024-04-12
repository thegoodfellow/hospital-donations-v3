const ethers = require('ethers');
const addressJson = require("../contractAddress.json");
const artifactJson = require("../artifacts/contracts/HospitalDonationV6.sol/HealthCareToken.json");

async function getContractBySigner(signer) {
  console.log("START - scripts/getContractBySigner.js");

  const address = addressJson.address;
  const abi = artifactJson.abi;

  const HospitalDonationV6 = new ethers.Contract(address, abi, signer);
  
  console.log("END - scripts/getContractBySigner.js");
  return HospitalDonationV6;

}

module.exports = getContractBySigner;