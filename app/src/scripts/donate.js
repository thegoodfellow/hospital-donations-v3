const ethers = require('ethers');
const getContract = require("./getContract");

async function donate(signer, name, surname, amount) {

    try{
        const contract = await getContract();
        const parsedAmount = ethers.parseEther(amount);
        const baseContract = contract.connect(signer);
        const tx = await baseContract.donate(name, surname, {value: parsedAmount});
        await tx.wait();
        return tx;
    } catch (error) {
        console.error("Error donating:", error);
        return null;
    }

    
}

module.exports = donate;