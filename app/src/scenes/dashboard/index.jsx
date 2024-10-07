import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import MintedNFTsChart from "../../components/MintedNFTsChart";
import DonationsChart from "../../components/DonationsChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="HOLY MONKEY" subtitle="Make your contribution to the HealthCare System" />
        
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1.564 ETH"
            subtitle="Average Donation"
            progress="0.25"
            increase=""
            icon={
              <CurrencyBitcoinIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="17 ETH"
            subtitle="Maximum Donation"
            progress="0.50"
            increase=""
            icon={
              <CurrencyBitcoinIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1.243"
            subtitle="Donors"
            progress="0.75"
            increase=""
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
            width="100%" height="90%"
          >
            <Box  width="100%" height="100%">
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Total Donations
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                1939 ETH
              </Typography>
              <DonationsChart />
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Donations
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="3px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.user}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost} ETH
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="0px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
            height="100%"
          >
            <Box  width="100%" height="80%" > 
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Claimed NFTs
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                987
              </Typography>
              <MintedNFTsChart />
                           
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
