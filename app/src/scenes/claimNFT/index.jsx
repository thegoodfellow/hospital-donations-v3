//GRPHIC
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";

//COMPONENTS
import Header from "../../components/Header";

//SCENE VARIABLES 
import { useEffect, useState } from 'react';

//BLOCKCHAIN
import NFTtoCLaim from "../../scripts/NFTtoClaim"; //it checks if there is any NFT and which type to claim for the wallet address connected 
import claimOneNft from "../../scripts/claimOneNft"; //it calls the method claimNFT of the smart contract


const ClaimNFT = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { signer } = props;
  console.log("singer " + signer);

  const [whichNFT, setWhichNFT] = useState("NO TOKEN");

  useEffect(() => {
    console.log("app/src/scenes/claimNFT - useEffect");
  
    async function getData() {
      //console.log("getData:");
      //console.log(JSON.stringify(props));
      //const signer = props.signer;
      //console.log("signer: " + signer);
      //console.log("JSON.stringify(signer): " + JSON.stringify(signer));
      
      if (signer) {
        const data = await NFTtoCLaim(signer);
        setWhichNFT(data); // The state will update asynchronously
      }
    }
  
    // Fetch initial data
    getData();
  
    // MetaMask event listeners
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        console.log("Accounts changed:", accounts);
        if (accounts.length > 0) {
          getData();  // Refetch data when accounts change
        } else {
          setWhichNFT("NO TOKEN"); // Reset if no account is connected
        }
      };
  
      const handleChainChanged = (chainId) => {
        console.log("Chain changed:", chainId);
        getData(); // Refetch data when network changes
      };
  
      // Listen for MetaMask events
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
  
      // Cleanup event listeners when component unmounts
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [signer]);  // Use props.signer as the dependency


  const whichText = () => {
    if (whichNFT === "NO TOKEN") {
      return "You are not entitled to any NFT";
    }
    return "You are entitled to a " + whichNFT + " NFT";
  };

  const whichSource = () => {
    if (whichNFT === "NO TOKEN")
      return `../../assets/no_badge_of_honour.png`;
    if (whichNFT === "BRONZE")
      return `../../assets/bronze_badge_of_honour.png`;
    if (whichNFT === "SILVER")
      return `../../assets/silver_badge_of_honour.png`;
    if (whichNFT === "GOLD")
      return `../../assets/gold_badge_of_honour.png`;
    if (whichNFT === "PLATINUM")
      return `../../assets/platinum_badge_of_honour.png`;
  };

  const whichButton = () => {
    return whichNFT === "NO TOKEN" ? <div></div> 
      : <Button type="submit" color="secondary" variant="contained" onClick={handleFormSubmit} 
          style={{ maxWidth: '100px', maxHeight: '100px', minWidth: '40%', minHeight: '60px' }}>
          <Typography align="center" variant="h1" color={colors.grey[900]} fontWeight="bold" mb="5px">
            CLAIM 
          </Typography> 
        </Button>;
  };

  const handleFormSubmit = async () => {
    return await claimOneNft(props.signer);
  };

  return (
    <Box m="20px">
      <Header title="Claim NFT" subtitle="Carve your name into stone" />
      <Box display="grid" alignItems="center" mt="20px" justifyContent="center" minHeight="50vh">
        <Typography align="center" variant="h2" color={colors.grey[100]} fontWeight="bold" mb="5px">{whichText()}</Typography>
        <Box align="center" mb="15px"><img src={whichSource()} alt="NFT to be claimed" /></Box>
        <Box align="center" mb="5px">{whichButton()}</Box>
      </Box>
    </Box>
  );
};

export default ClaimNFT;
