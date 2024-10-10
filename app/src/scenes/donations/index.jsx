//COMPONENTS
import Header from "../../components/Header";

//GRAPHIC
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

//BLOCKCHAIN
import readDonations from "../../scripts/donations";

//SCENE VARIABLES
import { useEffect, useState } from 'react';


//const serverUrl = process.env.REACT_APP_SERVER_URL;

const Donations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [donations, setDonations] = useState([]);

  useEffect( () => {
    async function getDonations(){
      //const {data: newDonations} = await axios.get(`${serverUrl}/donations`); //modify
      //console.log("donations - useEffect");
      //const sig = await props.signer;
      //console.log("signer: " + JSON.stringify(sig));
      const newDonations = await readDonations();
      if(newDonations.length !== donations.length){
        setDonations(newDonations);
      }
    }
    getDonations();
    console.log("donations");
    console.log(JSON.stringify(donations));
  }, [donations]);

  function getRowId(row) {
    return row.transactionHash;
  }


  const columns = [
    { field: "transactionHash", 
    headerName: "Transaction Hash",
    minWidth: 405, 
  },
   /* {
      field: "nickname",
      headerName: "Wallet Nickname",
      flex: 1,
      cellClassName: "name-column--cell",
    },*/
    {
      field: "donor",
      headerName: "Wallet Address",
      cellClassName: "name-column--cell",
      minWidth: 275,
    },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
    },
    {
      field: "surname",
      headerName: "Surname",
      cellClassName: "name-column--cell",
    },
    {
      field: "amount",
      headerName: "Amount (ETH)",
      headerAlign: "left",
      align: "left",
      minWidth:150,
    },
   /* {
      field: "timestamp",
      headerName: "Date & Time",
      flex: 1,
    }*/
  ];

  return (
    <Box m="20px">
      <Header title="DONATIONS" subtitle="How much our donors have given to the cause" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection getRowId={getRowId} rows={donations} columns={columns}   autosizeOptions={{
    columns: ['name', 'surname','donor', 'amount'],
    includeOutliers: true,
    includeHeaders: true,
  }} />
      </Box>
    </Box>
    
  );
};

export default Donations;
