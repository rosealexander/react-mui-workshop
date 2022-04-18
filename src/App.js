import Layout from "./features/Layout";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import lightTheme from "./features/theme/theme";

function App() {

    return (
            <ThemeProvider theme={lightTheme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                    <Layout />
            </ThemeProvider>
    );
}

export default App;
