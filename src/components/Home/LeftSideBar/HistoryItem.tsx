import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

const HistoryItem = () => {
  return (
    <ListItem
      disablePadding
      sx={{ "&:hover": { bgcolor: "secondary.main", borderRadius: 1 } }}
    >
      <ListItemButton sx={{ mr: 0 }}>
        <ListItemIcon sx={{ mr: 1.5, minWidth: 0 }}>
          <ChatBubbleOutlineOutlinedIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              color="primary"
              sx={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              @mui/icons-material/ChatBubbleOutlineOutlined
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default HistoryItem;
