# Part 4 - Material UI (MUI)
___
+ [Part 1 - React + MUI template](https://github.com/rosealexander/react-mui-workshop/tree/part1-react+mui-template)
+ [Part 2 - useContext and useState hooks](https://github.com/rosealexander/react-mui-workshop/tree/part2-useContext%26useState)
+ [part 3 - fetch API and useEffect hook](https://github.com/rosealexander/react-mui-workshop/tree/part3-useEffect)
> **part 4 - MUI component library**
___
The [MUI component library]() allows us to use many styled components right out of the box. Using a component library 
like **MUI** is a great way to jumpstart any React front-end. The core features of MUI include **inputs**, 
**data display**, **feedback**, **surfaces**, **navigation**, **layout**, and **utilities**. We will only be using some 
of these features for our project, but it's good to know that MUI is able to provide many necessary components for 
building even more complex UI. 

Let's add the following to our **Body** component. 
```jsx
// Body.jsx
import {Grid, Paper} from "@mui/material";
import WeatherForm from "./WeatherForm";
import WeatherDisplay from "./WeatherDisplay";
...
const Body = memo(() => {
...
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
...
```

### [Paper](https://mui.com/material-ui/api/paper/)
- `sx={{p:5}}`
### [Grid](https://mui.com/material-ui/api/grid/)
- `container`
- `direction='column'`
- `spacing={5}`
- `item`

Next, open WeatherForm.jsx and replace with the following:
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
- `required`
- `fullWidth`
- `id="item-name-input"`
- `aria-describedby="my-helper-text"`
- `value={zipCode}`
- `onChange={event => setZipCode(event.target.value)}`
- `autoComplete='off'`
- `inputProps={{ maxLength: 5 }}`
- `label='Zip Code'`

### [Button](https://mui.com/material-ui/api/button/)
- `fullWidth`
- `type='submit'`
- `variant='contained'`

Open up WeatherDisplay.jsx and replace with this:
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
- `src={icon}`

### [Typography](https://mui.com/material-ui/api/typography/)
- `align='right'`
- `variant='h3'`
- `color='primary'`

These are just some many MUI components available to us, reference to many more can be found in the 
[MUI component documentation](https://mui.com/material-ui/getting-started/supported-components/).
