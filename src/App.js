import "./App.css";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Settings from "./Components/Settings/Settings";

function App() {
	const [page, setPage] = useState("Login");

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
