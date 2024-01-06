import './index.css';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

const validCities = ['New York', 'London', 'Tokyo', 'Paris', 'Berlin', 'Accra', 'Ghana', 'Texas', 'Nigeria', 'Manchester'];

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '80f4585162cebc24d19b8950a7836e9f';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    const fetchData = async () => {
      if (city) {
        try {
          setError(null);
          setLoading(true);
          const response = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}`);
          setWeatherData(response.data);
        } catch (err) {
          setError('City not found. Please enter a valid city.');
          setWeatherData(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setWeatherData(null); // Clear previous weather data
  };

  return (
    <div className="app">
      <h1>Elvis Weather App</h1>
      <form onSubmit={handleSubmit}>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="" disabled>Select a city</option>
          {validCities.map((validCity) => (
            <option key={validCity} value={validCity}>
              {validCity}
            </option>
          ))}
        </select>
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p className="loading">Fetching weather data...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
