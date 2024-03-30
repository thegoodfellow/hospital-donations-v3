import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Donations from "./scenes/donations";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import DonationForm from "./scenes/donationForm";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

import { ethers } from 'ethers';



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [account, setAccount] = useState("Not Connected");
  //to-do consider eventually pooling all the infos in one variable, might be better?
  const [nickname, setNickname] = useState(null); //to-do check if null can cause troubles
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {

      let signer = null;
      let nickname = null;
      let provider;

      //slightly modified implementation in v6 
      //to-do it might needs some modifications to not crash in case metamask is not installed
      if (window.ethereum == null) {

          // If MetaMask is not installed, we use the default provider,
          // which is backed by a variety of third-party services (such
          // as INFURA). They do not have private keys installed,
          // so they only have read-only access
          console.log("MetaMask not installed; using read-only defaults")
          provider = ethers.getDefaultProvider()

      } else {

          // Connect to the MetaMask EIP-1193 object. This is a standard
          // protocol that allows Ethers access to make all read-only
          // requests through MetaMask.
          provider = new ethers.BrowserProvider(window.ethereum)

          // It also provides an opportunity to request access to write
          // operations, which will be performed by the private key
          // that MetaMask manages for the user.
          signer = await provider.getSigner();

          const accounts = await provider.send('eth_requestAccounts', []);

          //nickname = await provider.lookupAddress(accounts[0]);
          //to-do eventually have a look on how to implement the ENS name thing
          //to-do in the end retrieve it over here and show
          //to-do for the time being juect levae null
          //to-do check if null can cause troubles
        
          
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
          <Sidebar isSidebar={isSidebar} account={account} nickname={nickname} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/donationForm" element={<DonationForm />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
