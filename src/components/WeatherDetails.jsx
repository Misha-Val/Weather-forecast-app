import React from "react";
import "./WeatherDetails.css";

export default function WeatherDetails({ day }) {
    const date = new Date(day.dt * 1000).toLocaleDateString();

    return (
        <div className="weather-details">
            <h2>{date}</h2>
            <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`}
                alt={day.weather[0].description}
            />
            <ul>
                <li><strong>Description:</strong> {day.weather[0].description}</li>
                <li><strong>Day Temp:</strong> {day.temp.day}°C</li>
                <li><strong>Night Temp:</strong> {day.temp.night}°C</li>
                <li><strong>Feels Like:</strong> {day.feels_like.day}°C</li>
                <li><strong>Humidity:</strong> {day.humidity}%</li>
                <li><strong>Pressure:</strong> {day.pressure} hPa</li>
                <li><strong>Wind Speed:</strong> {day.wind_speed} m/s</li>
                <li><strong>UV Index:</strong> {day.uvi}</li>
                <li><strong>Cloudiness:</strong> {day.clouds}%</li>
            </ul>
        </div>
    );
}
