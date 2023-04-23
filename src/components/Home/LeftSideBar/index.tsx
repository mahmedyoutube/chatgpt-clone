import { Box, Button, styled, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HistoryItem from "./HistoryItem";

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
            <HistoryItem />
          </Box>
          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>
          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>

          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>

          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>
          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>

          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>
          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>
          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>
          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>
          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>
          <Box pt={0.5} pb={1}>
            <HistoryItem />
          </Box>
          <Box pt={0.5} pb={1}>
            <HistoryItem />
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
            <HistoryItem />
          </Box>
          <Box>
            <HistoryItem />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
