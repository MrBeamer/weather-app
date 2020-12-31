import React from "recat";


const Forecast = () => {

function getForecast(){
fetch("https://api.openweathermap.org/data/2.5/weather?q=${event}&units=metric&appid=4a3065399c93745d85ce97fb2729d147")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
});

}

return(
  <div>
    <h2>Find Current Weather Conditions</h2>
    <div>
      {JSON.stringify(responseObj)}
    </div>
    <button onClick={getForecast}>Get Forecast</button>
  </div>
  );

}


export default Forecast;
