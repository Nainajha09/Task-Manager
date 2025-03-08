import React, { useEffect, useState } from 'react';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [city, apiKey]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  );
};

export default Weather;