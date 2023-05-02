import { Box } from "@mui/material";
import ChatItem from "./ChatItem";
import { IResponses } from "../globals/types";

interface IProps {
  inputText: string;
  messages: IResponses[];
}

const Chat = ({ inputText, messages }: IProps) => {
  return (
    <Box sx={{ height: "calc(100vh - 12rem)", overflow: "auto" }}>
      <Box>
        <ChatItem text={inputText} />
      </Box>

      <Box sx={{ background: "rgba(86,88,105,1)" }}>
        {messages.map((msg) => (
          <ChatItem key={msg.messageId} text={msg.text} responseIcon />
        ))}
      </Box>
    </Box>
  );
};

export default Chat;
