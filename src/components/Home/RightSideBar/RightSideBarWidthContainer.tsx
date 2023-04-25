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
    <Container sx={{ width: { md: "36rem", lg: "53rem" }, ...sx }}>
      {children}
    </Container>
  );
};

export default RightSideBarWidthContainer;
