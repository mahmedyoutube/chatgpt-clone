import { ReactNode } from "react";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const SideBarItem = ({
  startIcon,
  endIcon,
  selected,
  text,
}: {
  selected?: boolean;
  text: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}) => {
  return (
    <ListItem
      disablePadding
      sx={{
        background: selected ? "rgba(86,88,105,1)" : undefined,

        "&:hover": {
          background: "rgba(86,88,105,1)",
          borderRadius: 1,
        },
      }}
    >
      <ListItemButton>
        <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
          {startIcon || (
            <ChatBubbleOutlineIcon fontSize="small" color="primary" />
          )}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              sx={{
                whiteSpace: "nowrap",
                fontSize: "0.875rem",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {text}
            </Typography>
          }
        />
      </ListItemButton>
      {endIcon && <Box mr={1}>{endIcon}</Box>}
      {selected && (
        <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
          <EditIcon fontSize="small" color="primary" />
          <DeleteIcon fontSize="small" color="primary" />
        </ListItemIcon>
      )}
    </ListItem>
  );
};

export default SideBarItem;
