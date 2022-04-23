+ [Part 1 - React + MUI baseline](https://github.com/rosealexander/react-mui-workshop/tree/part1-react+mui-baseline)
+ [Part 2 - useContext and useState hooks](https://github.com/rosealexander/react-mui-workshop/tree/part2-useContext%26useState)
> **part 3 - useMemo and useEffect hooks**
+ [part 4 - MUI component library](https://github.com/rosealexander/react-mui-workshop/tree/part4-MUI)
+ [part 5 - GitHub Pages](https://github.com/rosealexander/react-mui-workshop/tree/part5-GitHub-Pages)
___
We are going to use the API key we created from OpenWeather to fetch weather data for our web app.
### [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
```jsx
// body.jsx
import {useEffect} from "react";

const Body = () => {
    const fetchWeather = async (areaCode) => {
        const openWeatherApi = `https://api.openweathermap.org/data/2.5/weather?zip=${areaCode}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        return (await fetch(openWeatherApi)).json()
    };

    useEffect(() => {
        fetchWeather(91330).then((data) => {console.log(data)})
    }, []);

    return null;
};

export default Body;
```
### [UseEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
### [Memo](https://reactjs.org/docs/react-api.html#reactmemo)
