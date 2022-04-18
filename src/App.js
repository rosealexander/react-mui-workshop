import Layout from "./features/Layout";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import lightTheme from "./features/theme/theme";
import {useState} from "react";

export const ThemeContext = React.createContext([]);

function App() {
    const [theme, setTheme] = useState(lightTheme)

    return (
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <ThemeContext.Provider value={[theme, setTheme]}>
                    <Layout />
                </ThemeContext.Provider>
            </ThemeProvider>
    );
}

export default App;
