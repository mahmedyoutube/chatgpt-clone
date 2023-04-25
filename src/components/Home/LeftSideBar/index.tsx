import { Box, Button, Typography, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SideBarItem from "./SideBarItem";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const MuiButton = styled(Button)({
  textAlign: "left",
  textTransform: "none",
  display: "flex",
  justifyContent: "flex-start",
});

const LeftSideBar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        background: "rgba(32,33,35,1)",
        left: 0,
        width: 260,
        height: "100%",
        color: "white",
        px: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <MuiButton
          startIcon={<AddIcon />}
          style={{ textAlign: "left" }}
          variant="outlined"
          fullWidth
          sx={{
            mt: 0.7,
            py: 1.3,
            border: "1px solid rgba(86,88,105,1)",
            "&:hover": {
              border: "1px solid rgba(86,88,105,1)",
            },
          }}
        >
          New Chat
        </MuiButton>

        <Box sx={{ height: "100%", overflow: "auto" }}>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem text="First Item slkd.jfsldkjf.dsf" selected />
          </Box>

          <Box mt={0.5} mb={0.7}>
            <SideBarItem text="First Item slkd.jfsldkjf.dsf" />
          </Box>
        </Box>

        <Box sx={{ borderTop: "1px solid rgba(86,88,105,1)" }}>
          <Box mt={0.5} mb={0.7} sx={{ overflow: "hidden" }}>
            <SideBarItem
              text="Upgrade to Plus"
              startIcon={<PersonIcon color="primary" />}
              endIcon={
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    borderRadius: 2,
                    background: "#fae69e",
                    color: "black",
                    px: 0.7,
                    py: 0.3,
                  }}
                >
                  New
                </Typography>
              }
            />
          </Box>

          <Box mt={0.5} mb={0.7}>
            <SideBarItem
              text="Username"
              startIcon={<AccountCircleIcon color="primary" />}
              endIcon={<MoreHorizIcon color="primary" />}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
