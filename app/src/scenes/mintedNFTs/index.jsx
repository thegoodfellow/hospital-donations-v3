import { Box } from "@mui/material";
import Header from "../../components/Header";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import minted from "../../scripts/minted"; // Fetches minted NFTs and their max supply
import getContract from "../../scripts/getContract"; // Imports the function to get the contract instance

const MintedNfts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([
    { type: "BRONZE", minted: 0, MAX_SUPPLY: 0 },
    { type: "SILVER", minted: 0, MAX_SUPPLY: 0 },
    { type: "GOLD", minted: 0, MAX_SUPPLY: 0 },
    { type: "PLATINUM", minted: 0, MAX_SUPPLY: 0 },
  ]);
  const [loading, setLoading] = useState(true); // To handle slow loading

  // Fetch initial data on mount and listen for the NFTClaimed event
  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialData = await minted(); // Fetch minted data
        setData(initialData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setLoading(false);
      }
    };

    const listenForNewClaims = async () => {
      const contract = await getContract(); // Get the contract instance

      contract.on("NFTClaimed", (donor, tokenId, ipfsHash) => {

        // Update the state by increasing the minted count for the relevant type (assuming tokenId determines the type)
        setData((prevData) =>
          prevData.map((nft) =>
            nft.type === getNftType(tokenId) // Adjust based on how you determine type by tokenId
              ? { ...nft, minted: nft.minted + 1 }
              : nft
          )
        );
      });
     
    };

    // Helper function to determine the NFT type based on tokenId (adjust this logic as per your contract)
    const getNftType = (tokenId) => {
      if (tokenId <= 1000) return "BRONZE";
      if (tokenId <= 2000) return "SILVER";
      if (tokenId <= 3000) return "GOLD";
      return "PLATINUM";
    };

    fetchData(); // Fetch initial data
    listenForNewClaims(); // Listen for new NFT claims

    return async () => {
      const contract = await getContract(); // Get the contract instance
      contract.off("NFTClaimed"); // Cleanup the event listener on unmount
    };
    
  }, []);

  // Show a loading indicator while data is being fetched
  if (loading) {
    return <Box m="20px">Loading Minted NFTs...</Box>;
  }

  return (
    <Box m="20px">
      <Header title="Minted NFTs" subtitle="How people supported the cause" />
      <Box height="75vh">
        <ResponsiveBar
          layout="horizontal"
          groupMode="grouped"
          indexScale={{ type: "band", round: true }}
          maxValue={1000}
          enableGridY={false}
          data={data}
          theme={{
            axis: {
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
          }}
          keys={["minted", "MAX_SUPPLY"]}
          indexBy="type"
          margin={{ top: 50, right: 130, bottom: 50, left: 80 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          colors={[colors.redAccent[600], colors.greenAccent[600]]}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", "1.6"]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "", 
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "TYPE", 
            legendPosition: "middle",
            legendOffset: -40,
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          barAriaLabel={function (e) {
            return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
          }}
        />
      </Box>
    </Box>
  );
};

export default MintedNfts;
