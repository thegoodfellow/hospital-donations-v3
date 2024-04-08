import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDonations } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

//to-do it does not update when a new donation goes thorugh..

//for blockchain node interactions
import { useEffect, useState } from 'react';
import axios from 'axios';//server
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Donations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [donations, setDonations] = useState([]);

  useEffect( () => {
    console.log("app/src/scenes/doantions - useEffect");
    async function getDonations(){
      console.log("getDonations:");
      console.log("serverUrl: " + serverUrl);
      const {data: newDonations} = await axios.get(`${serverUrl}/donations`);
      console.log("newDonations.length " + newDonations.length);
      if(newDonations.length !== donations.length){
        setDonations(newDonations);
      }
    }
    getDonations();
  }, [donations]);

  function getRowId(row) {
    return row.transactionHash;
  }


  const columns = [
    //to-do eventually replace id with whatever is formatted once recevied by the node (RCP-JSON)
    //to-do whach out because i guess datagrid requires an id property but maybe it can be worked around

    //to-do proper dimensioning 

    
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
      //flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 275, //to-do use a meniangful sizing
    },
    {
      field: "name",
      headerName: "Name",
      //flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "surname",
      headerName: "Surname",
      //flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "amount",
      headerName: "Amount (ETH)",
      //type: "number", 
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

/* RETURN STATEMET WITH MOCKUP DATA
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
        <DataGrid checkboxSelection rows={mockDataDonations} columns={columns} />
      </Box>
    </Box>
    
  );
*/