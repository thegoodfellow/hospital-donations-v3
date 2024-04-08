const express = require('express');
const cors = require("cors");// Cross-Origin Resource Sharing

//to-do read donations from blockchain
//to-do read NFTs from blockchain

//to-do read quite few things..might be useful later on

//to-do use ethers or alchemy-sdk to read from contract??? both??

const port = 1225; //to-do eventually save it somewhere else --> maybe .env

const app = express();

const clientUrl = "http://localhost:5001"; //to-do eventually save it somewhere else --> maybe .env
//to-do for the time being is running on 5001 it seems i forgot to close toher app running on 3000, and so on eventually change
//to-do force client to run always on same port

const {donations}  = require("./readContract");

app.use(cors({
    origin: clientUrl,
  }));

  app.get('/donations', (req, res) => {
    console.log("server/index - donations");
    const newDonations = [];
    async function waitFor(){

      const newDonations = await donations();
      console.log("JSON.stringify(newDonations): " + JSON.stringify(newDonations));
      //newDonations.push("hola");
      res.send(newDonations);
    }
    waitFor();
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});