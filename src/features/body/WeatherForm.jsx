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
