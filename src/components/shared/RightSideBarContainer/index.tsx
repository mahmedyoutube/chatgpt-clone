import { Container, SxProps } from "@mui/material";
import { ReactNode } from "react";

const RightSideBarContainer = ({
  sx = {},
  children,
}: {
  sx?: SxProps;
  children: ReactNode | ReactNode[];
}) => {
  return (
    <Container sx={{ maxWidth: { md: "41rem", lg: "53rem" }, ...sx }}>
      {children}
    </Container>
  );
};

export default RightSideBarContainer;
