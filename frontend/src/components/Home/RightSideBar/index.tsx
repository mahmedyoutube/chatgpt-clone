import {
  Grid,
  Typography,
  TextField,
  styled,
  Link,
  Box,
  Card,
  IconButton,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import InfoItem from "./InfoItem";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Info from "./Info";
import Chat from "../Chat";
import RightSideBarWidthContainer from "./RightSideBarWidthContainer";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { chatApi, getConversationById } from "../../../utils/api";
import { IResponses } from "../globals/types";
import { useParams } from "react-router-dom";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
});

const RightSideBar = () => {
  const inputTextRef = useRef<HTMLTextAreaElement>();

  const { conversationId: selectedConversationId } = useParams();

  const [showChat, setShowChat] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const [promptWithMsg, setPromptWithMsg] = useState<(string | IResponses)[]>(
    []
  );

  const onSubmit = async (e: FormEvent) => {
    const val = inputTextRef.current!.value;

    if (!val.length || val.length < 5) return;

    const previousMsg =
      promptWithMsg.length > 0
        ? (promptWithMsg[promptWithMsg.length - 1] as IResponses)
        : undefined;

    inputTextRef.current!.value = "";

    const promptWithMsgObj = [...promptWithMsg, val];

    setPromptWithMsg(promptWithMsgObj);
    setShowChat(true);

    // call your api here

    try {
      const res = await chatApi({
        previousMessageId: previousMsg ? previousMsg.messageId : "",
        conversationId,
        prompt: val,
      });

      const {
        conversationId: apiPrevConversationId,
        messageId,
        prompt,
        text,
      } = res;

      setConversationId(apiPrevConversationId);
      setPromptWithMsg([...promptWithMsg, { messageId, prompt, text }]);
    } catch (err) {
      console.log("err in calling the api", err);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit(event);
    }
  };

  const loadPrevConversation = useCallback(async () => {
    if (!selectedConversationId) return;

    try {
      const res = await getConversationById(selectedConversationId);
      setPromptWithMsg(res.responses);
    } catch (err) {}
  }, [selectedConversationId]);

  useEffect(() => {
    loadPrevConversation();
  }, [loadPrevConversation]);

  return (
    <Grid
      container
      flexDirection="column"
      sx={{
        height: "100vh",
        width: "100%",

        position: "relative",
      }}
    >
      {promptWithMsg.length > 0 ? (
        <Chat messages={promptWithMsg} />
      ) : (
        <Grid
          container
          flexDirection="column"
          sx={{ mt: { md: "20vh", sm: 10 }, mb: { lg: 7 } }}
        >
          <Grid item>
            <Typography
              textAlign="center"
              variant="h4"
              fontWeight="bold"
              color="primary"
              sx={{ mb: { xs: 5, sm: 3, lg: 7 } }}
            >
              ChatGPT
            </Typography>
          </Grid>
          <RightSideBarWidthContainer>
            <Grid
              item
              container
              justifyContent="space-between"
              sx={{ height: "calc(100% - 12rem)" }}
            >
              <Info />
            </Grid>
          </RightSideBarWidthContainer>
        </Grid>
      )}

      <Grid
        item
        container
        flexDirection="column"
        justifyContent="flex-end"
        sx={{
          position: "absolute",

          bottom: 0,
          left: 0,
          width: "100%",
          height: "12rem",
          pb: 2,
        }}
      >
        <RightSideBarWidthContainer sx={{ mt: "auto" }}>
          <Card sx={{ background: "transparent" }}>
            <form
              style={{
                display: "flex",
                alignItems: "center",
                background: "#40414f",
              }}
              onSubmit={onSubmit}
            >
              <StyledTextField
                fullWidth
                placeholder="Send a message..."
                sx={{ mt: "auto" }}
                inputRef={inputTextRef}
                maxRows={4}
                multiline
                onKeyDown={handleKeyDown}
                InputProps={{
                  style: { color: "rgba(255,255,255,1)" },
                }}
              />
              <IconButton onClick={onSubmit}>
                <SendOutlinedIcon color="primary" />
              </IconButton>
            </form>
          </Card>

          <Box sx={{ color: "hsla(0,0%,100%,.5)", fontSize: ".75rem", pt: 1 }}>
            <Link> ChatGPT Mar 23 Version</Link>. Free Research Preview. ChatGPT
            may produce inaccurate information about people, places, or facts.
          </Box>
        </RightSideBarWidthContainer>
      </Grid>
    </Grid>
  );
};

export default RightSideBar;
