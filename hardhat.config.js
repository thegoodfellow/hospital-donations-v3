require('dotenv').config({path:__dirname+'/.env'});
//const { auto } = require("async");

require("@nomicfoundation/hardhat-toolbox");
//require("dotenv");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
  },
  paths: {
    artifacts: "./app/src/artifacts",
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.NETWORK_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    }
  },
};
