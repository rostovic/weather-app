import { Fragment, useState } from "react";
import classes from "./Forecast.module.css";
import { getCity5DayForecast, getCityCoords } from "../functions/api";
import { transformWeatherData } from "../functions/transformData";

const Forecast = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchedCityForecast, setSearchedCityForecast] = useState(null);
  const [showData, setShowData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [errorText, setErrorText] = useState(null);

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
    if (!cityData) {
      setErrorText("No city data. Try again.");
      return;
    }
    const { lat: latitude, lon: longitude } = cityData[0];
    const cityForecast = await getCity5DayForecast(latitude, longitude);
    if (!cityForecast) {
      setErrorText("No forecast data. Try again.");
      return;
    }
    const data = transformWeatherData(cityForecast);
    setSearchedCityForecast(data);
    setShowData(true);
    setCurrentPeriod("00:00:00");
  };

  const renderError = () => {
    if (!errorText) {
      return;
    }
    return <p>{errorText}</p>;
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

            const hasData = index !== -1;
            // let shouldHighlightTemp = false;
            const temp = hasData
              ? `${(day.items[index].main.temp - 273.15).toFixed(2)} °C`
              : "N/A";

            // if (hasData && 21 > 20) {
            //   shouldHighlightTemp = true;
            // }

            const humidity = hasData
              ? `${day.items[index].main.humidity} %`
              : "N/A";

            const pressure = hasData
              ? `${day.items[index].main.pressure} hPa`
              : "N/A";

            const kmh = hasData ? `${day.items[index].wind.speed} km/h` : "N/A";

            return (
              <Fragment key={day.dayName}>
                <div className={classes.gridItem}>{day.dayName}</div>
                <div className={classes.gridItem}>{temp}</div>
                <div className={classes.gridItem}>{humidity}</div>
                <div className={classes.gridItem}>{pressure}</div>
                <div className={classes.gridItem}>{kmh}</div>
              </Fragment>
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
          onFocus={() => setErrorText(null)}
        />
        <button
          className={classes.searchBarSubmitButton}
          onClick={handleForecast}
        >
          SHOW FORECAST
        </button>
        {renderError()}
      </div>
      <div className={classes.forecastDataDiv}>{renderData()}</div>
    </div>
  );
};

export default Forecast;
