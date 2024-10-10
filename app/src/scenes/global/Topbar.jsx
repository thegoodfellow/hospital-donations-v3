import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        
        borderRadius="3px"
        width="90%"
        alignItems="center"
      >
        <Box width="45%" display="flex" justifyContent="flex-end"><Typography variant="h2" color="#F4E869">SALUS</Typography> </Box>
        <Box width="10%" display="flex" justifyContent="center" > 
          <img src="../../../assets/site_logo.png" alt="site logo" width="60%" height="60%" />
        </Box>
        <Box width="45%" alignItems="center" ><Typography variant="h2" color="#3085C3" >SCIENTIA</Typography></Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <WalletOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
