import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const SideBarItem = () => {
  return (
    <ListItem
      disablePadding
      sx={{
        overflow: "hidden",
        "&:hover": {
          background: "rgba(86,88,105,1)",
          borderRadius: 1,
        },
      }}
    >
      <ListItemButton>
        <ListItemIcon sx={{ minWidth: 0, mr: 1.5 }}>
          <ChatBubbleOutlineIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography sx={{ whiteSpace: "nowrap" }}>
              some Text some Tex some Tex some Tex{" "}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
