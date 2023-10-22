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
    day: "All",
    period: "All",
    weatherProp: "All",
  });
  const [errorText, setErrorText] = useState(null);

  const filterData = () => {
    if (!searchedCityForecast) {
      return;
    }
    let filteredDays = [];
    for (const day of searchedCityForecast.weatherForecastList) {
      const dayName = day.dayName;
      if (filter.day === "All") {
        filteredDays.push({ ...day });
        continue;
      }
      if (filter.day === dayName) {
        filteredDays.push({ ...day });
      }
    }

    if (filter.period !== "All") {
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

    const dropDownItems = [
      "All",
      "Temperature",
      "Humidity",
      "Pressure",
      "Wind",
    ];

    let tableProps = [searchedCityForecast.name, "Time period"];
    if (filter.weatherProp === "All") {
      tableProps.push(...dropDownItems.slice(1));
    } else {
      tableProps.push(filter.weatherProp);
    }

    return (
      <div
        className={classes.gridFilter}
        style={{
          height:
            filter.day !== "All" && filter.period !== "All" ? "14rem" : null,
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
                          period: "All",
                          weatherProp: filter.weatherProp,
                        });
                      }}
                    >
                      All
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
                                weatherProp: filter.weatherProp,
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
                          day: "All",
                          period: filter.period,
                          weatherProp: filter.weatherProp,
                        });
                      }}
                    >
                      All
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
                              weatherProp: filter.weatherProp,
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
                {filter.weatherProp}
              </button>
              {isOpenProperty && (
                <div className={classes.listStyle}>
                  <ul className={classes.ulStyle}>
                    {dropDownItems.map((property) => (
                      <li
                        key={property}
                        className={classes.listItem}
                        onClick={() => {
                          closeDropdownProperty();
                          setFilter({
                            day: filter.day,
                            period: filter.period,
                            weatherProp: property,
                          });
                        }}
                      >
                        {property}
                      </li>
                    ))}
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
              filter.weatherProp === "All"
                ? "repeat(6, 1fr)"
                : "repeat(3, 1fr)",
          }}
        >
          {tableProps.map((tableProp, i) => {
            let label = tableProp;
            if (i === 0) {
              label += `, ${searchedCityForecast.country}`;
            }
            return (
              <div key={tableProp} className={classes.gridItem}>
                {label}
              </div>
            );
          })}

          {filteredData.map((day) => {
            return day.items.map((period) => {
              const dayTime = period.dt_txt.split(" ")[1];
              const Temperature = `${(period.main.temp - 273.15).toFixed(
                2
              )} °C`;
              const Humidity = `${period.main.humidity} %`;
              const Pressure = `${period.main.pressure} hPa`;
              const Wind = `${period.wind.speed} km/h`;
              const elementsObject = {
                dayName: day.dayName,
                dayTime: dayTime,
                Temperature,
                Humidity,
                Pressure,
                Wind,
              };

              const elements = [day.dayName, dayTime];

              if (filter.weatherProp === "All") {
                elements.push(
                  elementsObject.Temperature,
                  elementsObject.Humidity,
                  elementsObject.Pressure,
                  elementsObject.Wind
                );
              } else {
                elements.push(elementsObject[filter.weatherProp]);
              }

              return (
                <Fragment key={period.dt}>
                  {elements.map((property) => (
                    <div key={property} className={classes.gridItem}>
                      {property}
                    </div>
                  ))}
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
