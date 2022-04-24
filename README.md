+ [Part 1 - React + MUI baseline](https://github.com/rosealexander/react-mui-workshop/tree/part1-react+mui-baseline)
+ [Part 2 - useContext and useState hooks](https://github.com/rosealexander/react-mui-workshop/tree/part2-useContext%26useState)
> **part 3 - fetch API and useEffect hook**
+ [part 4 - MUI](https://github.com/rosealexander/react-mui-workshop/tree/part4-MUI)
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

Restart your local dev environment by exiting the command line and running `nmp start` again.

### [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
We will use the JavaScript fetch API to make a request to OpenWeather for some weather data. Open up **body.jsx** and
add the following function.

```jsx
// body.jsx
const fetchWeather = async (areaCode) => {
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${areaCode}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    const res = await fetch(openWeatherUrl)
    return res.json()
};

const Body =() => null
...
```
We are calling fetch, by default this makes a `GET` request to the url that we have provided. openWeatherUrl consists of
our api key and an area code to return weather data from. fetch is an
[async function,](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) so we 
prefix it with **await** and since we are using await inside **fetchWeather**, we include **async** in our function 
signature. 

Lastly, we use the built-in function **res.json()** to translate the body of this response into **JSON** and return it.

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
    const res = await fetch(openWeatherUrl)
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

Now lets save our weather data with **useState**. Replace **Body.jsx** with the following:

```jsx
// body.jsx
import {useEffect, useState} from "react";

const fetchWeather = async (areaCode) => {
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${areaCode}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    const res = await fetch(openWeatherUrl)
    return res.json()
};

const Body = () => {
    const [weatherData, setWeatherData] = useState({})
    console.log(weatherData)

    useEffect(() => {
        fetchWeather(91330).then(data => setWeatherData(data))
    }, []);

    return null
};

export default Body;
```

### [memo*](https://reactjs.org/docs/hooks-reference.html#memo)
Notice how clicking on **ThemeToggle** causes an additional api call to OpenWeather.
This is because changing our theme state in **App.js** is causing the **Body** component to rerender since it is a child
component of App.js. To avoid this we can wrap the **Body** component in **memo**.

[React.memo](https://reactjs.org/docs/react-api.html#reactmemo) is a 
[higher order component](https://reactjs.org/docs/higher-order-components.html) and ensures that the **Body** component
will only re-render if it has had some internal state change.

Replace this line in **body.jsx**:
```jsx
// body.jsx
...
const Body = memo(() => {
...
});
```
Now try switching between dark and light mode and notice that we aren't making any unnecessary api calls to OpenWeather.

Finally, body.jds should look like this:
```jsx
// body.jsx
import {useEffect, useState} from "react";

const fetchWeather = async (areaCode) => {
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${areaCode}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    const res = await fetch(openWeatherUrl)
    return res.json()
};

const Body = () => {
    const [weatherData, setWeatherData] = useState({})
    console.log(weatherData)

    useEffect(() => {
        fetchWeather(91330).then(data => setWeatherData(data))
    }, []);

    return null
};

export default Body;
```

> [part 4 - MUI](https://github.com/rosealexander/react-mui-workshop/tree/part4-MUI)
