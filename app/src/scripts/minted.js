const getContract = require("./getContract");

async function minted() {
  try {
    const contract = await getContract();

    // Use Promise.all to parallelize the contract calls
    const [
      BRONZE_MAX_SUPPLY,
      SILVER_MAX_SUPPLY,
      GOLD_MAX_SUPPLY,
      PLATINUM_MAX_SUPPLY,
      bronzeSupply,
      silverSupply,
      goldSupply,
      platinumSupply
    ] = await Promise.all([
      contract.BRONZE_MAX_SUPPLY().then(Number),
      contract.SILVER_MAX_SUPPLY().then(Number),
      contract.GOLD_MAX_SUPPLY().then(Number),
      contract.PLATINUM_MAX_SUPPLY().then(Number),
      contract.bronzeSupply().then(Number),
      contract.silverSupply().then(Number),
      contract.goldSupply().then(Number),
      contract.platinumSupply().then(Number),
    ]);

    // Return the result
    return [
      {
        type: "BRONZE",
        minted: bronzeSupply,
        MAX_SUPPLY: BRONZE_MAX_SUPPLY,
      },
      {
        type: "SILVER",
        minted: silverSupply,
        MAX_SUPPLY: SILVER_MAX_SUPPLY,
      },
      {
        type: "GOLD",
        minted: goldSupply,
        MAX_SUPPLY: GOLD_MAX_SUPPLY,
      },
      {
        type: "PLATINUM",
        minted: platinumSupply,
        MAX_SUPPLY: PLATINUM_MAX_SUPPLY,
      },
    ];
  } catch (error) {
    console.error("Error in minted:", error);
    return null;
  }
}

module.exports = minted;
