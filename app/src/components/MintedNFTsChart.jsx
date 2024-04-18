import { useTheme, Box } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const MintedNFTsChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [
    {
      type: "BRONZE",
      minted: 434,
    },
    {
      type: "SILVER",
      minted: 337,
    },
    {
      type: "GOLD",
      minted: 149,
    },
    {
      type: "PLATINUM",
      minted: 67,
    },
  ];

  return (

    <Box width="97%" height="90%">
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
    keys={["minted"]}
    indexBy="type"
    margin={{ top: 5, right: 80, bottom: 50, left: 100 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    colors={[colors.greenAccent[600], colors.redAccent[600]]}
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
        lineWidth: 2,
        spacing: 1,
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
      legend: "", 
      legendPosition: "middle",
      legendOffset: -40,
    }}
    enableLabel={false}
    labelSkipWidth={2}
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
  );
};

export default MintedNFTsChart;