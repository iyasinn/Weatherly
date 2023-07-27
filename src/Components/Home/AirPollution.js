import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AirPollution.css"

const AirPollution_KEY = '50628e2cb3eaad072070ad14c6d05824'
const AirPollution = (props) => {
const {lat,lon, currentAirPollution, setCurrentAirPollution} = props

  useEffect(() => {
    if (lat && lon) {
      axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${AirPollution_KEY}`)
      .then(response => setCurrentAirPollution(response.data.list[0]))
      .catch(error => console.error("Error fetching air data:", error));
    }
  }, [lat, lon]);

  if (!currentAirPollution) {
    return;
  }

  console.log("air pol", currentAirPollution);
  // const { main: { Qualitativen }, sys: { clear, smog } } = currentAirPollution;

  let quality = "good";
  let color = "bg-white"
  const aqi = currentAirPollution.main.aqi;
  if (aqi <= 3){
    quality = "Good";
    color = "bg-teal-400";
  }
  else if (aqi <= 4){ quality = "Moderate"; color = "bg-emerald-600"; }
  else if (aqi <= 6){ quality = "Unhealthy for Sensitive Groups"; color = "bg-yellow-400";}
  else if (aqi <= 7){ quality = "Unhealthy"; color = "bg-yellow-800";}
  else if (aqi <= 9){ quality = "Very Unhealthy"; color = "bg-red-400"; }
  else if (aqi <= 10){ quality = "Hazardous"; color="bg-red-950" }

  // const comp = currentAirPollution.components;


  return ( 
    <>
      <div className={color + " text-white air text-center"}>
        <h1>Air Quality:</h1><solid>{quality}</solid>
      </div>

    </>
  );


}

export default AirPollution;