import { Box, Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SideBarItem from "./SideBarItem";

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
        px: 0.8,
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
            <SideBarItem />
          </Box>

          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>

          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>

          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
        </Box>

        <Box sx={{ borderTop: "1px solid rgba(86,88,105,1)" }}>
          <Box mt={0.5} mb={0.7} sx={{ overflow: "hidden" }}>
            <SideBarItem />
          </Box>

          <Box mt={0.5} mb={0.7}>
            <SideBarItem />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
