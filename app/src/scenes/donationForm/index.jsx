import Header from "../../components/Header";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

//BLOCKCHAIN
import donate from "../../scripts/donate"; // it calls the method donate of the smart contract
import { ethers } from "ethers";

//FORM
import { Formik } from "formik";
import * as yup from "yup"; // Yup is a schema builder for runtime value parsing and validation
import useMediaQuery from "@mui/material/useMediaQuery";

const DonationForm = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [currentAccount, setCurrentAccount] = useState(null);
  const [_signer, _setSigner] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [loading, setLoading] = useState(<div></div>);

  useEffect(() => {
    _setSigner(props.signer);

    // Function to handle account change
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
        setCurrentAccount(null);
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const sig = await _provider.getSigner();
        _setSigner(sig);
        console.log("Account changed to:", accounts[0]);
      }
    };

    // Check if MetaMask is installed
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Cleanup the event listener when component unmounts
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    } else {
      console.log("MetaMask is not installed!");
    }
  }, [currentAccount, props.signer]); // Effect runs when `currentAccount` changes

  const handleFormSubmit = async (values) => {
    setLoading("Waiting...");
    setErrorMessage("");

    try {
      if (!_signer) {
        setErrorMessage("No wallet connected. Please connect your wallet.");
      } else {
        const _name = values.firstName;
        const _surname = values.lastName;
        const _amount = values.amount;
        console.log("signer passed to donate script: " + _signer);
        const tx = await donate(_signer, _name, _surname, _amount);
        setLoading("");
        if (tx) {
          console.log("tx: " + JSON.stringify(tx));
          props.onDonationSuccess(tx);
        } else {
          setErrorMessage("Donation failed. Please try again.");
          setLoading("");
        }
      }
    } catch (error) {
      // Show the actual error message returned by the `donate` function
      setErrorMessage(error.message || "An error occurred during the donation.");
      setLoading("");
    }
  };

  return (
    <Box m="20px">
      <Header title="GIVE ETH" subtitle="MAKE THE GREATEST DIFFERENCE" />

      {/* Display the error message at the top of the form */}
      {errorMessage && (
        <Typography color="error" variant="body1" mb="20px">
          {errorMessage}
        </Typography>
      )}
      <Typography color="error" variant="body1" mb="20px">
          {loading}
        </Typography>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount (ETH)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                DONATE
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const amountRegExp = /^\d{1,8}(?:\.\d{0,18})?$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
  amount: yup
    .string()
    .matches(amountRegExp, "Amount is not valid")
    .required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  amount: "",
};

export default DonationForm;

