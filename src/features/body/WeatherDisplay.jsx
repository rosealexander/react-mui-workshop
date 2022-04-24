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
