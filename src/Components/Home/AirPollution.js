import React, { useEffect, useState } from "react";
import axios from "axios";

const AirPollution_KEY = '50628e2cb3eaad072070ad14c6d05824'
const AirPollution = ({ lat, lon }) => {
const [currentAirPollution, setCurrentAirPollution] = useState(null);

  useEffect(() => {
    if (lat && lon) {
      axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${AirPollution_KEY}`)
      .then(response => setCurrentAirPollution(response.data.list[0]))
      .catch(error => console.error("Error fetching air data:", error));
    }
  }, [lat, lon]);

  if (!currentAirPollution) {
    return <p>Loading...</p>;
  }

  console.log("air pol", currentAirPollution);

  const { main: { aqi }, components } = currentAirPollution;

  return (
    <>
       
    </>
  );


}  

export default AirPollution;