import {memo, useEffect, useState} from "react";

const Body = memo( () => {
    const [weatherData, setWeatherData] = useState({})

    const fetchWeather = async (areaCode) => {
        const openWeatherApi = `https://api.openweathermap.org/data/2.5/weather?zip=${areaCode}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        await fetch(openWeatherApi)
            .then(async (res) => {
                if (res.status === 200) {
                    const data = await res.json()
                    setWeatherData(data)
                }
            })
    };

    useEffect(() => {
        fetchWeather(91330).then()
    }, []);

    console.log(weatherData)


    return null;
});

export default Body;
