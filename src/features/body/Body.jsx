import {memo, useEffect, useState} from "react";
import {Grid, Paper} from "@mui/material";
import WeatherForm from "./WeatherForm";
import WeatherDisplay from "./WeatherDisplay";

const fetchWeather = async (areaCode) => {
    const openWeatherApi = `https://api.openweathermap.org/data/2.5/weather?zip=${areaCode}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    return await fetch(openWeatherApi).then(async (res) => res.status === 200 ? await res.json() : {})
};

const Body = memo(() => {
    const [weatherData, setWeatherData] = useState({})

    useEffect(() => {
        fetchWeather(91330).then(data => setWeatherData(data))
    }, []);

    return null
});

export default Body;
