import { Box, Grid, Typography } from "@mui/material";
import RightSideBarContainer from "../../shared/RightSideBarContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatGptIcon from "../../shared/Svgs/ChatGptIcon";

const ChatItem = ({
  responseIcon,
  text,
}: {
  responseIcon?: boolean;
  text: string;
}) => {
  return (
    <RightSideBarContainer sx={{ p: 3 }}>
      <Grid container>
        <Grid item xs={0.8}>
          {responseIcon ? (
            <ChatGptIcon />
          ) : (
            <AccountCircleIcon htmlColor="#10a37f" />
          )}
        </Grid>
        <Grid item xs={11}>
          <Typography
            color="primary"
            sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {" "}
            {text}
          </Typography>
        </Grid>
      </Grid>
    </RightSideBarContainer>
  );
};

export default ChatItem;
