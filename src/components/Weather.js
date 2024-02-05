import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';


const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'd8f1434681e7abb1f2ef43edf0b1a8cf'; // Remplacez par votre propre clé API

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <h2>Application de météo</h2>

      <div className='input-group'></div>
    
      <input
        type="text"
        placeholder="Entrer nom de la ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Obtenir la météo</button>

      {weatherData && (
        <div>
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Weather;
