import { Grid, Box, Container } from "@mui/material";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const Main = () => {
  return (
    <Box>
      <Grid
        container
        justifyContent="space-between"
        sx={{ flexWrap: "nowrap" }}
      >
        <Grid item sx={{ position: "relative" }}>
          <LeftSideBar />
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <RightSideBar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
