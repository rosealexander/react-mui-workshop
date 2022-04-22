import Layout from "./features/Layout";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import lightTheme from "./features/theme/theme";
import {useState, useContext} from "react";

export const ThemeContext = React.createContext([]);

function App() {
    const [theme, setTheme] = useState(lightTheme)

    return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ThemeContext.Provider value={[theme, setTheme]}>
                    <Layout />
                </ThemeContext.Provider>
            </ThemeProvider>
    );
}

export default App;
