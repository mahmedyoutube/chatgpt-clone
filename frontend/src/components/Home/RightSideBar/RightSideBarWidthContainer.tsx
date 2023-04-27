import { Container, SxProps } from "@mui/material";
import { ReactNode } from "react";

const RightSideBarWidthContainer = ({
  children,
  sx = {},
}: {
  children: ReactNode | ReactNode[];
  sx?: SxProps;
}) => {
  return (
    <Container sx={{ maxWidth: { md: "46rem", lg: "53rem" }, ...sx }}>
      {children}
    </Container>
  );
};

export default RightSideBarWidthContainer;
