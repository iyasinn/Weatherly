import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AirPollution.css";

const AirPollution_KEY = '50628e2cb3eaad072070ad14c6d05824'
const AirPollution = ({ lat, lon, cityName }) => {
const [currentAirPollution, setCurrentAirPollution] = useState(null);

  useEffect(() => {
    if (lat && lon) {
      axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={AirPollution_KEY}`)
      .then(response => setCurrentAirPollution(response.data))
      .catch(error => console.error("Error fetching air data:", error));
    }
  }, [lat, lon]);

  if (!currentAir) {
    return <p>Loading...</p>;
  }

  const { main: { temp, feels_like, humidity, pressure }, weather, wind, sys: { sunrise, sunset } } = currentWeather;

  

export default AirPollution;








