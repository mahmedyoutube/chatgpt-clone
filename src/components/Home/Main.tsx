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
        <Grid sx={{ ml: 1, width: "calc(100% - 260px)" }}>
          <Container
            sx={{
              width: { md: "43rem", lg: "60rem", height: "100%" },
            }}
          >
            <RightSideBar />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
