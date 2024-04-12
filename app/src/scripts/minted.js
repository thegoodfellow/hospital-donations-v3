const ethers = require('ethers');
const getContractBySigner = require("./getContractBySigner");

async function minted(signer) {

    try{

        console.log("START - scirpts/minted.js");
        console.log("signer");
        console.log(signer.signer.provider);
        
        const contract = await getContractBySigner(signer.signer);
        //to-do check if it makes sense this hard-conversion and if it can cause troubles..
        const BRONZE_MAX_SUPPLY = Number( await  contract.BRONZE_MAX_SUPPLY() );
        const SILVER_MAX_SUPPLY = Number(await  contract.SILVER_MAX_SUPPLY() );
        const GOLD_MAX_SUPPLY = Number(await contract.GOLD_MAX_SUPPLY() );
        const PLATINUM_MAX_SUPPLY = Number(await contract.PLATINUM_MAX_SUPPLY() );

        console.log(typeof BRONZE_MAX_SUPPLY);

        const bronzeSupply = Number(await  contract.bronzeSupply() );
        const silverSupply = Number(await  contract.silverSupply() );
        const goldSupply = Number(await contract.goldSupply() );
        const platinumSupply = Number(await contract.platinumSupply() );

        console.log(platinumSupply);

        const ret = [
            {
                type:"BRONZE",
                minted:bronzeSupply,
                MAX_SUPPLY:BRONZE_MAX_SUPPLY,
            },
            {
                type:"SILVER",
                minted:silverSupply,
                MAX_SUPPLY:SILVER_MAX_SUPPLY,
            },
            {
                type:"GOLD",
                minted:goldSupply,
                MAX_SUPPLY:GOLD_MAX_SUPPLY,
            },
            {
                type:"PLATINUM",
                minted:platinumSupply,
                MAX_SUPPLY:PLATINUM_MAX_SUPPLY,
            },
        ];



        console.log("END - scirpts/minted.js");

        return ret;
        

    } catch (error) {
        console.error("Error minted:", error);
        return null;
    }

    
}

module.exports = minted;