import { Grid, Typography, TextField, styled, Box, Link } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import InfoItem from "./InfoItem";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const InfoComponent = () => {
  return (
    <>
      <Grid item xs={3.5} sx={{ textAlign: "center" }}>
        <LightModeOutlinedIcon color="primary" />
        <Typography variant="h6" color="primary" textAlign="center">
          Examples
        </Typography>
        <InfoItem text="Explain quantum computing in simple terms" />
        <InfoItem text="Got any creative ideas for a 10 year old’s birthday?" />
        <InfoItem text="How do I make an HTTP request in Javascript?" />
      </Grid>

      <Grid item xs={3.5} sx={{ textAlign: "center" }}>
        <ElectricBoltOutlinedIcon color="primary" />
        <Typography variant="h6" color="primary" textAlign="center">
          Examples
        </Typography>
        <InfoItem text="Remembers what user said earlier in the conversation" />
        <InfoItem text="Got any creative ideas for a 10 year old’s birthday?" />
        <InfoItem text="Allows user to provide follow-up corrections" />
      </Grid>

      <Grid item xs={3.5} sx={{ textAlign: "center" }}>
        <ReportProblemOutlinedIcon color="primary" />
        <Typography variant="h6" color="primary" textAlign="center">
          Examples
        </Typography>
        <InfoItem text="May occasionally generate incorrect information" />
        <InfoItem text="May occasionally produce harmful instructions or biased content" />
        <InfoItem text="Limited knowledge of world and events after 2021" />
      </Grid>
    </>
  );
};

export default InfoComponent;
