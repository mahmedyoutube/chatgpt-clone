import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RightSideBarWidthContainer from "../RightSideBar/RightSideBarWidthContainer";
import ChatGptIcon from "../../shared/svg/ChatGptIcon";

const ChatItem = ({
  responseIcon,
  text,
}: {
  responseIcon?: boolean;
  text: string;
}) => {
  return (
    <RightSideBarWidthContainer>
      <Grid container sx={{ p: 2.5 }} alignItems="flex-start">
        <Grid item xs={0.7} sx={{ mr: 1.5 }}>
          {responseIcon ? (
            <ChatGptIcon htmlColor="#10a37f" fontSize="large" />
          ) : (
            <AccountCircleIcon htmlColor="#10a37f" fontSize="large" />
          )}
        </Grid>
        <Grid item xs={11} sx={{ alignSelf: "center" }}>
          <Typography
            color="primary"
            sx={{
              fontWeight: 500,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {text}
          </Typography>
        </Grid>
      </Grid>
    </RightSideBarWidthContainer>
  );
};

export default ChatItem;
