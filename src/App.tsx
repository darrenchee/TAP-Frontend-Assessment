import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import './App.css';
import axios from 'axios';

import LocationsList from './components/LocationsList';
import WeatherCard from './components/WeatherCard';
import ScreenshotDisplay from './components/ScreenshotDisplay';

import LocationData from './models/LocationData';

import locationsComparator from './comparators/LocationsComparator';
import latComparator from './comparators/LatComparator';
import longComparator from './comparators/LongComparator';

const dummyLocation: LocationData = {
  camera_id: 0,
  name: "",
  forecast: "",
  imageLink: "",
}

function App() {
  const [locations, setLocations] = React.useState<LocationData[]>([]);
  const [chosenLocation, setChosenLocation] = React.useState<LocationData>(dummyLocation);
  const [date, setDate] = React.useState<string>("");
  const [time, setTime] = React.useState<string>("");
  const [isValid, setIsValid] = React.useState<boolean>(false);

  /* 
    Retrieves the camera's district and forecast by taking the first camera that has both
    the next lowest latitude and longitude values as compared to that retrieved in the 
    districts area array
  */
  function getCameraData(camera: any, districtsArray: any, forecastData: any) {
    const cameraData = {
      cameraDistrict: "",
      forecast: "",
    };
    for (let i = 0; i < districtsArray.length; i++) {
      if (camera.location.latitude < districtsArray[i].label_location.latitude) {
        // Remove all districts with latitiude values higher than that of the camera, except the one right above
        const filteredDistricts = [...districtsArray]
        .slice(0, i + 1)
        .sort(longComparator);

        // Search through the filtered districts array for the district which is just greater than the camera's longitude
        for (let j = 0; j < filteredDistricts.length; j++) {
          if (camera.location.longitude < districtsArray[j].label_location.longitude) {
            cameraData.cameraDistrict = filteredDistricts[j].name;
            break;
          }
        }

        // If no longitude values matched the search criteria in the filtered list, we assume the initial district was the correct one
        if (cameraData.cameraDistrict === "") {
          cameraData.cameraDistrict = districtsArray[i].name;
        }

        break;
      }
    }

    // EDGE CASE: Hardcoded woodlands to cameras with latitude values greater than all provided district locations
    if (cameraData.cameraDistrict === "") {
      cameraData.cameraDistrict = districtsArray[districtsArray.length - 2].name;
    }

    // Assign the forecast to the camera's district
    for (let k = 0; k < districtsArray.length; k++) {
      if (forecastData[k].area === cameraData.cameraDistrict) {
        cameraData.forecast = forecastData[k].forecast;
        break;
      }
    }
    return cameraData;
  }

  const fetchData = async () => {
    try {
      setChosenLocation(dummyLocation);
      const date_time = `${date}T${time}:00`;
      const trafficResponse = await axios.get(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${date_time}`);
      const weatherResponse = await axios.get(`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${date_time}`);
      const trafficData = trafficResponse.data.items[0].cameras;
      const locationData = weatherResponse.data.area_metadata.sort(latComparator);
      const forecastData = weatherResponse.data.items[0].forecasts;
      const locationArray = [];
      for (let i = 0; i < trafficData.length; i++) {
        const cameraData = getCameraData(trafficData[i], locationData, forecastData);
        let tempLocations = {
          camera_id: trafficData[i].camera_id,
          name: cameraData.cameraDistrict,
          forecast: cameraData.forecast,
          imageLink: trafficData[i].image
        }
        locationArray.push(tempLocations);
      }
      setLocations(locationArray.sort(locationsComparator));
    } catch (error: any) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    if (time !== "" && Date.parse(date) < Date.now()) {
      setIsValid(true);
    }
  }, [date, time])

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <div className="App">
      <div className="content">
        <Grid container style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Select a Date"
            type="date"
            defaultValue={date}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ margin: 20 }}
            onChange={handleChangeDate}
          />
          <TextField
            label="Set the Time"
            type="time"
            defaultValue={time}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300,
            }}
            style={{ margin: 20 }}
            sx={{ width: 150 }}
            onChange={handleChangeTime}
          />
          <Button
            variant="contained"
            style={{ height: 50, width: 100 }}
            onClick={fetchData}
            disabled={!isValid}
          >
            Confirm
          </Button>
        </Grid>
        <Grid container>
          <LocationsList locations={locations} chosenLocation={chosenLocation} setChosenLocation={setChosenLocation} />
          <WeatherCard chosenLocation={chosenLocation} />
        </Grid>
        <Grid container>
          <ScreenshotDisplay imageLink={chosenLocation.imageLink} />
        </Grid>
      </div>
    </div >
  );
}

export default App;
