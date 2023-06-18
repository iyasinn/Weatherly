import "./App.css";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Settings from "./Components/Settings/Settings";

function App() {
	const [page, setPage] = useState("Home");

	const renderPage = (page) => {
		return <Home></Home>;
	};

	return (
		<>
			<Navbar></Navbar>
			{renderPage(page)}
		</>
	);
}

export default App;
