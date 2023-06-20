import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Forecast.css";

const WEATHER_API_KEY = "50628e2cb3eaad072070ad14c6d05824";

const Forecast = ({ lat, lon }) => {
	const [forecastData, setForecastData] = useState([]);

	useEffect(() => {
		if (lat && lon) {
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
				)
				.then((response) => {
					const data = response.data.list;
					const dailyData = data.filter(
						(value, index) => index % 8 === 0
					);
					setForecastData(dailyData);
				})
				.catch((error) => console.error("Error getting forecast data"));
		}
	}, [lat, lon]);

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	return (
		<div className="forecast-container flex">
			{/* <div className="forecast-title">Daily Forecast</div> */}
			{forecastData.map((forecast, index) => {
				const date = new Date(forecast.dt * 1000);
				const day = date.getDay();
				const dayOfWeek = index === 0 ? "Today" : days[day];
				const weath = forecast.weather[0].main;
				console.log("Forecast", forecast);
				return (
					<div className={"forecast-card " + weath} key={forecast.dt}>
						<p>{dayOfWeek}</p>
						<p>{forecast.main.temp}</p>
						<p>{weath}</p>
					</div>
				);
			})}
			{/* {forecastData.map((forecast, index) => {
            const date = new Date(forecast.dt * 1000);
            const day = date.getDay();
            const dayOfWeek = (index === 0) ? 'Today' : days[day];
            
            return(
                <div key = {index} className="forecast-day">
                    <h3>{dayOfWeek}</h3>
                    <img alt="weather icon" src={`icons/${forecast.weather[0].icon}.png`} />
                    <p>{forecast.weather[0].description}</p>
                    <p>{Math.round(forecast.main.temp)}°C</p>
                </div>
            )
        })} */}
		</div>
	);
};

export default Forecast;
