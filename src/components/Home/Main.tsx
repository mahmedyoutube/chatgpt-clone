import { Grid, Box } from "@mui/material";
import LeftSideBar from "./LeftSideBar";

const Main = () => {
  return (
    <Box>
      <Grid container>
        <Grid xs={2} sx={{ position: "relative" }}>
          <LeftSideBar />
        </Grid>
        <Grid xs={9}>Right</Grid>
      </Grid>
    </Box>
  );
};

export default Main;
