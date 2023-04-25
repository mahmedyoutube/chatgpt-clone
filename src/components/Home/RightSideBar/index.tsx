import { Grid, Typography, TextField, styled, Link, Box } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import InfoItem from "./InfoItem";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Info from "./Info";
import Chat from "../Chat";
import RightSideBarWidthContainer from "./RightSideBarWidthContainer";

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
      sx={{ height: "100vh", position: "relative" }}
    >
      <Chat />
      {/* <Grid item sx={{ mt: "20vh", mb: 7 }}>
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
      <RightSideBarWidthContainer>
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{ height: "calc(100% - 12rem)" }}
        >
          <Info />
        </Grid>
      </RightSideBarWidthContainer> */}

      <Grid
        item
        container
        flexDirection="column"
        justifyContent="flex-end"
        sx={{
          position: "absolute",

          bottom: 0,
          left: 0,
          width: "100%",
          height: "12rem",
          pb: 2,
      
        }}
      >
        <RightSideBarWidthContainer sx={{ mt: "auto" }}>
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
        </RightSideBarWidthContainer>
      </Grid>
    </Grid>
  );
};

export default RightSideBar;
