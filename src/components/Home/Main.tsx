import { Grid, Box, Container } from "@mui/material";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const Main = () => {
  return (
    <Box>
      <Grid container>
        <Grid xs={2} sx={{ position: "relative" }}>
          <LeftSideBar />
        </Grid>
        <Grid sx={{ width: "calc(100% - 260px)", ml: 1 }}>
          <Container sx={{ width: { md: "36rem", lg: "53rem" } }}>
            <RightSideBar />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
