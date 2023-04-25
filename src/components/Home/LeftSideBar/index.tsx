import { Box, Button, styled, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HistoryItem from "./HistoryItem";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MuiButton = styled(Button)({
  display: "flex",
  justifyContent: "flex-start",
  textTransform: "none",
  fontSize: "bold",
  border: "1px solid hsla(0,0%,100%,.2)",
});

const LeftSideBar = () => {
  return (
    <Box
      sx={{
        background: "#202123d9",
        position: "fixed",
        top: 0,
        width: 260,
        px: 0.8,
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <MuiButton
          variant="outlined"
          fullWidth
          startIcon={<AddIcon />}
          sx={{
            py: 1.5,
            mt: 0.7,
            "&:hover": { border: "1px solid hsla(0,0%,100%,.2)" },
          }}
        >
          New chat
        </MuiButton>

        <Box sx={{ height: "100%", overflow: "scroll" }}>
          <Box pt={0.5} pb={1}>
            <HistoryItem text="text 2" selected />
          </Box>
          <Box pt={0.5} pb={1}>
            <HistoryItem text="text 1" />
          </Box>
        </Box>

        <Box
          sx={{
            bottom: 0,
            left: 0,
            width: "100%",
            borderTop: "1px solid hsla(0,0%,100%,.2)",
            py: 2,
          }}
        >
          <Box>
            <HistoryItem
              text="Upgrade To Plus"
              startIcon={<PersonIcon color="primary" />}
              endIcon={
                <Box
                  sx={{
                    background: "rgba(250,230,158,1)",
                    fontSize: 14,
                    p: 0.5,
                    borderRadius: 1,
                  }}
                >
                  New
                </Box>
              }
            />
          </Box>
          <Box>
            <HistoryItem
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
