import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=74a15d821faa3333bb27160a8d424607`);
      setWeatherData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input 
        type="text" 
        value={city} 
        onChange={e => setCity(e.target.value)} 
        placeholder="Enter city name" 
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

