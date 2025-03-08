
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { login, logout } from './redux/actions';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('New York'); // Default location

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
    if (isLoggedIn) {
      dispatch(login());
    }
  }, [dispatch]);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    dispatch(login());
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    dispatch(logout());
  };

  const fetchWeather = async (location) => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleAddTask = (task) => {
    if (task.text.toLowerCase().includes('outdoor')) {
      fetchWeather(location); // Fetch weather if the task is related to outdoor activities
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {isAuthenticated ? (
        <>
          <TaskInput onAddTask={handleAddTask} />
          <TaskList />
          {weather && (
            <div>
              <h2>Weather in {weather.name}</h2>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Condition: {weather.weather[0].description}</p>
            </div>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default App;