import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactNode } from "react";

const HistoryItem = ({
  selected = false,
  startIcon,
  endIcon,
  text,
}: {
  selected?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  text: string;
}) => {
  return (
    <ListItem
      disablePadding
      sx={{
        bgcolor: selected ? "secondary.main" : undefined,
        "&:hover": { bgcolor: "secondary.main", borderRadius: 1 },
      }}
    >
      <ListItemButton sx={{ mr: 0 }}>
        <ListItemIcon sx={{ mr: 1.5, minWidth: 0 }}>
          {startIcon || (
            <ChatBubbleOutlineOutlinedIcon fontSize="small" color="primary" />
          )}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              color="primary"
              sx={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontSize: ".875rem",
              }}
            >
              {text}
            </Typography>
          }
        />

        {endIcon}
        {selected && (
          <ListItemIcon sx={{ ml: 1.5, minWidth: 0 }}>
            <EditIcon fontSize="small" htmlColor="rgba(197,197,210,1)" />
            <DeleteIcon fontSize="small" htmlColor="rgba(197,197,210,1)" />
          </ListItemIcon>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default HistoryItem;
