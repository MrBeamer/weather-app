import "./App.css";
import dateMaker from "./dateMaker.js";
import React, { useState, useEffect } from "react";
import Loader from "./Loader.js";

export default function App() {
  const api = {
    key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  // const [errMessage, setErrMessage] = useState("");

  useState(() => {
    const timeTick = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return clearInterval(timeTick);
  });

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => {
          if (!response.ok) {
            throw Error("Invalid city or country, please try again.");
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.log(error);
          // setErrMessage(error);
        })
        .finally(() => {
          setLoading(false);
          setQuery("");
          document.querySelector("input").blur();
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
      })
      .catch((error) => {
        console.log("Location not found, please hare your location");
      })
      .finally(() => {
        setLoading(false);
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

  if (loading) {
    return <Loader time={time.getHours()} />;
  }

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
        {/* <p className="error">
          {errMessage.toString().split(" ").slice(1).join(" ")}
        </p> */}
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
