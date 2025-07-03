import React from "react";
import "./WeatherCard.css";

export default function WeatherCard({ day, onClick }) {
    const date = new Date(day.dt * 1000).toLocaleDateString();

    return (
        <div className="weather-card" onClick={() => onClick(day)}>
            <p className="weather-date">{date}</p>
            <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="weather-icon"
            />
            <p className="weather-temp">{Math.round(day.temp.day)}°C</p>
            <p className="weather-main">{day.weather[0].main}</p>
            <p className="weather-wind">Wind: {day.wind_speed} m/s</p>
        </div>
    );
}
