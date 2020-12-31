import './App.css';


const api = {
key: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

// Full date of current day - Thu Dec 31 2020 12:27:40 GMT+0100 - wrong format
const fullDate = new Date();

// Spefication of how to display the weekday or month (long, short, numeric)
const date = { day: 'numeric' };
const weekday = { weekday: 'long' };
const month = { month: 'long' };

// new Intl.DateTimeFormat([locales[, options]]) - makes it possible to define properties and methods for all objects.
// Passing in fullDate as format - date, weekday, month as options
const currentDate = new Intl.DateTimeFormat('en-US', date).format(fullDate);
const currentDay = new Intl.DateTimeFormat('en-US', weekday).format(fullDate);
const currentMonth = new Intl.DateTimeFormat('en-US', month).format(fullDate);

console.log(currentDate);
console.log(currentDay);
console.log(currentMonth);

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
