const api = {
key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
base: "https://api.openweathermap.org/data/2.5/"
}

  // getting weather by coordinates
const fetchWeatherByCoordinates = (lat, lon) => {
  fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      return data.name
      });
    }


// nav and coordinates
navigator.geolocation.getCurrentPosition((data) => {
  const latitude = data.coords.latitude;
  const longitude = data.coords.longitude;
  fetchWeatherByCoordinates(latitude, longitude);
  // let tenMinutes = 600000;
  // setInterval(fetchWeatherByCoordinates(latitude, longitude), tenMinutes);
});
