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
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max`
        );

        const { temperature_2m_min, temperature_2m_max } = response.data.daily;

        setTemperature({ min: temperature_2m_min, max: temperature_2m_max });
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchWeather();
    }
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
      {temperature && (
        <>
          <p>Min Temperature: {temperature.min}°C</p>
          <p>Max Temperature: {temperature.max}°C</p>
        </>
      )}
    </div>
  );
};

export default Weather;
