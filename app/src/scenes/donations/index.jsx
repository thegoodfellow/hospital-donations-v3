import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from 'react';
import getContract from "../../scripts/getContract"; // Updated to use getContract from your script
import { formatUnits } from 'ethers'; // ethers v6 utility to format amounts

const Donations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const loadDonations = async () => {
      const contract = await getContract(); // Get the contract instance

      // Fetch existing donations from blockchain (optional, if you want historical data)
      const filter = contract.getEvent("DonationReceived");
      const events = await contract.queryFilter(filter);
      const donationList = events.map((event) => ({
        id: event.args.donor + event.args.amount.toString(), // Unique ID based on donor and amount
        donor: event.args.donor,
        name: event.args.name,
        surname: event.args.surname,
        amount: formatUnits(event.args.amount, "ether"), // Format amount in ether
      }));

      setDonations(donationList);
    };

    const listenForNewDonations = async () => {
      const contract = await getContract(); // Get the contract instance

      // Listen for the DonationReceived event
      contract.on("DonationReceived", (donor, name, surname, amount) => {
        const newDonation = {
          id: donor + amount.toString(),
          donor,
          name,
          surname,
          amount: formatUnits(amount, "ether"), // Format amount in ether
        };

        setDonations((prevDonations) => [...prevDonations, newDonation]);
      });
    };

    // Load initial donations and start listening for new ones
    loadDonations();
    listenForNewDonations();

    // Clean up the event listener when the component unmounts
    return async () => {
      const contract = await getContract();
      contract.off("DonationReceived"); // ethers v6: Remove listener with off()
    };
  }, []);

  return (
    <Box m="20px">
      <Header title="Donations" subtitle="Track all donations in real-time" />
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
        <DataGrid
          rows={donations}
          columns={[
            { field: "donor", headerName: "Donor Address", flex: 1 },
            { field: "name", headerName: "Name", flex: 1 },
            { field: "surname", headerName: "Surname", flex: 1 },
            { field: "amount", headerName: "Amount (ETH)", flex: 1 },
          ]}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default Donations;
