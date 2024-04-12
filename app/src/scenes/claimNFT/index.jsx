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

  const [whichNFT, setWhichNFT] = useState("NO TOKEN");
  useEffect( () => {
    console.log("app/src/scenes/cliamNFT - useEffect");
    async function getData(){
      console.log("getData:");
      console.log("JSON.stringify(signer): " + JSON.stringify(signer));
      const data = await NFTtoCLaim(signer.signer);
      setWhichNFT(data);
    }
    getData();
  }, []);//to-do fill the dependecies array..left it empy as it was calling useEffect in loop..


  
  const whichText = () => {
    if(whichNFT === "NO TOKEN"){
      return "You are not entitled to any NFT";
    }
    return "You are entitled to a " + whichNFT + " NFT";
  };
  const whichSource = () => {
    if(whichNFT === "NO TOKEN")
      return `../../assets/no_badge_of_honour.png`;
    if(whichNFT === "BRONZE")
      return `../../assets/bronze_badge_of_honour.png`;
    if(whichNFT === "SILVER")
      return `../../assets/silver_badge_of_honour.png`;
    if(whichNFT === "GOLD")
      return `../../assets/gold_badge_of_honour.png`;
    if(whichNFT === "PLATINUM")
      return `../../assets/platinum_badge_of_honour.png`;
  };
  const whichButton = () => {
    return whichNFT === "NO TOKEN" ? <div></div> 
      : <Button type="submit"  color="secondary" variant="contained" onClick={handleFormSubmit} 
          style={{maxWidth: '100px', maxHeight: '100px', minWidth: '40%', minHeight: '60px'}} >
          <Typography align="center" variant="h1" color={colors.grey[900]} fontWeight="bold" mb="5px" >
            CLAIM 
          </Typography> 
        </Button>;
  };

  const handleFormSubmit = async () => {
    return await claimOneNft(signer.signer);
  };


  return (
    <Box m="20px" >
      <Header title="Claim NFT" subtitle="Carve your name into stone" />
      <Box display="grid" alignItems="center" mt="20px" justifyContent="center" minHeight="50vh" >
        <Typography align="center" variant="h2" color={colors.grey[100]} fontWeight="bold" mb="5px" >{whichText()}</Typography>
        <Box align="center" mb="15px" ><img src={whichSource()}/></Box>
        <Box align="center" mb="5px" >{whichButton()}</Box>
      </Box>
    </Box>
  );
};

export default ClaimNFT;