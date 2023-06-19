import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

const WEATHER_API_KEY = '50628e2cb3eaad072070ad14c6d05824'
const Weather = ({ lat, lon, cityName, func}) => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if (lat && lon) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      .then(response => setCurrentWeather(response.data))
      .catch(error => console.error("Error fetching weather data:", error));
    }
  }, [lat, lon]);

  if (!currentWeather) {
    return;
  }

  const { main: { temp, feels_like, humidity, pressure }, weather, wind, sys: { sunrise, sunset } } = currentWeather;

  const currentTime = new Date().getTime() / 1000;
  let backgroundStyle = {};

  if (currentTime >= sunrise && currentTime < sunset) {
    backgroundStyle = { backgroundColor: 'skyblue' };
    func("morning");
  } else {
    backgroundStyle = { backgroundColor: 'grey' };
    func("night");
  }

  return (
    <div className="weather" style={backgroundStyle}>
      <div className="top">
        <div>
          <p className="city">{cityName}</p>
          <p className="weather-description">{weather[0].description}</p>
        </div>
        <img alt="weather" className="weather-icon" src={`icons/${weather[0].icon}.png`}></img>
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value"> {Math.round(feels_like)} °C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value"> {wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value"> {humidity} %</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value"> {pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
