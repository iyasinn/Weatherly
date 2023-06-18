import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ latitude, longitude }) => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`
        );
        setTemperature(response.data.hourly.temperature_2m);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  if (loading) {
    return <div>Loading weather...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Weather</h2>
      <p>Temperature: {temperature}°C</p>
    </div>
  );
};

export default Weather;
