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
};
