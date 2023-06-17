import * as React from "react";
import { useEffect } from "react";
import Search from "./Search";

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
			})
			.catch((error) => {
				// Handle the error
				setFoundCity(false);
				console.error(error);
			});

		if (!data) {
			return;
		}

		console.log("Data", data);
		console.log("Data location", data.results[0].geometry.location);
		const address = data.results[0].formatted_address;
		const lat = data.results[0].geometry.location.lat;
		const long = data.results[0].geometry.location.lng;
		setCity({ address: address, lat: lat, long: long });
		console.log(city);
	}, [location]);

	return (
		<>
			<h1 className="text-center font-bold text-3xl text-sky-400">
				Home
			</h1>
			<Search location={setLocation}></Search>
		</>
	);
};

export default Home;
