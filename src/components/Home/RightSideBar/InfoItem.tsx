import { Button } from "@mui/material";

const InfoItem = ({
  text,
  rightIcon = false,
}: {
  text: string;
  rightIcon?: boolean;
}) => {
  return (
    <Button
      sx={{
        bgcolor: "hsla(0,0%,100%,.05)",
        my: 1,
        fontSize: ".875rem",
        textTransform: "none",
      }}
    >
      {text} {rightIcon && "→"}{" "}
    </Button>
  );
};

export default InfoItem;
