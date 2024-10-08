//SCENES
import Dashboard from "./scenes/dashboard";
import Donations from "./scenes/donations";
import MintedNfts from "./scenes/mintedNFTs";
import DonationForm from "./scenes/donationForm";
import ClaimNFT from "./scenes/claimNFT";
import FAQ from "./scenes/faq";
//NAVBARS
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";//

//GRAPHIC
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

//APP VARIABLES & ROUTING
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

//BLOCKCHAIN
import { ethers } from 'ethers';

//installed axios with flag --legacy-peer-deps

function App() {
  const [theme, colorMode] = useMode();

  const [isSidebar, setIsSidebar] = useState(true);

  const [account, setAccount] = useState("Not Connected");
  const [nickname, setNickname] = useState(null);
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      let signer = null;
      let nickname = null;
      let _provider;

      if (window.ethereum == null) {

          // If MetaMask is not installed, we use the default provider,
          // which is backed by a variety of third-party services (such
          // as INFURA). They do not have private keys installed,
          // so they only have read-only access
          _provider = ethers.getDefaultProvider();
          

      } else {
          // Connect to the MetaMask EIP-1193 object. This is a standard
          // protocol that allows Ethers access to make all read-only
          // requests through MetaMask.
          _provider = new ethers.BrowserProvider(window.ethereum);
          // It also provides an opportunity to request access to write
          // operations, which will be performed by the private key
          // that MetaMask manages for the user.
          signer = await _provider.getSigner();
          const accounts = await _provider.send('eth_requestAccounts', []);
      
          setAccount(accounts[0]);
          setSigner(signer);
          setNickname(nickname);
      }
    }
    getAccounts();
  }, [account]);

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
              <Route path="/donations" element={<Donations signer={signer} />} />
              <Route path="/donationForm" element={<DonationForm signer={signer} />} />
              <Route path="/claimNFT" element={<ClaimNFT signer={signer} />}/>
              <Route path="/mintedNFTs" element={<MintedNfts signer={signer} />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
