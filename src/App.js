import "./App.css";
import dateMaker from "./dateMaker.js";
import React, { useState, useEffect } from "react";

export default function App() {
  const api = {
    key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  // array destructuring syntax
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [time, setTime] = useState(new Date());

  useState(() => {
    const timeTick = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return clearInterval(timeTick);
  }, [time]);

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setQuery("");
        });
    }
  };

  const fetchWeatherByCoordinates = (lat, lon) => {
    fetch(
      `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setQuery("");
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      const latitude = data.coords.latitude;
      const longitude = data.coords.longitude;
      fetchWeatherByCoordinates(latitude, longitude);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        // typeof weather.main != "undefined"
        // ? weather.main.temp > 16
        time.getHours() < 18 ? "app warm" : "app"
        // : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}
                {/* <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="weather-icon"
                /> */}
              </div>
              <div className="date">{dateMaker()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
