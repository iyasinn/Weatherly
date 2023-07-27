import React, { useEffect, useState } from "react";
import axios from "axios";
import { OpenAIApi } from "openai";


const API_KEY = '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';

const Summary = ({ weatherData, airPollutionData, cityName }) => {
    const [summary, setSummary] = useState("");

    useEffect(() =>{
        if (weatherData && airPollutionData) {
            const prompt = `The weather in ${cityName} is ${weatherData.weather[0].description} with a temperature of ${weatherData.main.temp}°C. The air quality is ${airPollutionData.main.aqi}. Summarize this information in a friendly, concise manner and also give suggestions for the day.`;
            const headers = {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            };
            console.log(headers);
            
            axios.post(
                'https://api.openai.com/v1/completions',
                {
                    model:  "text-davinci-003",
                    prompt: prompt,
                    max_tokens: 100,
                },
                {
                    headers: headers
                }
            )
            .then(response => {
                setSummary(response.data.choices[0].text.trim());
            })
            .catch(err => console.error(err));
        }
    }, [weatherData, airPollutionData]);

    return (
        <div>
            <h1> Summary: </h1>
            <p>{summary}</p>
        </div>
    );
};

export default Summary;

