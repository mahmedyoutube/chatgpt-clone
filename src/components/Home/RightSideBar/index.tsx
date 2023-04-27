import {
  Grid,
  Typography,
  TextField,
  styled,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import InfoItem from "./InfoItem";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Info from "./Info";
import RightSideBarContainer from "../../shared/RightSideBarContainer";
import Chat from "../Chat";
import React, { useRef, useState } from "react";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
});

const RightSideBar = () => {
  const inputTextRef = useRef<HTMLTextAreaElement>();
  const [submitText, setSubmitText] = useState("");

  const onSubmit = () => {
    const val = inputTextRef.current!.value;
    if (!val) return;

    inputTextRef.current!.value = "";
    setSubmitText(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Grid
      container
      flexDirection="column"
      sx={{ height: "100vh", position: "relative" }}
    >
      {!!submitText ? (
        <Chat inputText={submitText} />
      ) : (
        <>
          <Grid item sx={{ mt: { lg: "20vh", xs: 7 }, mb: 7 }}>
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight="bold"
              color="primary"
            >
              ChatGPT
            </Typography>
          </Grid>
          <RightSideBarContainer>
            <Info />
          </RightSideBarContainer>{" "}
        </>
      )}
      <Grid
        item
        container
        flexDirection="column"
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "12rem",
          pb: 2,
        }}
      >
        <RightSideBarContainer sx={{ mt: "auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "rgba(64,65,79,1)",
            }}
          >
            <StyledTextField
              fullWidth
              placeholder="Send a message..."
              multiline
              maxRows={4}
              inputRef={inputTextRef}
              onKeyDown={handleKeyDown}
              sx={{ mt: "auto" }}
              InputProps={{
                style: { color: "rgba(255,255,255,1)" },
              }}
            />

            <IconButton onClick={onSubmit}>
              <SendOutlinedIcon color="primary" />
            </IconButton>
          </Box>

          <Box sx={{ color: "hsla(0,0%,100%,.5)", fontSize: ".75rem", pt: 1 }}>
            <Link> ChatGPT Mar 23 Version</Link>. Free Research Preview. ChatGPT
            may produce inaccurate information about people, places, or facts.
          </Box>
        </RightSideBarContainer>
      </Grid>
    </Grid>
  );
};

export default RightSideBar;
