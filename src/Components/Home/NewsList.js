import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import "./NewsItem.css";

const NEWS_API_KEY = "d78602ccc6c849b7900591b675cda0df";

const NewsList = ({ cityName }) => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const getArticles = async () => {
			if (cityName) {
				const response = await axios.get(
					`https://newsapi.org/v2/everything?q=${cityName}&apiKey=${NEWS_API_KEY}`
				);
				console.log(response);
				setArticles(response.data.articles);
			}
		};
		getArticles();
	}, [cityName]);

	return (
		<div className="w-fit">
			<p className="text-3xl mb-3 text-sky-400 font-bold text-center">
				News for {cityName}
			</p>
			<div className="news-app">
				{articles.map((article, index) => {
					return (
						<NewsItem
							key={index}
							title={article.title}
							description={article.description}
							url={article.url}
							urlToImage={article.urlToImage}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default NewsList;
