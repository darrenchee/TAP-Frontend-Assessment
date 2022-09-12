import React from 'react';
import { Grid, TextField, List, Card } from '@mui/material';
import './App.css';

import LocationsList from './components/LocationsList';
import WeatherCard from './components/WeatherCard';
import ScreenshotDisplay from './components/ScreenshotDisplay';

import LocationData from './models/LocationData';

const tempLocations = [
  {
    name: "Ang Mo Kio",
    label_location: {
      latitude: 1.375,
      longitude: 103.839
    },
    forecast: "Partly Cloudy (Night)"
  },
  {
    name: "Bedok",
    label_location: {
      latitude: 1.321,
      longitude: 103.924
    },
    forecast: "Partly Cloudy (Night)"
  },
  {
    name: "Bishan",
    label_location: {
      latitude: 1.350772,
      longitude: 103.839
    },
    forecast: "Partly Cloudy (Night)"
  },
  {
    name: "Boon Lay",
    label_location: {
      latitude: 1.304,
      longitude: 103.701
    },
    forecast: "Partly Cloudy (Night)"
  },
  {
    name: "Bukit Batok",
    label_location: {
      latitude: 1.353,
      longitude: 103.754
    },
    forecast: "Partly Cloudy (Night)"
  },
]

const tempWeatherData = [
  {
    area: "Ang Mo Kio",
    forecast: "Partly Cloudy (Night)"
  },
  {
    area: "Bedok",
    forecast: "Partly Cloudy (Night)"
  },
  {
    area: "Bishan",
    forecast: "Partly Cloudy (Night)"
  },
  {
    area: "Boon Lay",
    forecast: "Partly Cloudy (Night)"
  },
  {
    area: "Bukit Batok",
    forecast: "Partly Cloudy (Night)"
  },
]

const dummyLocation: LocationData = {
  name: "",
  label_location: {
    latitude: 0,
    longitude: 0
  },
  forecast: ""
}

function App() {
  const [chosenLocation, setChosenLocation] = React.useState<LocationData>(dummyLocation);

  return (
    <div className="App">
      <div className="content">
        <Grid container style={{ display: 'flex' }}>
          <TextField
            id="outlined-basic"
            label="Date"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Time"
            variant="outlined"
          />
        </Grid>
        <Grid container>
          <LocationsList locations={tempLocations} chosenLocation={chosenLocation} setChosenLocation={setChosenLocation} />
          <WeatherCard chosenLocation={chosenLocation} />
        </Grid>
        <Grid container>
          <ScreenshotDisplay imageLink={"asdkjhasd"} />
        </Grid>
      </div>
    </div>
  );
}

export default App;
