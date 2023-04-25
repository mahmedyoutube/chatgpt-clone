import { Grid, Typography, TextField, styled, Link, Box } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import InfoItem from "./InfoItem";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const StyledTextField = styled(TextField)({
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
      sx={{ width: "100%", position: "relative", minHeight: "100vh" }}
    >
      <Grid item>
        <Typography
          textAlign="center"
          variant="h4"
          fontWeight="bold"
          color="primary"
          sx={{ mt: "20vh", mb: 7 }}
        >
          ChatGPT
        </Typography>
      </Grid>

      <Grid
        item
        container
        justifyContent="space-between"
        justifyItems="center"
        sx={{ height: "calc(100% - 12rem)" }}
      >
        <Grid
          item
          xs={3.5}
          sx={{ textAlign: "center", height: "100%", width: "100%" }}
        >
          <LightModeOutlinedIcon color="primary" />
          <Typography
            textAlign="center"
            color="primary"
            variant="h6"
            fontWeight="bold"
          >
            Examples
          </Typography>

          <InfoItem text="Remembers what user said earlier in the conversation" />
          <InfoItem text="Allows user to provide follow-up corrections" />
          <InfoItem text="Trained to decline inappropriate requests" />
        </Grid>
        <Grid item xs={3.5} sx={{ textAlign: "center" }}>
          <ElectricBoltOutlinedIcon color="primary" />
          <Typography
            textAlign="center"
            color="primary"
            variant="h6"
            fontWeight="bold"
          >
            Capabilities
          </Typography>

          <InfoItem
            removeRightArrow
            text="Explain Quantum Computing in simple Terms"
          />
          <InfoItem
            removeRightArrow
            text="Got any creative ideas for a 10 year old’s birthday?"
          />
          <InfoItem
            removeRightArrow
            text="How do I make an HTTP request in Javascript?"
          />
        </Grid>
        <Grid item xs={3.5} sx={{ textAlign: "center" }}>
          <ReportProblemOutlinedIcon color="primary" />
          <Typography
            textAlign="center"
            color="primary"
            variant="h6"
            fontWeight="bold"
          >
            Limitations
          </Typography>

          <InfoItem
            removeRightArrow
            text="May occasionally generate incorrect information"
          />
          <InfoItem
            removeRightArrow
            text="May occasionally produce harmful instructions or biased content"
          />
          <InfoItem
            removeRightArrow
            text="Limited knowledge of world and events after 2021"
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        flexDirection="column"
        justifyContent="flex-end"
        sx={{
          position: "absolute",

          bottom: 0,
          width: "100%",
          height: "12rem",
        }}
      >
        <StyledTextField
          placeholder="Send a message..."
          fullWidth
          sx={{
            bgcolor: "rgba(64,65,79,1)",
            marginTop: "auto",
          }}
          InputProps={{
            endAdornment: <SendOutlinedIcon htmlColor="rgba(255,255,255,1)" />,
            sx: { color: "rgba(255,255,255,1)" },
          }}
        />
        <Grid
          container
          alignItems="center"
          sx={{ fontSize: 12, color: "hsla(0,0%,100%,.5)", py: 1 }}
        >
          <Link>ChatGPT Mar 23 Version</Link>. Free Research Preview. ChatGPT
          may produce inaccurate information about people, places, or facts.
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RightSideBar;
