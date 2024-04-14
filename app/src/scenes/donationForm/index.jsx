//COMPONENTS 
import Header from "../../components/Header";
import { Box, Button, TextField } from "@mui/material";

//BLOCKCHAIN
import donate from "../../scripts/donate";//it calls the method donate of the smart contract

//FORM
import { Formik } from "formik";
import * as yup from "yup"; //Yup is a schema builder for runtime value parsing and validation
//to-do consider upgrading to version 1 (actual v0.32.11)
//to-do v1 might work only for typescript, check that out
import useMediaQuery from "@mui/material/useMediaQuery";

const DonationForm = (signer) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  
  const handleFormSubmit = (values) => {//it gets the values from the fomr and feed into the donate function
    //to-do consider displaying errors, generic as well (fall-down to donate.js) somewhere on the front-end
    //to-do eventually save the data in a db
    //to-do DB has to be implemented
    if(Object.keys(signer).length === 0){//to-do make sure this is a good way of checking for empty objects
      //to-do implement - print something on browser
    }else{
      //to-do consider passing values and than values.signer...signer.signer is really confusing
      //signer = { "signer": {"provider": {}, "address": "0x...." } }
      const _signer = signer.signer;//to-do if no wallet is connected the signer is set to empty object (useState())
                            //to-do should handle the behaviour in case of no wallet connected
                            //when a wallet is connected signer is an object with 2 properties provider & address
      const _name = values.firstName;
      const _surname = values.lastName;
      const _amount = values.amount;
      const tx = donate(_signer, _name, _surname, _amount);//to-do the transaction returned is not used...
    }
  };

  return (
    <Box m="20px">
      <Header title="GIVE ETH" subtitle="MAKE THE GREATEST DIFFERENCE" />

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
const amountRegExp = /^\d{1,8}(?:\.\d{0,18})?$/; //decimals are set based on the available protocol precision 
                                                //the 8 digits before the dot seems to be even to many but u never know
                                                //we use the dot convention no comma
const checkoutSchema = yup.object().shape({
  //to-do eventually do not require following filed
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
  .string() //parseEther expects a string
  .matches(amountRegExp, "amount is not valid")
  .required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  amount: "", //to-do write 0 OR empty string??? 
              //to-do guess the empty string would be fine because 
              //to-do if the value is not checked the form won't go through
};

export default DonationForm;
