# Part 4 - Material UI (MUI)
___
+ [Part 1 - React + MUI template](https://github.com/rosealexander/react-mui-workshop/tree/part1-react+mui-template)
+ [Part 2 - useContext and useState hooks](https://github.com/rosealexander/react-mui-workshop/tree/part2-useContext%26useState)
+ [part 3 - fetch API and useEffect hook](https://github.com/rosealexander/react-mui-workshop/tree/part3-useEffect)
> **part 4 - MUI component library**
___

```jsx
import {memo, useEffect, useState} from "react";
import WeatherForm from "./WeatherForm";
import {Grid, Paper} from "@mui/material";
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

    return (
        <Paper sx={{p:5}}>
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
        </Paper>
    );
});

export default Body;
```

### [Paper](https://mui.com/material-ui/api/paper/)
### [Box](https://mui.com/material-ui/api/grid/)
### [Grid](https://mui.com/material-ui/api/grid/)


```jsx
// WeatherForm.jsx
import {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";

const WeatherForm = ({setWeatherData, fetchWeather}) => {
    const [zipCode, setZipCode] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeather(zipCode).then(data => setWeatherData(data))
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <Grid
                container
                direction='column'
                spacing={5}
            >
                <Grid item>
                    <TextField
                        required
                        fullWidth
                        id="item-name-input"
                        aria-describedby="my-helper-text"
                        value={zipCode}
                        onChange={event => setZipCode(event.target.value)}
                        autoComplete='off'
                        inputProps={{ maxLength: 5 }}
                        label='Zip Code'
                    />
                </Grid>
                <Grid item>
                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                    >
                        Check the weather
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default WeatherForm;
```

### [TextField](https://mui.com/material-ui/api/text-field/)
### [Button](https://mui.com/material-ui/api/button/)

```jsx
// WeatherDisplay.jsx
import {Avatar, Grid, Typography} from "@mui/material";

const WeatherDisplay = ({weatherData = {}}) => {
    if (!weatherData?.weather) return null

    const name = weatherData.name
    const temp = parseInt(weatherData.main.temp)
    const description = weatherData.weather[0].description
    const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

    return (
        <Grid
            container
            justifyContent='space-between'
        >
            <Grid item>
                <Grid
                    container
                    spacing={1}
                >
                    <Grid item>
                        <Avatar
                            sx={{ width: 42, height: 42 }}
                            src={icon}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            align='right'
                            variant='h3'
                        >
                            {temp}°F
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid
                    container
                    direction='column'
                >
                    <Grid item>
                        <Typography
                            align='right'
                            variant='h5'
                        >
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            align='right'
                            variant='subtitle2'
                            color='primary'
                        >
                            {description}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default WeatherDisplay;
```
### [Avatar](https://mui.com/material-ui/api/avatar/)
### [Typography](https://mui.com/material-ui/api/typography/)

These are just some many MUI components available to us, reference to many more can be found in the 
[MUI component documentation](https://mui.com/material-ui/getting-started/supported-components/).
