import { Button } from "@mui/material";

const InfoItem = ({
  text,
  removeRightArrow = false,
}: {
  text: string;
  removeRightArrow?: boolean;
}) => {
  return (
    <Button
      sx={{
        bgcolor: "hsla(0,0%,100%,.05)",
        color: "primary.main",
        px: 1,
        py: 1,
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "none",
        display: "flex",
        justifyContent: "flex-start",
        my: 1,
        
      }}
    >
      {text} {!removeRightArrow && "→"}
    </Button>
  );
};

export default InfoItem;
