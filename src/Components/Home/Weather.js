

const axios = require('axios');

async function getWeather(latitude, longitude) {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m');
    const weatherData = response.data;
    const hourlyTemperature = weatherData.hourly.temperature_2m;
    return hourlyTemperature;
  } catch (error) {
    console.error('Error retrieving weather:', error);
    throw error;
  }
}

module.exports = {
  getWeather
};
