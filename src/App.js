import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const api = {
  key: "f8d6436f7da67f398196a8c5489d4176",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const searchPressed = (event) => {
    if (event.key === "Enter") {
      axios
        .get(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((result) => {
          setWeather(result.data);
        });

      // fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      //   .then((res) => res.json())
      //   .then((result) => {
      //     setWeather(result);
      //   });
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value, " ");
      console.log(search);
    }
  };

  const handleDate = () => {
    return date.toLocaleString("en-EN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  return (
    <div className="container">
      <header>
        <input
          type="text"
          placeholder="Enter city/town..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={searchPressed}
          className="inp"
        />
        <p>{handleDate()}</p>
      </header>

      {typeof weather.main !== "undefined" && search !== "" ? (
        <div className="Data">
          {/* Location  */}
          <div className="location">
            <p>Name: {weather.name}</p>

            <p>Country: {weather.sys.country}</p>
          </div>
          {/* Temperature Celsius  */}
          <div className="temp">
            <p>Temp: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}°C</p>
          </div>
          {/* Condition (Sunny ) */}
          <div className="condition">
            <h1>{weather.weather[0].main}</h1>
            <p>({weather.weather[0].description})</p>
          </div>
          {/* Wind */}
          <div className="wind">
            <p>Wind speed: {weather.wind.speed}mph</p>
            <p>Wind deg: {weather.wind.deg}°</p>
            <p>Wind gust: {weather.wind.gust}k</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
