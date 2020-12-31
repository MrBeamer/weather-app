import './App.css';
import dateMaker from "./components/dateMaker.js"
import React, { useState } from 'react';


const api = {
key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

   const queryState = useState( '' );
   const query = queryState[0]; // Contains ''
   const setQuery = queryState[1]; // It’s a function

   const weatherState = useState( {} );
   const weather = weatherState[0]; // Contains ''
   const setWeather = weatherState[1]; // It’s a function


     const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(data => {
          setWeather(data);
          setQuery('');
          console.log(data);
          console.log(data.name);
          console.log(data.main.temp);
          console.log(data.sys.country);
        });
    }
  }

  // getting weather by coordinates
const fetchWeatherByCoordinates = (lat, lon) => {
  fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then((data) => {
      setWeather(data);
      console.log(data);
      });
    }


// nav and coordinates
navigator.geolocation.getCurrentPosition((data) => {
  const latitude = data.coords.latitude;
  const longitude = data.coords.longitude;
  fetchWeatherByCoordinates(latitude, longitude);
});



  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="location-box">
          <div className="location">
            Berlin, Germany
          </div>
          <div className="date">
            {dateMaker()}
          </div>
        </div>
        <div className="weather-box">
          <div className="temp">
            4°C
          </div>
          <div className="weather">
            sunny
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

