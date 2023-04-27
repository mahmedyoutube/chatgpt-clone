import Main from "./components/Home/Main";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
