import { useState, useEffect, useCallback } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"; 
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import whichBadge from "../../scripts/whichBadge";


// Item component for sidebar menu items
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [imgSrc, setImgSrc] = useState("../../../assets/no_badge_of_honour.png");

  // Memoize the badgeSource function
  const badgeSource = useCallback(async () => {
    
    
    const sig = await props.signer;
    const whichNFT = await whichBadge(sig);

    
    let ret = `../../../assets/no_badge_of_honour.png`;
    if (whichNFT === "BRONZE") ret = `../../assets/bronze_badge_of_honour.png`;
    if (whichNFT === "SILVER") ret = `../../assets/silver_badge_of_honour.png`;
    if (whichNFT === "GOLD") ret = `../../assets/gold_badge_of_honour.png`;
    if (whichNFT === "PLATINUM") ret = `../../assets/platinum_badge_of_honour.png`;

    return ret;
  }, [props.signer, props.account]); // Only `signer` is needed here

  // Trigger badge update when `signer` or `account` changes
  useEffect(() => {
    if (props.signer) {
      async function updateBadge() {
        const src = await badgeSource();
        setImgSrc(src);
      }
      updateBadge();
    }
  }, [props.signer, props.account, badgeSource]); // Directly depend on `signer` and `account`

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Box>
                  <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
                    HOLY MONKEY
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="badge of honor"
                  width="100px"
                  height="100px" 
                  src={imgSrc}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {props.nickname}
                </Typography>
                <Typography variant="subtitle2" color={colors.greenAccent[500]} >
                    {props.account}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Make the Difference
            </Typography>
            <Item
              title="Donation Form"
              to="/donationForm"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Claim NFT"
              to="/claimNFT"
              icon={<CelebrationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Our Numbers
            </Typography>
            <Item
              title="Donations"
              to="/donations"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="minted NFTs"
              to="/mintedNFTs"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
