import { getWeatherData } from "../functions/api";
import WeatherAttribute from "./WeatherAttribute";
import classes from "./WeatherWidget.module.css";
import { useState, useEffect } from "react";
import WindAttribute from "./WindAttribute";
import Drops from "./Drops";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleGeolocation = async (position) => {
      const currentWeatherData = await getWeatherData(
        position.coords.latitude,
        position.coords.longitude
      );
      setWeatherData(currentWeatherData);
    };

    const handleGeolocationError = (error) => {
      setError(error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocation,
        handleGeolocationError
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const renderDrops = () => {
    return <Drops type="snow" />;
  };

  const renderInfo = () => {
    if (!weatherData) {
      return;
    }

    const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const { humidity, pressure, temp } = weatherData.main;
    const { speed, deg } = weatherData.wind;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <span
          style={{
            fontWeight: "300",
            fontSize: "2.5rem",
            color: "white",
            opacity: 0.75,
          }}
        >
          {weatherData.name}, {weatherData.sys.country}
        </span>

        <img src={iconUrl} className={classes.weatherImage} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: "0.25rem",
          }}
        >
          {renderDrops()}
          <WeatherAttribute
            attributeName="Temperature"
            attributeValue={(temp - 273.15).toFixed(1)}
            iconName="temperature"
            postFix="&nbsp;°C"
          />
          <WeatherAttribute
            attributeName="Humidity"
            attributeValue={humidity}
            iconName="humidity"
            postFix="%"
          />
          <WeatherAttribute
            attributeName="Pressure"
            attributeValue={pressure}
            iconName="pressure"
            postFix="&nbsp;hPa"
          />
        </div>
        <WindAttribute
          style={classes.windStyle}
          direction={deg + 180}
          speed={speed * 3.6}
        />
      </div>
    );
  };

  console.log(weatherData);

  return <div className={classes.widgetDiv}>{renderInfo()}</div>;
};
export default WeatherWidget;
