import { Box, Typography, useTheme, Button } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { useEffect, useState } from 'react';
import NFTtoCLaim from "../../scripts/NFTtoClaim";
import claimOneNft from "../../scripts/claimOneNft"; //it is called this way otherwise it is consfusing with the component
import { tokens } from "../../theme";

//to-do should check if there are still tokens available for that type...chargin bar?

const ClaimNFT = (signer) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [donation, setDonation] = useState({});
  const [BRONZE_THRESHOLD, setBRONZE_THRESHOLD] = useState();
  const [SILVER_THRESHOLD, setSILVER_THRESHOLD] = useState();
  const [GOLD_THRESHOLD, setGOLD_THRESHOLD] = useState();

  useEffect( () => {
    console.log("app/src/scenes/cliamNFT - useEffect");
    async function getData(){
      console.log("getData:");
      console.log("JSON.stringify(signer): " + JSON.stringify(signer));
      const data = await NFTtoCLaim(signer.signer);
      setDonation(data.donation);
      setBRONZE_THRESHOLD(data.BRONZE_THRESHOLD);
      setSILVER_THRESHOLD(data.SILVER_THRESHOLD);
      setGOLD_THRESHOLD(data.GOLD_THRESHOLD);
    }
    getData();
  }, []);//to-do fill the dependecies array..left it empy as it was calling useEffect in loop..

  function whichToken(){//to-do refurmulate this code..looks really bad
    console.log("donation.amount: " + donation.amount);

    let which = "NO TOKEN";
    if(donation.amount>0){
      if(donation.amount <= BRONZE_THRESHOLD){
        which = "BRONZE";
      }
      else{
        if(donation.amount <= SILVER_THRESHOLD){
          which = "SILVER";
        }
        else{
          if(donation.amount <= GOLD_THRESHOLD){
            which = "GOLD";
          }
          else{
            which = "PLATINUM";
          }
        }
      }
    }
    return which;
  }
  
  const whichText = () => {
    if(whichToken() === "NO TOKEN"){
      return "You are not entitled to any NFT";
    }
    return "You are entitled to a " + whichToken() + " NFT";
  };
  const whichSource = () => {
    const which = whichToken();
    if(which === "NO TOKEN")
      return `../../assets/no_badge_of_honour.png`;
    if(which === "BRONZE")
      return `../../assets/bronze_badge_of_honour.png`;
    if(which === "SILVER")
      return `../../assets/silver_badge_of_honour.png`;
    if(which === "GOLD")
      return `../../assets/gold_badge_of_honour.png`;
    if(which === "PLATINUM")
      return `../../assets/platinum_badge_of_honour.png`;
  };
  const whichButton = () => {
    return whichToken() === "NO TOKEN" ? <Button color="secondary" variant="contained"></Button> 
      : <Button type="submit" color="secondary" variant="contained" onClick={handleFormSubmit} > CLAIM </Button>;
  };

  const handleFormSubmit = async () => {
    return await claimOneNft(signer.signer);
  };


  return (
    <Box m="20px">
      <Header title="Claim NFT" subtitle="Carve your name into stone" />
      <Box display="grid" alignItems="center"  >
        <Typography>{whichText()}</Typography>
        <img src={whichSource()} />
        {whichButton()}
      </Box>
    </Box>
  );
};

export default ClaimNFT;