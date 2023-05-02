import { Box } from "@mui/material";
import ChatItem from "./ChatItem";
import { IResponses } from "../globals/types";

interface IProps {
  messages: (IResponses | string)[];
}

const Chat = ({ messages }: IProps) => {
  return (
    <Box sx={{ height: "calc(100vh - 12rem)", overflow: "auto" }}>
      {messages?.map((msg) => {
        if (typeof msg === "string") {
          return <ChatItem key={msg} text={msg} />;
        }

        return (
          <Box key={msg.messageId}>
            <ChatItem text={msg.prompt} />
            <Box sx={{ background: "rgba(86,88,105,1)" }}>
              <ChatItem text={msg.text} responseIcon />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Chat;
