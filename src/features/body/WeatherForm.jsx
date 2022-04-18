import React, {useState} from 'react';
import {Button, FormControl, Grid, TextField} from "@mui/material";

const WeatherForm = ({fetchWeather}) => {
    const [zipCode, setZipCode] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeather(zipCode).then()
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
                    <FormControl
                        fullWidth
                        required
                    >
                        <TextField
                            required
                            id="item-name-input"
                            aria-describedby="my-helper-text"
                            value={zipCode}
                            onChange={event => setZipCode(event.target.value)}
                            autoComplete='off'
                            inputProps={{ maxLength: 5 }}
                            label='Zip Code'
                        />
                    </FormControl>
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
