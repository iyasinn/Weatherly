import * as React from "react";
import { useEffect } from "react";
import Search from "./Search";
import NewsList from "./NewsList";

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
				
				const addressComponents = rData.results[0].address_components;
				let cityName;

				for (let i = 0; i < addressComponents.length; i++) {
					if (addressComponents[i].types.includes("locality")) {
						cityName = addressComponents[i].long_name;
						break;
					}
				}

				setCity({ address: address, lat: lat, long: long, name: cityName });
			})
			.catch((error) => {
				// Handle the error
				setFoundCity(false);
				console.error(error);
			});
	}, [location]);

	return (
		<>
			<h1 className="text-center font-bold text-3xl text-sky-400">
				Home
			</h1>
			<Search location={setLocation}></Search>
			{city.name && <NewsList cityName={city.name} />}

		</>
	);
};

export default Home;
