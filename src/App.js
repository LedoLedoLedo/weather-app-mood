import React, { useState } from "react";
// import warmpic from "./Images/kansas-city-dentist-summer-heat.jpeg";
// import Axios from "Axios"

const api = {
  key: "4f0e9ab198c06f612c6d248b4dc785ab",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <a className="dogBtn" href="https://random.dog/" target="_blank">
        mood enhancer
      </a>
      <main>
        <div className="widget">
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
            <div className="infoContainer">
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°f</div>
                <div className="weather">
                  {/* <div className="weather">{weather.weather[0].icon}</div> */}
                  <img
                    src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                    alt="icon"
                  />
                </div>
                <div className="weather">{weather.weather[0].description}</div>
              </div>
              <div>
                <p></p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
