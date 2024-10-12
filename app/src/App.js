// SCENES
import Dashboard from "./scenes/dashboard";
import Donations from "./scenes/donations";
import MintedNfts from "./scenes/mintedNFTs";
import DonationForm from "./scenes/donationForm";
import ClaimNFT from "./scenes/claimNFT";
import FAQ from "./scenes/faq";
// NAVBARS
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

// GRAPHIC
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

// APP VARIABLES & ROUTING
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// BLOCKCHAIN
import { ethers } from 'ethers';



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [account, setAccount] = useState("Not Connected");
  const [nickname, setNickname] = useState(null);
  const [signer, setSigner] = useState();

  async function getAccounts() {
    let signer = null;
    let nickname = null;
    let _provider;

    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider (read-only access)
      _provider = ethers.getDefaultProvider();
    } else {
      // Connect to the MetaMask EIP-1193 object
      _provider = new ethers.BrowserProvider(window.ethereum);
      signer = await _provider.getSigner();
      const accounts = await _provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      setSigner(signer);
      setNickname(nickname);
    }
  }

  const [donationTx, setDonationTx] = useState(null);

  const handleDonationSuccess = (tx) => {
    setDonationTx(tx);
  };


  useEffect(() => {


    getAccounts();

    // Listen for MetaMask account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setSigner(new ethers.BrowserProvider(window.ethereum).getSigner());
        } else {
          setAccount("Not Connected");
          setSigner(null);
        }
      });

      // Optionally, listen for network changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload(); // Reload the page when network changes
      });
    }

    // Clean up the event listeners when the component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []); // Run this effect only on component mount

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} account={account} nickname={nickname} signer={signer} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/donationForm" element={<DonationForm signer={signer} onDonationSuccess={handleDonationSuccess} />} />
              <Route path="/claimNFT" element={<ClaimNFT signer={signer} donationTx={donationTx} />} />
              <Route path="/mintedNFTs" element={<MintedNfts />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
