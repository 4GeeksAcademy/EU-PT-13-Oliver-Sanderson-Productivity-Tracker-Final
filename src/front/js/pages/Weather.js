
import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weatherInfo, setWeatherInfo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeatherByLocation = async () => {
      try {
        
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          
          const apiUrl = `http://localhost:3001/weather?lat=${latitude}&lon=${longitude}`;

          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.cod === '404') {
            setWeatherInfo(`City not found: ${data.message}`);
          } else {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            setWeatherInfo(`Temperature: ${temperature}°C, Description: ${description}`);
          }

          setLoading(false);
        });
      } catch (error) {
        setWeatherInfo(`Error: ${error.message}`);
        setLoading(false);
      }
    };

    getWeatherByLocation();
  }, []);

  return (
    <div>
      <h5>Weather By Location</h5>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>{weatherInfo}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
