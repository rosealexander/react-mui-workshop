+ [Part 1 - React + MUI baseline](https://github.com/rosealexander/react-mui-workshop/tree/part1-react+mui-baseline)
> **Part 2 - useContext and useState hooks**
+ [part 3 - Fetch API and useEffect hook](https://github.com/rosealexander/react-mui-workshop/tree/part3-useEffect+useMemo)
+ [part 4 - MUI component library](https://github.com/rosealexander/react-mui-workshop/tree/part4-MUI)
+ [part 5 - GitHub Pages](https://github.com/rosealexander/react-mui-workshop/tree/part5-GitHub-Pages)

<hr />

## [UseState](https://reactjs.org/docs/hooks-reference.html#usestate)

```jsx
...
function App() {
    const [theme, setTheme] = useState(lightTheme)
...
```
```jsx
...
<Layout theme={theme} setTheme={setTheme}/>
...
```
```jsx
// App.js
import Layout from "./features/Layout";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useState} from "react";
import lightTheme from "./features/theme/theme";

function App() {
    const [theme, setTheme] = useState(lightTheme)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout theme={theme} setTheme={setTheme}/>
        </ThemeProvider>
    );
}
export default App;
```
setTheme has to pass all the way through \
App → Layout → Header → ThemeToggle \
before we can use it in App.js

```jsx
// Layout.jsx
...
const Layout = ({setTheme}) => {
...
    <Header setTheme={setTheme}/>
    <Body />
    <Footer/>
...
```
```jsx
const Header = ({setTheme}) => {
...
    <Grid item>
        <ThemeToggle setTheme={setTheme}/>
    </Grid>
...
}
```
```jsx
const ThemeToggle = ({setTheme}) => {
    return (
        <Switch
            size='small'
            onChange={(event, checked) => {
                checked ? setTheme(darkTheme) : setTheme(lightTheme)
            }}
        />
    )
};
```
___
## [UseContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
```jsx
import Layout from "./features/Layout";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useState, createContext} from "react";
import lightTheme from "./features/theme/theme";

export const ThemeContext = createContext([]);

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
```
```jsx
import {Switch} from "@mui/material";
import {useContext} from "react";
import {ThemeContext} from "../../App";
import lightTheme, {darkTheme} from "./theme";

const ThemeToggle = () => {
    const [theme, setTheme] = useContext(ThemeContext)

    return (
        <Switch
            size='small'
            onChange={(event, checked) => {
                checked ? setTheme(darkTheme) : setTheme(lightTheme)
            }}
        />
    )
};

export default ThemeToggle;
```
