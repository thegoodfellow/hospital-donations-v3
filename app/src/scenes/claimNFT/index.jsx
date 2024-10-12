// GRAPHIC
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";

// COMPONENTS
import Header from "../../components/Header";

// SCENE VARIABLES 
import { useEffect, useState } from 'react';

// BLOCKCHAIN
import NFTtoCLaim from "../../scripts/NFTtoClaim"; // It checks if there is any NFT and which type to claim for the wallet address connected 
import claimOneNft from "../../scripts/claimOneNft"; // It calls the method claimNFT of the smart contract
import { ethers } from "ethers";

const ClaimNFT = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [whichSource, setWhichSource] = useState(`../../assets/no_badge_of_honour.png`);
  const [whichText, setWhichText] = useState("You are not entitled to any NFT");
  const [whichButton, setWhichcButton] = useState(<div></div>);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [_signer, _setSigner] = useState(null);

  const handleFormSubmit = async () => {
    setWhichText("Waiting....");
    if (await claimOneNft(_signer) !== null) {
      setWhichText("You are not entitled to any NFT");
      setWhichSource("../../assets/no_badge_of_honour.png");
      setWhichcButton(<div></div>);
    }
  };

  useEffect(() => {
    
    _setSigner(props.signer);
    
  
    async function getData() {

  
      // Fetch the NFT once and store it in a variable
      const nftToClaim = await NFTtoCLaim(_signer);
     
  
      // Check if an NFT is available to claim
      if (nftToClaim !== "NO TOKEN" && nftToClaim !== null) {
        
        setWhichText("You are entitled to a " + nftToClaim + " NFT");
        setWhichSource(`../../assets/${nftToClaim.toLowerCase()}_badge_of_honour.png`);
        setWhichcButton(
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleFormSubmit}
            style={{
              maxWidth: '100px',
              maxHeight: '100px',
              minWidth: '40%',
              minHeight: '60px',
            }}
          >
            <Typography
              align="center"
              variant="h1"
              color={colors.grey[900]}
              fontWeight="bold"
              mb="5px"
            >
              CLAIM
            </Typography>
          </Button>
        );
      } else {
        // If no NFT is available to claim
        setWhichText("You are not entitled to any NFT");
        setWhichSource("../../assets/no_badge_of_honour.png");
        setWhichcButton(<div></div>);
      }
    }
  
    // Only call getData if signer is set
    if (_signer) {
      getData();
    }
  
    // Function to handle account change
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        
        setCurrentAccount(null);
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const sig = await _provider.getSigner();
        _setSigner(sig);
        
      }
    };
  
    // Check if MetaMask is installed
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
  
      // Cleanup the event listener when component unmounts
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    } else {
      
    }
  }, [_signer, currentAccount, props.signer]); // Ensure dependencies are properly set
  
  return (
    <Box m="20px">
      <Header title="Claim NFT" subtitle="Carve your name into stone" />
      <Box display="grid" alignItems="center" mt="20px" justifyContent="center" minHeight="50vh">
        <Typography align="center" variant="h2" color={colors.grey[100]} fontWeight="bold" mb="5px">
          {whichText}
        </Typography>
        <Box align="center" mb="15px">
          <img src={whichSource} alt="Badge to be claimed" />
        </Box>
        <Box align="center" mb="5px">
          {whichButton}
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimNFT;
