import React from 'react'
import { Radio, Grid, Typography, List, Card, Divider, ListItem } from '@mui/material';
import LocationData from "../models/LocationData";

interface ILocationList {
    locations: LocationData[],
    chosenLocation: LocationData,
    setChosenLocation: (location: LocationData) => void,
}

export default function LocationsList({ locations, chosenLocation, setChosenLocation }: ILocationList) {
    if (locations.length === 0) {
        return (
            <Card className="card marginRight" style={{ width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p><em>Date/time not provided</em></p>
            </Card>
        );
    } else {
        return (
            <Card className="card marginRight" style={{ width: '300px' }}>
                <p>Select a Location</p>
                <Divider />
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 200,
                    }}
                >
                    {
                        locations.map((locationData) => {
                            return (
                                <ListItem key={locationData.name} onClick={() => setChosenLocation(locationData)}>
                                    <Grid container style={{ backgroundColor: 'white', width: '100%', height: '100%', alignItems: 'center' }}>
                                        <Radio checked={chosenLocation.name === locationData.name} size="small" />
                                        <Typography>{locationData.name}</Typography>
                                        <Divider />
                                    </Grid>
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Card >
        )
    }
}
