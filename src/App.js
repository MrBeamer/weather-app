import './App.css';


const api = {
key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

const dateMaker = (day) =. {

}

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder="Search"
          />
        </div>
        <div className="location-box">
          <div className="loaction">Berlin, Germany</div>
          <div className="date">(dateMaker(new Date()))</div>
        </div>
      </main>
    </div>
  );
}

export default App;
