+ [Part 1 - React + MUI template](https://github.com/rosealexander/react-mui-workshop/tree/part1-react+mui-template)
> **Part 2 - useState and useContext hooks**
+ [part 3 - fetch API and useEffect hook](https://github.com/rosealexander/react-mui-workshop/tree/part3-useEffect)
+ [part 4 - MUI component library](https://github.com/rosealexander/react-mui-workshop/tree/part4-MUI)

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

Open up 
src/features/theme/**ThemeToggle.jsx** and add the following:
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

Let put this in the **Header** component. Go ahead and open **sec/features/Header.jsx** and lets import the 
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

Awesome, we have a button that we can click, but it doesn't do much else right now. Let's hook up the logic we need so 
that it can switch between themes.
___
## [useState](https://reactjs.org/docs/hooks-reference.html#usestate)
If we want to save any kind of loginc in our React app we have to use **useState**. It is 
immutable meaning that whatever we store using **useState** cannot be changed directly, whatever it is that we are 
storing will always need to be replaced.
```jsx
const [state, setState] = useState(initState);
```
This is the way useState operates, the function useState returns an array with two elements, **state** and **setState**.
If you are unfamiliar with this syntax, what this is doing would be the same thing as something like this:
```js
const myState = useState
const state = myState[0]
const useState = myState[0]
```
When we write it this way we are taking advantage of JavaScripts 
[Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
feature, and this is also a React convention.

`state` has the read only value of our state. \
`setState` is a function that we use to replace said state.
`useState(initState)` allows us to provide an initial state.

We can store any type of data in setState, however it is best to stick with one data type. So for example, lets say I 
want to store an array in **useState()** I could do this.
```js
const [array, setArray] = useState([])
```
I intend to only store an Array in **array**, **setArray** so I make sure my initial value is also an empty Array.
Because JavaScript is loosely typed we won't need to worry about what type of data is actually in the array.
If I want to update the read-only value of **array** I can do:
```js
setArray([1, 2, 3]) // array is now assigned [1,2,3]
```
Open up **App.js** once again and add the following:
```jsx
...
import {useState} from "react";

function App() {
    const [theme, setTheme] = useState(lightTheme)
...
```
Here we are saying that **lightTheme** is our initial theme. Next, lets change the value of the **ThemeProvider** 
 prop called **theme** to be our read-only **theme** value from **useState**.
```jsx
<ThemeProvider theme={theme}>
```
Nothing has really changed, **lightTheme** is still passed to **ThemeProvider**, but it's just passing 
from **useState(lightTheme)**. Now if we call setTheme(someOtherTheme) we would update the value being passed to 
**ThemeProvider** and this is exactly what we are going to do in our **ThemeToggle** component.

Inorder to use **setTheme** in **ThemeToggle** we have to pass it through props. **setTheme** has to pass all the way 
through **Layout&nbsp;→&nbsp;Header&nbsp;→&nbsp;ThemeToggle**. This is known as 
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
We are using the prop serTheme that we just had passed to **Layout** and are passing it again to our **Header** 
component. Next, open up **Header.jsx** and do the same.
```jsx
// Header.jsx
const Header = ({setTheme}) => {
...
    <ThemeToggle setTheme={setTheme}/>
...
```
Finally, **setTheme** is available inside our **ThemeToggle** component. Replace **ThemeToggle.jsx** with the following:
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
toggled it will provide two arguments to our function call `(event, checked) => ` 
  - **checked** is a boolean value 
that we can reference, so we say if checked then setTheme(**darkTheme**) else setTheme(**lightTheme**)

If you take another look at the dev environment on [localhost:3000](http://localhost:3000) and click the ThemeToggle
component you will see that it switches between **lightTheme** and **darkTheme**.
___
## [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
There is a better way to do this. If we want to avoid prop drilling we can use the **createContext** hook to help us 
pass **setTheme** from **App.js** to **ThemeToggle**. Remove the changes that we made to **Layout.jsx** and 
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
The **UseContext()** hook works like this: 

First, we call **CreateContext(initialValue)** and save it to some variable that we 
export. In our case, what we did is this:
```jsx 
export const ThemeContext = createContext([]);
```
Next, we use `<ThemeContext.Provider value={someValue}>` to wrap the components that we want to grant access to
**someValue**. 

We want **Layout** and all of its children to have access to **setTheme()** :
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
We import **ThemeContext** from **App.js** and use it in the **useContext** hook like this.
```jsx
const setTheme = useContext(ThemeContext)
```
Now we can use **setTheme** in **ThemeToggle** without having to pass it as props. Check that your toggle switch is 
still working and continue to 
[part 3](https://github.com/rosealexander/react-mui-workshop/tree/part3-useEffect).

>[part 3 - fetch API and useEffect hook](https://github.com/rosealexander/react-mui-workshop/tree/part3-useEffect)
