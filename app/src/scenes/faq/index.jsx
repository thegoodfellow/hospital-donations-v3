//COMPONENTS 
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";

//GRAPHIC
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";


const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Why i sould donate through Blockchain?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you already hold ethreum it avoids third parties fees and tax expensese 
            allowing you to make the biggest impact on the cause you want to support.
          </Typography>

        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Is it transparent?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Anybody will be able to check how much has been givne  and when allowing for the greatest transparency.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How much should i give?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            As much as you feel, any amount can make the difference.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Is it safe?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            As long as you use trusted third parties plug-ins.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What the donations will be used for?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The collected givings will be used to buy new machinery and equipment.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
