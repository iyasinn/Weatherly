import * as React from "react";
import { useEffect } from "react";
import Search from "./Search";
import NewsList from "./NewsList";
import Weather from "./Weather";
import Forecast from "./Forecast";
import "./Home.css";
import AirPollution from "./AirPollution";

async function fetchGeocode(placeId, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching geocode:", error);
    return null;
  }
}

const Home = () => {
  const [location, setLocation] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [city, setCity] = React.useState({});
  const [foundCity, setFoundCity] = React.useState(false);
  const [day, setDay] = React.useState("morning");

  useEffect(() => {
    const apiKey = "AIzaSyAC0Sehx-7YO-Gx4AzBPdfzsuRwVNmU150";
    // console.log("Update");

    if (!location) {
      return;
    }

    fetchGeocode(location.place_id, apiKey)
      .then((rData) => {
        // Handle the geocode response data
        setData(rData);
        setFoundCity(true);

        console.log("Data", rData);
        console.log("Data location", rData.results[0].geometry.location);
        const address = rData.results[0].formatted_address;
        const lat = rData.results[0].geometry.location.lat;
        const long = rData.results[0].geometry.location.lng;

        console.log("lat:", lat); // Add this
        console.log("lon:", long); // Add this

        const addressComponents = rData.results[0].address_components;
        let cityName;

        for (let i = 0; i < addressComponents.length; i++) {
          if (addressComponents[i].types.includes("locality")) {
            cityName = addressComponents[i].long_name;
            break;
          }
        }
        setCity({ address: address, lat: lat, lon: long, name: cityName });
      })
      .catch((error) => {
        setFoundCity(false);
        console.error(error);
      });
  }, [location]);

  return (
    <div className={"realHome " + (day === "morning" ? "morning" : "night")}>
      <Search location={setLocation}></Search>
      <div className="flex justify-around mb-8">
        <div></div>
        <div></div>
        <div className="">
          {city && (
            <Weather lat={city.lat} lon={city.lon} cityName={city.name} func={setDay} />
          )}
        </div>
        <div>{city && <AirPollution lat={city.lat} lon={city.lon} />}</div>
        <div></div>
        <div></div>
      </div>
      {city.lat && city.lon && <Forecast lat={city.lat} lon={city.lon} />}
      {/* {city.name && <h3 className="news-title">News:</h3>} */}
      {city.name && <NewsList cityName={city.name} />}
    </div>
  );
};

export default Home;
