const ethers = require("ethers");
const getContract = require("./getContract");

async function donate(signer, name, surname, amount) {
  try {
    const contract = await getContract();
    const parsedAmount = ethers.parseEther(amount);
    const baseContract = contract.connect(signer);
    const tx = await baseContract.donate(name, surname, { value: parsedAmount });
    await tx.wait();
    return tx; // Success case
  } catch (error) {
    console.error("Error donating:", error);
    
    // Re-throw the error with a clear message
    throw new Error(error.reason || error.message || "Transaction failed");
  }
}

module.exports = donate;
