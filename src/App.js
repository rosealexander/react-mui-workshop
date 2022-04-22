import Layout from "./features/Layout";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import lightTheme from "./features/theme/theme";

function App() {
    return (
            <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Layout />
            </ThemeProvider>
    );
}

export default App;
