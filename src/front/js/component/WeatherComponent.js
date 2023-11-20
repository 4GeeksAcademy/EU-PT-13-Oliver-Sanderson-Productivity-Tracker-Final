import React, { useEffect, useState } from "react";
import "../../styles/WeatherComponent.css";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("");
  const API_KEY = "8e4829afec1271022eea76f442a51da2";

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
          );
          const data = await response.json();
          setWeatherData({
            location: data.name,
            current: {
              temp_c: data.main.temp,
              condition: {
                text: data.weather[0].description
              }
            }
          });
        } catch (error) {
          console.log("Error fetching weather data:", error);
        }
      };

      fetchData();
    }
  }, [search]);

  return (
    <div className=" h-100 p-5 bg-body-tertiary border rounded-3 custom-container weather-box">
      <h2 className="box-heading">Weather Information</h2>
      <div>
        <input
          type="text"
          placeholder="Enter city/town..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {weatherData ? (
        <div>
          <p>Location: {weatherData.location}</p>
          <p>Current Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;