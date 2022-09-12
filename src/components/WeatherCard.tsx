import React from 'react';
import { Grid, Typography, Divider, Card } from '@mui/material';

import LocationData from "../models/LocationData";

interface IWeatherCard {
    chosenLocation: LocationData,
}

export default function WeatherCard({ chosenLocation }: IWeatherCard) {
    if (chosenLocation.name !== "") {
        return (
            <Card className="card marginRight" style={{ width: '300px' }}>
                <p>{chosenLocation.name}</p>
                <Divider />
                <Grid style={{ minHeight: '100%', width: '100%' }}>
                    <Typography style={{ marginTop: 10 }}>Weather Forecast: {chosenLocation.forecast}</Typography>
                </Grid>
            </Card>
        )
    } else {
        return (
            <Card className="card marginRight" style={{ width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p><em>No Location chosen</em></p>
            </Card>
        )
    }
}
