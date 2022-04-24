+ [Part 1 - React + MUI template](https://github.com/rosealexander/react-mui-workshop/tree/part1)
> **Part 2 - useState and useContext hooks**
+ [part 3 - fetch API and useEffect hook](https://github.com/rosealexander/react-mui-workshop/tree/part3)
+ [part 4 - MUI component library](https://github.com/rosealexander/react-mui-workshop/tree/part4)

___

If you take another look at **theme.js** you will see that we have a second theme named **darkTheme**.
```jsx
// theme.js
...
export const darkTheme = responsiveFontSizes(
    createTheme({
        palette: {
            mode: "dark",
...
```
What we are going to do is create a theme toggle button to switch between light and dark themes. 

Open up **src/features/theme/ThemeToggle.jsx** and replace with the following:
```jsx
// ThemeToggle.jsx
import {Switch} from "@mui/material";

const ThemeToggle = () => {
    return (
        <Switch size='small'/>
    )
};

export default ThemeToggle;
```
`<Switch />` is a component provided by the MUI component library that we are going to use for our light/dark theme toggle 
button.

Let put this in the **Header** component. Go ahead and open **src/features/Header.jsx** and import the 
**ThemeToggle** component.
```jsx
// Header.jsx
import {AppBar, Avatar, Grid, Typography} from "@mui/material";
import ThemeToggle from "./theme/ThemeToggle";

const Header = () => {
    return (
...
```
Next, add **ThemeToggle** towards the end of the **Header** component like so:
```jsx
// Header.jsx
...
                                React + Material UI
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <ThemeToggle />
                </Grid>
            </Grid>
        </AppBar>
    );
};

export default Header;
```
If we still have our local dev environment running our Header component should look like this now:

![Toggle in the header](toggler.jpg)

Awesome, we have a button that we can click on, but it doesn't do much else right now. Let's hook up the logic we need 
so that it will switch between themes.
___
## [useState](https://reactjs.org/docs/hooks-reference.html#usestate)
To save any kind of persistent data in our React app we have to use **useState**. State is immutable in React, meaning 
that whatever we store using **useState** cannot be changed directly. Whatever it is that we are storing will always 
need to be replaced rather than updated.
```jsx
const [state, setState] = useState(initState);
```
**useState** returns an array with two elements, **state** and **setState**.

`state` has the read only value of our state. \
`setState` is a function that we use to replace said state. \
`useState(initState)` allows us to provide an initial state.

If you are unfamiliar with this syntax, its is the same thing as saying:
```js
const myState = useState
const state = myState[0]
const setState = myState[1]
```
*Writing things this way takes advantage of JavaScripts
[Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
feature and is also a React convention.*

We can store any type of data in setState, however it is best to stick with one type of data. For example, lets say I 
want to store an array in **useState()** I could do this.
```js
const [array, setArray] = useState([])
```
I intend to only store an Array in **array**, so I make sure my initial value is also an empty Array.
Because JavaScript is loosely typed we won't need to worry about what type of data is actually in the array.

If I want to update the read-only value of **array** I can do this:
```js
setArray([foo, bar, baz]) // Read only value of array is now assigned to be [foo, bar, baz]
```
Open up **App.js** once again and add the following:
```jsx
...
import {useState} from "react";

function App() {
    const [theme, setTheme] = useState(lightTheme)
...
```
Here we are saying that **lightTheme** is our initial theme. Next, lets change the value of **ThemeProvider's** 
 prop,  **theme** to be our **theme** value from **useState**.
```jsx
<ThemeProvider theme={theme}>
```
**lightTheme** is still passed to **ThemeProvider**, but now it's passing 
from **useState(lightTheme)**. If we call setTheme(**someOtherTheme**) we would update the value being passed to 
**ThemeProvider**, and this is exactly what we are going to do in our **ThemeToggle** component.

To use **setTheme** in **ThemeToggle** we have to pass it through as props. **setTheme** has to pass all the way 
from **Layout** to **Header** and finally into **ThemeToggle**. 
**Layout&nbsp;→&nbsp;Header&nbsp;→&nbsp;ThemeToggle**. This is known as 
[Prop Drilling](https://www.geeksforgeeks.org/what-is-prop-drilling-and-how-to-avoid-it/). 

Add `setTheme={setTheme}` to `<Layout />` in **App.js**.
```jsx
// App.js
...
<Layout setTheme={setTheme}/>
...
```
Next, add the following to **Layout.jsx**
```jsx
// Layout.jsx
...
const Layout = ({setTheme}) => {
...
    <Header setTheme={setTheme}/>
...
```
We are using the prop setTheme that we just passed to **Layout** and are again passing it to the **Header** 
component. Next, open up **Header.jsx** and do the same.
```jsx
// Header.jsx
const Header = ({setTheme}) => {
...
    <ThemeToggle setTheme={setTheme}/>
...
```
Finally, **setTheme** is available to use inside our **ThemeToggle** component. Replace **ThemeToggle.jsx** with the 
following:
```jsx
// ThemeToggle.jsx
import {Switch} from "@mui/material";
import {lightTheme, darkTheme} from "./theme.js"

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

export default ThemeToggle;
```
- `onChange` is a prop provided by the [Switch](https://mui.com/material-ui/api/switch/) component. Whenever it is 
toggled it will pass two arguments to our function call `(event, checked) => ` 
  - **checked** is a boolean value that we may reference, so we say "if checked then setTheme(**darkTheme**) else 
setTheme(**lightTheme**)."

If you take another look at the dev environment on [localhost:3000](http://localhost:3000) and click the ThemeToggle
component you will see that it switches between **lightTheme** and **darkTheme**.
___
## [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
There is a better way to do this. To avoid prop drilling we can use the **createContext** hook to help us 
pass **setTheme** from **App.js** to **ThemeToggle**. 

Remove the changes that we made to **Layout.jsx** and 
**Header.jsx** and then replace **App.js** with the following:
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
**useContext()** works like this: 

First, we call **createContext(initialValue)** and save it to some exported variable. 
```jsx 
export const ThemeContext = createContext([]);
```
Next, use `<ThemeContext.Provider value={someValue}>` to wrap the components that you want to grant access to
**someValue**. 

To give **Layout** and all of its children access to **setTheme()**, do this:
```jsx
<ThemeContext.Provider value={[theme, setTheme]}>
    <Layout />
</ThemeContext.Provider>
```
Now, open up **ThemeToggle.jsx** and replace with the following:

```jsx
// ThemeToggle.jsx
import {Switch} from "@mui/material";
import {useContext} from "react";
import lightTheme, {darkTheme} from "./theme";
import {ThemeContext} from "../../App";

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
Import **ThemeContext** from **App.js** and use it in the **useContext** hook like this:
```jsx
const setTheme = useContext(ThemeContext)
```
Now we are using **setTheme** in **ThemeToggle** without having to pass it as props. Check that your toggle switch is 
still working and continue onto 
[part 3](https://github.com/rosealexander/react-mui-workshop/tree/part3).

> #### Use `git checkout part3` [to continue to part 3 - fetch API and useEffect hook](https://github.com/rosealexander/react-mui-workshop/tree/part3)

___
