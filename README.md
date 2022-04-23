+ [Part 1 - React + MUI baseline](https://github.com/rosealexander/react-mui-workshop/tree/part1-react+mui-baseline)
+ [Part 2 - useContext and useState hooks](https://github.com/rosealexander/react-mui-workshop/tree/part2-useContext%26useState)
> **part 3 - useEffect and useMemo hooks**
+ [part 4 - MUI component library](https://github.com/rosealexander/react-mui-workshop/tree/part4-MUI)
___
We are going to use the API key we created from OpenWeather to fetch weather data for our web app.

If you haven't done so yet, grab a free API key from [OpenWeather](https://openweathermap.org/api).
Create an account and navigate to [My Api Keys](https://home.openweathermap.org/api_keys)
and generate a key named `react-mui-demo`

### [.env](https://create-react-app.dev/docs/adding-custom-environment-variables/)
Once you have your api key, create a new file in the project root directory named `.env`.

Inside this file, copy the following line and replace with your own OpenWeather api key:
`REACT_APP_OPENWEATHER_API_KEY={YOUR API KEY}`

Create React App can use `.env` files out of the box to keep global secrets. You must always prefix your environment 
variable names with `REACT_APP` for them to be usable in your React application that was bootstrapped this way.

### [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
We will use the JavaScript fetch API to make a request to OpenWeather for some weather data. Open up **body.jsx** and
add the following function.

```jsx
// body.jsx
const fetchWeather = async (areaCode) => {
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${areaCode}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    res = await fetch(openWeatherUrl)
    return res.json()
};

const Body = () => {
...
```
Let's break down what's going on here:

We are calling fetch, by default this makes a `GET` request to the url that we have provided. openWeatherUrl consists of
our api key and an area code to return weather data from. fetch is an
[async function,](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) so we 
prefix its function call with **await**. Furthermore, because we are using await inside our fetchWeather function, we
include **async** in our function signature. 

Lastly, we use the built-in function **res.json()** to translate the body of this response to **json** and return it.

### [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
We are going to call **fetchWeather** once the page loads for the first time. To do this, we need to use the 
**useEffect** hook. 

```jsx
useEffect(callback, [foo, bar, baz]);
```
**useEffect** executes a callback whenever any value in its second argument is changed. This can be any stateful 
element. If this second argument is excluded, useEffect will be called anytime any state changes in our React app.
Since we only want to call **fetchWeather** as soon as the **Body** component loads, we can include an empty array.

Replace body.jsx with the following:
```jsx
// body.jsx
import {useEffect} from "react";

const fetchWeather = async (areaCode) => {
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${areaCode}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    res = await fetch(openWeatherUrl)
    return res.json()
};

const Body = () => {
    
    useEffect(() => {
        fetchWeather(91330).then((data) => {console.log(data)})
    }, []);

    return null;
};

export default Body;
```
Open up your browser's dev tools and reload the page to see the requested data in your browsers console.

### [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)
Notice how clicking on the **ThemeToggle** button we created causes us to make an additional api call to open weather.
This is because **useEffect** changing calling **setTheme** in App.js is re-running effects in children components.
To avoid this, we can use another hook, **useMemo**.

**useMemo** acts almost identically to **useEffect**, however **useMemo** will only recompute when one of the 
dependencies in the second argument have been changed. In this case, we passed an empty array, meaning no dependencies 
so no need to recompute after initial page load.

Replace useEffect with the useMemo:
```jsx
// body.jsx
...
useMemo(() => {
    fetchWeather(91330).then((data) => {console.log(data)})
}, []);
...
```
Now try switching between dark and light mode and notice that we arnt making unnecessary api calls to OpenWeather 
anymore. 

I want to mention, with [React.memo](https://reactjs.org/docs/react-api.html#reactmemo)
we can accomplish the same thing while still using **useEffect**. We are not going to cover 
[higher order components](https://reactjs.org/docs/higher-order-components.html) at this time, but you are 
encouraged reference the [React API documentation](https://reactjs.org/docs/react-api.html) for more information.

> [part 4 - MUI component library](https://github.com/rosealexander/react-mui-workshop/tree/part4-MUI)
