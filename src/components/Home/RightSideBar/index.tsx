import { Grid, Typography, TextField, styled, Box, Link } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import InfoItem from "./InfoItem";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const StyledTextField = styled(TextField)({
  background: "rgba(64,65,79,1)",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
});

const RightSideBar = () => {
  return (
    <Grid
      container
      flexDirection="column"
      sx={{ minHeight: "100vh", position: "relative" }}
    >
      <Grid item sx={{ mt: "20vh", mb: 7 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="primary"
        >
          ChatGPT
        </Typography>
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        sx={{ height: "calc(100% - 12rem)" }}
      >
        <Grid item xs={3.5} sx={{ textAlign: "center" }}>
          <LightModeOutlinedIcon color="primary" />
          <Typography variant="h6" color="primary" textAlign="center">
            Examples
          </Typography>
          <InfoItem
            text="Explain quantum computing in simple terms"
            rightIcon
          />
          <InfoItem
            text="Got any creative ideas for a 10 year old’s birthday?"
            rightIcon
          />
          <InfoItem
            text="How do I make an HTTP request in Javascript?"
            rightIcon
          />
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
      </Grid>
      <Grid
        item
        container
        flexDirection="column"
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "12rem",
          pb: 2,
        }}
      >
        <StyledTextField
          fullWidth
          placeholder="Send a message..."
          sx={{ mt: "auto" }}
          InputProps={{
            endAdornment: <SendOutlinedIcon color="primary" />,
            style: { color: "rgba(255,255,255,1)" },
          }}
        />

        <Box sx={{ color: "hsla(0,0%,100%,.5)", fontSize: ".75rem", pt: 1 }}>
          <Link> ChatGPT Mar 23 Version</Link>. Free Research Preview. ChatGPT
          may produce inaccurate information about people, places, or facts.
        </Box>
      </Grid>
    </Grid>
  );
};

export default RightSideBar;
