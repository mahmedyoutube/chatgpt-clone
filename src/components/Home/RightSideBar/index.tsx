import { Grid, Typography, TextField, styled, Box, Link } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import InfoItem from "./InfoItem";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Info from "./Info";
import RightSideBarContainer from "../../shared/RightSideBarContainer";
import Chat from "../Chat";

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
      sx={{ height: "100vh", position: "relative" }}
    >
      <Chat />
      {/*  <Grid item sx={{ mt: "20vh", mb: 7 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="primary"
        >
          ChatGPT
        </Typography>
      </Grid>

    <RightSideBarContainer>
        <Info />
      </RightSideBarContainer> */}
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
        <RightSideBarContainer sx={{ mt: "auto" }}>
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
        </RightSideBarContainer>
      </Grid>
    </Grid>
  );
};

export default RightSideBar;
