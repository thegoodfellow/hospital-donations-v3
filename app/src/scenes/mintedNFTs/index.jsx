//COMPONENTS
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { ResponsiveBar } from "@nivo/bar";

//GRAPHIC
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

//SCENE VARIABLES
import { useState, useEffect } from "react";

//BLOCKCHAIN
import minted from "../../scripts/minted";//it check how many NFTs have been minted per type and the maxim supplies as well

const MintedNfts = (signer) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([
    {
      type: "BRONZE",
      minted: 0,
      MAX_SUPPLY: 0,
    },
    {
      type: "SILVER",
      minted: 0,
      MAX_SUPPLY: 0,
    },
    {
      type: "GOLD",
      minted: 0,
      MAX_SUPPLY: 0,
    },
    {
      type: "PLATINUM",
      minted: 0,
      MAX_SUPPLY: 0,
    },
  ]);

  useEffect(() => {
    async function getData(){
      if(signer.signer !== undefined){
        const d = await minted(signer);
        setData(d);
      }
    }
    getData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Minted NFTs" subtitle="How people supported the cause" />
      <Box height="75vh">
        <ResponsiveBar
      layout="horizontal"
      groupMode="grouped"
      indexScale={{ type: 'band', round: true }}
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
        legend:  "", 
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