import { useState } from "react";
import classes from "./Forecast.module.css";
import { getCity5DayForecast, getCityCoords } from "../functions/api";
import { transformWeatherData } from "../functions/transformData";

const Forecast = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchedCityForecast, setSearchedCityForecast] = useState(null);
  const [showData, setShowData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleBlur = (event) => {
    setInputValue(event.target.value);
  };

  const handleForecast = async () => {
    if (inputValue.length === 0) {
      return;
    }
    const cityData = await getCityCoords(inputValue);
    if (cityData.length === 0) {
      return;
    }
    const { lat: latitude, lon: longitude } = cityData[0];
    const cityForecast = await getCity5DayForecast(latitude, longitude);
    const data = transformWeatherData(cityForecast);
    setSearchedCityForecast(data);
    setShowData(true);
    setCurrentPeriod("00:00:00");
  };

  const renderData = () => {
    if (!showData) {
      return null;
    }

    return (
      <div className={classes.gridFilter}>
        <div className={classes.titleStyle}>
          <label>Period</label>
          <button onClick={toggleDropdown} className={classes.dropdownButton}>
            {currentPeriod}
          </button>
          {isOpen && (
            <div className={classes.listStyle} onClick={closeDropdown}>
              <ul className={classes.ulStyle}>
                {searchedCityForecast.weatherForecastList[0].items.map(
                  (element) => {
                    return (
                      <li
                        className={classes.listItem}
                        onClick={() => {
                          setCurrentPeriod(element.dt_txt.split(" ")[1]);
                        }}
                      >
                        {element.dt_txt.split(" ")[1]}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          )}
        </div>
        <div className={classes.gridContainer}>
          <div key={searchedCityForecast.name} className={classes.gridItem}>
            {searchedCityForecast.name},&nbsp;{searchedCityForecast.country}
          </div>
          <div key="Temperature" className={classes.gridItem}>
            Temperature
          </div>
          <div key="Humidity" className={classes.gridItem}>
            Humidity
          </div>
          <div key="Pressure" className={classes.gridItem}>
            Pressure
          </div>
          <div key="Wind speed" className={classes.gridItem}>
            Wind speed
          </div>
          {searchedCityForecast.weatherForecastList.map((day) => {
            const index = day.items.findIndex(
              (element) => element.dt_txt.split(" ")[1] === currentPeriod
            );

            return index === -1 ? null : (
              <>
                <div key={day.dayName} className={classes.gridItem}>
                  {day.dayName}
                </div>
                <div
                  key={day.items[index].main.temp}
                  className={classes.gridItem}
                >
                  {(day.items[index].main.temp - 273.15).toFixed(2)}&nbsp;°C
                </div>
                <div
                  key={day.items[index].main.humidity}
                  className={classes.gridItem}
                >
                  {day.items[index].main.humidity}%
                </div>
                <div
                  key={day.items[index].main.pressure}
                  className={classes.gridItem}
                >
                  {day.items[index].main.pressure}&nbsp;hPa
                </div>
                <div
                  key={day.items[index].wind.speed}
                  className={classes.gridItem}
                >
                  {day.items[index].wind.speed}&nbsp;km/h
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.mainForestCastDiv}>
      <div className={classes.searchBarDiv}>
        <label htmlFor="text-input" style={{ color: "black", fontWeight: 700 }}>
          Enter city name for a 5 day weather forecast
        </label>
        <input
          type="text"
          id="text-input"
          className={classes.searchBarInputStyle}
          onBlur={handleBlur}
        />
        <button
          className={classes.searchBarSubmitButton}
          onClick={handleForecast}
        >
          SHOW FORECAST
        </button>
      </div>
      <div className={classes.forecastDataDiv}>{renderData()}</div>
    </div>
  );
};

export default Forecast;
