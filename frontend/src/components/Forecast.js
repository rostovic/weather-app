import { Fragment, useState } from "react";
import classes from "./Forecast.module.css";
import { getCity5DayForecast, getCityCoords } from "../functions/api";
import { transformWeatherData } from "../functions/transformData";
import BarChart from "./BarChart";

const Forecast = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchedCityForecast, setSearchedCityForecast] = useState(null);
  const [showData, setShowData] = useState(false);
  const [isOpenPeriod, setIsOpenPeriod] = useState(false);
  const [isOpenDay, setIsOpenDay] = useState(false);
  const [isOpenProperty, setIsOpenProperty] = useState(false);
  const [filter, setFilter] = useState({
    day: "all",
    period: "all",
    prop: "-",
  });
  const [errorText, setErrorText] = useState(null);

  const filterData = () => {
    if (!searchedCityForecast) {
      return;
    }
    let filteredDays = [];
    for (const day of searchedCityForecast.weatherForecastList) {
      const dayName = day.dayName;
      if (filter.day === "all") {
        filteredDays.push({ ...day });
        continue;
      }
      if (filter.day === dayName) {
        filteredDays.push({ ...day });
      }
    }

    if (filter.period !== "all") {
      for (const day of filteredDays) {
        let filteredPeriod = day.items.find(
          (period) => period.dt_txt.split(" ")[1] === filter.period
        );
        if (filteredPeriod) {
          day.items = [filteredPeriod];
        } else {
          day.items = [];
        }
      }
    }

    return filteredDays;
  };

  let filteredData = filterData();

  const toggleDropdownPeriod = () => {
    setIsOpenPeriod(!isOpenPeriod);
  };

  const closeDropdownPeriod = () => {
    setIsOpenPeriod(false);
  };

  const toggleDropdownDay = () => {
    setIsOpenDay(!isOpenDay);
  };

  const closeDropdownDay = () => {
    setIsOpenDay(false);
  };

  const toggleDropdownProperty = () => {
    setIsOpenProperty(!isOpenProperty);
  };

  const closeDropdownProperty = () => {
    setIsOpenProperty(false);
  };

  const handleBlur = (event) => {
    setInputValue(event.target.value);
  };

  const handleForecast = async () => {
    if (inputValue.length === 0) {
      return;
    }
    const cityData = await getCityCoords(inputValue);
    if (!cityData || cityData.length === 0) {
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
      <div
        className={classes.gridFilter}
        style={{
          height:
            filter.day !== "all" && filter.period !== "all" ? "14rem" : null,
        }}
      >
        <div style={{ display: "flex", width: "80%" }}>
          <div className={classes.titleStyle}>
            <div className={classes.singleFilterDiv}>
              <label>Period</label>
              <button
                onClick={toggleDropdownPeriod}
                className={classes.dropdownButton}
              >
                {filter.period}
              </button>

              {isOpenPeriod && (
                <div className={classes.listStyle}>
                  <ul className={classes.ulStyle}>
                    <li
                      className={classes.listItem}
                      onClick={() => {
                        closeDropdownPeriod();
                        setFilter({
                          day: filter.day,
                          period: "all",
                          prop: filter.prop,
                        });
                      }}
                    >
                      all
                    </li>
                    {searchedCityForecast.weatherForecastList[0].items.map(
                      (element) => {
                        const data = element.dt_txt.split(" ")[1];
                        return (
                          <li
                            key={data}
                            className={classes.listItem}
                            onClick={() => {
                              closeDropdownPeriod();
                              setFilter({
                                day: filter.day,
                                period: data,
                                prop: filter.prop,
                              });
                            }}
                          >
                            {data}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className={classes.singleFilterDiv}>
              <label>Day</label>
              <button
                className={classes.dropdownButton}
                onClick={toggleDropdownDay}
              >
                {filter.day}
              </button>
              {isOpenDay && (
                <div className={classes.listStyle}>
                  <ul className={classes.ulStyle}>
                    <li
                      className={classes.listItem}
                      onClick={() => {
                        closeDropdownDay();
                        setFilter({
                          day: "all",
                          period: filter.period,
                          prop: filter.prop,
                        });
                      }}
                    >
                      all
                    </li>
                    {searchedCityForecast.weatherForecastList.map((day) => {
                      const dayName = day.dayName;
                      return (
                        <li
                          key={dayName}
                          className={classes.listItem}
                          onClick={() => {
                            closeDropdownDay();
                            setFilter({
                              day: dayName,
                              period: filter.period,
                              prop: filter.prop,
                            });
                          }}
                        >
                          {dayName}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div className={classes.singleFilterDiv}>
              <label>Property</label>
              <button
                className={classes.dropdownButton}
                onClick={toggleDropdownProperty}
              >
                {filter.prop}
              </button>
              {isOpenProperty && (
                <div className={classes.listStyle}>
                  <ul className={classes.ulStyle}>
                    <li
                      className={classes.listItem}
                      onClick={() => {
                        closeDropdownProperty();
                        setFilter({
                          day: filter.day,
                          period: filter.period,
                          prop: "-",
                        });
                      }}
                    >
                      -
                    </li>

                    <li
                      key="Temperature"
                      className={classes.listItem}
                      onClick={() => {
                        closeDropdownProperty();
                        setFilter({
                          day: filter.day,
                          period: filter.period,
                          prop: "Temperature",
                        });
                      }}
                    >
                      Temperature
                    </li>
                    <li
                      key="Humidity"
                      className={classes.listItem}
                      onClick={() => {
                        closeDropdownProperty();
                        setFilter({
                          day: filter.day,
                          period: filter.period,
                          prop: "Humidity",
                        });
                      }}
                    >
                      Humidity
                    </li>
                    <li
                      key="Pressure"
                      className={classes.listItem}
                      onClick={() => {
                        closeDropdownProperty();
                        setFilter({
                          day: filter.day,
                          period: filter.period,
                          prop: "Pressure",
                        });
                      }}
                    >
                      Pressure
                    </li>
                    <li
                      key="Wind speed"
                      className={classes.listItem}
                      onClick={() => {
                        closeDropdownProperty();
                        setFilter({
                          day: filter.day,
                          period: filter.period,
                          prop: "Wind speed",
                        });
                      }}
                    >
                      Wind speed
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={classes.gridContainer}
          style={{
            gridTemplateColumns:
              filter.prop === "-" ? "repeat(6, 1fr)" : "repeat(3, 1fr)",
          }}
        >
          <div key={searchedCityForecast.name} className={classes.gridItem}>
            {searchedCityForecast.name},&nbsp;{searchedCityForecast.country}
          </div>
          <div key="Time period" className={classes.gridItem}>
            Time period
          </div>

          {(filter.prop === "Temperature" || filter.prop === "-") && (
            <div key="Temperature" className={classes.gridItem}>
              Temperature
            </div>
          )}
          {(filter.prop === "Humidity" || filter.prop === "-") && (
            <div key="Humidity" className={classes.gridItem}>
              Humidity
            </div>
          )}
          {(filter.prop === "Pressure" || filter.prop === "-") && (
            <div key="Pressure" className={classes.gridItem}>
              Pressure
            </div>
          )}
          {(filter.prop === "Wind speed" || filter.prop === "-") && (
            <div key="Wind speed" className={classes.gridItem}>
              Wind speed
            </div>
          )}

          {filteredData.map((day) => {
            return day.items.map((period) => {
              const dayTime = period.dt_txt.split(" ")[1];
              const temp = `${(period.main.temp - 273.15).toFixed(2)} °C`;
              const humidity = `${period.main.humidity} %`;
              const pressure = `${period.main.pressure} hPa`;
              const kmh = `${period.wind.speed} km/h`;

              return (
                <Fragment key={period.dt}>
                  <div className={classes.gridItem}>{day.dayName}</div>
                  <div className={classes.gridItem}>{dayTime}</div>
                  {(filter.prop === "Temperature" || filter.prop === "-") && (
                    <div className={classes.gridItem}>{temp}</div>
                  )}
                  {(filter.prop === "Humidity" || filter.prop === "-") && (
                    <div className={classes.gridItem}>{humidity}</div>
                  )}
                  {(filter.prop === "Pressure" || filter.prop === "-") && (
                    <div className={classes.gridItem}>{pressure}</div>
                  )}
                  {(filter.prop === "Wind speed" || filter.prop === "-") && (
                    <div className={classes.gridItem}>{kmh}</div>
                  )}
                </Fragment>
              );
            });
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
      {searchedCityForecast && (
        <BarChart filteredData={filteredData} filterState={filter} />
      )}
    </div>
  );
};

export default Forecast;
