import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDonations } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Donations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    //to-do eventually replace id with whatever is formatted once recevied by the node (RCP-JSON)
    //to-do whach out because i guess datagrid requires an id property but maybe it can be worked around
    { field: "id", headerName: "Transaction Hash" },
    {
      //to-do replace with the wallet nickname or whatever si called
      field: "name",
      headerName: "Wallet NIckname",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Amount (ETH)",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      //to-do replace with timestamp or whatever is called
      field: "timestamp",
      headerName: "Date & Time",
      flex: 1,
    },
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
        <DataGrid checkboxSelection rows={mockDataDonations} columns={columns} />
      </Box>
    </Box>
  );
};

export default Donations;
