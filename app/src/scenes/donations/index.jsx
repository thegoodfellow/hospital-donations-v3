//COMPONENTS
import Header from "../../components/Header";

//GRAPHIC
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

//BLOCKCHAIN
import axios from 'axios';//server 

//SCENE VARIABLES
import { useEffect, useState } from 'react';

const serverUrl = process.env.REACT_APP_SERVER_URL;

//to-do it does not update when a new donation goes thorugh..

const Donations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [donations, setDonations] = useState([]);

  useEffect( () => {
    async function getDonations(){
      const {data: newDonations} = await axios.get(`${serverUrl}/donations`);
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
      //to-do replace with the wallet nickname or whatever si called
      //to-do eventually set it to be a ENS 
      //to-do investigate further the difference between ENS and the rest...
      field: "nickname",
      headerName: "Wallet Nickname",
      flex: 1,
      cellClassName: "name-column--cell",
    },*/
    {
      field: "donor",
      headerName: "Wallet Address",
      cellClassName: "name-column--cell",
      minWidth: 275, //to-do use a meniangful sizing
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
      //to-do replace with timestamp or whatever is called
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
