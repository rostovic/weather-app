import { useState } from "react";
import classes from "./Forecast.module.css";
import { getCity5DayForecast, getCityCoords } from "../functions/api";
import { transformWeatherData } from "../functions/transformData";

const Forecast = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchedCityForecast, setSearchedCityForecast] = useState(null);
  const [showData, setShowData] = useState(false);

  const handleBlur = (event) => {
    setInputValue(event.target.value);
  };

  const handleForecast = async () => {
    const cityData = await getCityCoords(inputValue);
    if (cityData.length === 0) {
      return;
    }
    const { lat: latitude, lon: longitude } = cityData[0];
    const cityForecast = await getCity5DayForecast(latitude, longitude);
    const data = transformWeatherData(cityForecast);
    // console.log(cityForecast);
    console.log(data);
    setSearchedCityForecast(data);
    setShowData(true);
  };

  const renderData = () => {
    if (!showData) {
      return null;
    }
    // return searchedCityForecast.map((day) => {
    //   return <div className={classes.singleDayForecast}></div>;
    // });
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
