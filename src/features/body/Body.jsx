import {memo, useEffect, useState} from "react";
import WeatherForm from "./WeatherForm";
import {Box, Grid, Paper} from "@mui/material";
import WeatherDisplay from "./WeatherDisplay";

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


    return (
        <Paper>
            <Box p={5}>
                <Grid
                    container
                    direction='column'
                    spacing={5}
                >
                    <Grid item>
                        <WeatherDisplay
                            weatherData={weatherData}
                        />
                    </Grid>
                    <Grid item>
                        <WeatherForm
                            setWeatherData={setWeatherData}
                            fetchWeather={fetchWeather}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Paper>

    );
});

export default Body;
