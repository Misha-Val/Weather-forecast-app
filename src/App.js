import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import "./App.css";

const API_KEY = "6bf4d7f1db9a4a8eb21055cff508a689";
const GEO_API = "http://api.openweathermap.org/geo/1.0/direct";
const ONE_CALL_API = "https://api.openweathermap.org/data/3.0/onecall";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const fetchWeather = async () => {
    try {
      const geoRes = await axios.get(GEO_API, {
        params: { q: city, limit: 1, appid: API_KEY },
      });
      const { lat, lon } = geoRes.data[0];

      const weatherRes = await axios.get(ONE_CALL_API, {
        params: {
          lat,
          lon,
          exclude: "minutely,hourly,alerts",
          units: "metric",
          appid: API_KEY,
        },
      });

      setWeatherData(weatherRes.data);
      setSelectedDay(null);
    } catch (err) {
      alert("City not found or API error.");
    }
  };

  return (
      <div className="app-container">
        <header className="app-header">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="app-title">WeatherView</h1>
        </header>

        <div className="input-group">
          <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="city-input"
          />
          <button onClick={fetchWeather} className="search-button">
            Search
          </button>
        </div>

        {weatherData && !selectedDay && (
            <div className="cards-grid">
              {weatherData.daily.slice(0, 8).map((day, idx) => (
                  <WeatherCard key={idx} day={day} onClick={() => setSelectedDay(day)} />
              ))}
            </div>
        )}

        {selectedDay && (
            <div className="detail-wrapper">
              <button className="back-button" onClick={() => setSelectedDay(null)}>
                ← Back
              </button>
              <WeatherDetails day={selectedDay} />
            </div>
        )}
      </div>
  );
}

export default App;