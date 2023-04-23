import { Grid, Box } from "@mui/material";

const Main = () => {
  return (
    <Box>
      <Grid container>
        <Grid xs={2}>Left</Grid>
        <Grid xs={9}>Right</Grid>
      </Grid>
    </Box>
  );
};

export default Main;
