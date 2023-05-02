import Main from "./components/Home/Main";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
