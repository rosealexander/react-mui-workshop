+ [Part 1 - React + MUI template](https://github.com/rosealexander/react-mui-workshop/tree/part1)
+ [Part 2 - useContext and useState hooks](https://github.com/rosealexander/react-mui-workshop/tree/part2)
> **part 3 - fetch API and useEffect hook**
+ [part 4 - MUI](https://github.com/rosealexander/react-mui-workshop/tree/part4)
___
We are going to use the API key you created from OpenWeather to fetch weather data.

If you haven't done so yet, grab a free API key from [OpenWeather](https://openweathermap.org/api).
Create an account and navigate to [Api Keys](https://home.openweathermap.org/api_keys)
and copy your default API key.

### [.env](https://create-react-app.dev/docs/adding-custom-environment-variables/)
Once you have your api key, create a new file in the project root directory named `.env`.

Inside this file, copy the following line and replace `YOUR API KEY` with your own OpenWeather api key. \
`REACT_APP_OPENWEATHER_API_KEY=YOUR API KEY`

Create React App can use `.env` files out of the box to keep global secrets. You must always prefix your environment 
variable names with `REACT_APP` to use them in your *Create React App* application. 

Restart your local dev environment by exiting the command line and running `npm start` once again.

### [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
To make an API call to OpenWeather, to get some weather data, we can use the JavaScript fetch API. Open up **body.jsx** and
add the following function.

```jsx
// body.jsx
const fetchWeather = async (areaCode) => {
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${areaCode}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    const res = await fetch(openWeatherUrl)
    return res.json()
};

const Body = () => null
...
```
Calling fetch by default makes a `GET` request to the url provided. **fetch** is an
[async function,](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) so we 
need to prefix it with **await**. Since we are using await inside **fetchWeather**, we also include **async** in our 
function signature. 

Lastly, we use the built-in function **res.json()** to translate the body of the response into **JSON** and return it.

### [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
We are going to call **fetchWeather** once the page loads for the first time. To do this, we need to use the 
**useEffect** hook. 

```jsx
useEffect(callback, [foo, bar, baz]);
```
**useEffect** executes a callback whenever any value in its second argument is changed. This can be any stateful 
element. Since we only want to call **fetchWeather** as soon as the **Body** component loads, we will make this an 
empty array.

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
        fetchWeather(91330).then(data => console.log(data))
    }, []);

    return null;
};

export default Body;
```
Open up your browser's dev tools and reload the page to see the requested data in your browsers console.

Next, lets store our weather data with **useState**. Replace **Body.jsx** with the following:

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

### [memo](https://reactjs.org/docs/hooks-reference.html#memo)
Notice how clicking on **ThemeToggle** causes an additional api call to OpenWeather.
This is because changing our theme state in **App.js** is causing the **Body** component to re-render. 
To avoid this we can wrap the **Body** component in **memo**.

[React.memo](https://reactjs.org/docs/react-api.html#reactmemo) is a 
[higher order component](https://reactjs.org/docs/higher-order-components.html) and ensures that a component
will only re-render if it has had some internal state change.

Replace these lines in **Body.jsx**:
```jsx
// body.jsx
import {memo, useEffect, useState} from "react";
...

const Body = memo(() => {
...
    
});
```
Now try switching between dark and light mode and notice that we aren't making any unnecessary api calls to OpenWeather.

Finally, body.jds should look like this:
```jsx
// body.jsx
import {memo, useEffect, useState} from "react";

const fetchWeather = async (areaCode) => {
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${areaCode}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    const res = await fetch(openWeatherUrl)
    return res.json()
};

const Body = memo(() => {
    const [weatherData, setWeatherData] = useState({})
    console.log(weatherData)

    useEffect(() => {
        fetchWeather(91330).then(data => setWeatherData(data))
    }, []);

    return null
});

export default Body;
```


> #### Use `git checkout part4` to continue to [part 4 - MUI](https://github.com/rosealexander/react-mui-workshop/tree/part4)
___
