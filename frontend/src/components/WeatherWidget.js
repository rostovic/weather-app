import { getWeatherData } from "../functions/api";
import WeatherAttribute from "./WeatherAttribute";
import classes from "./WeatherWidget.module.css";
import { useState, useEffect } from "react";
import WindAttribute from "./WindAttribute";
import Drops from "./Drops";

const shouldRenderDrops = ["Rain", "Drizzle", "Snow"];

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
    if (shouldRenderDrops.includes(weatherData.weather[0].main)) {
      return <Drops type={weatherData.weather[0].main} />;
    }
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
            overflow: "hidden",
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

  let gradientStyle = "";

  switch (weatherData && weatherData.weather[0].main) {
    case "Clear":
      gradientStyle = `linear-gradient(200deg, yellow, #87ceeb, #1e90ff)`;
      break;
    case "Clouds":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Rain":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Drizzle":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Snow":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Mist":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Fog":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Thunderstorm":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Tornado":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Squall":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Dust":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Sand":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
    case "Ash":
      gradientStyle = `linear-gradient(180deg, #696969, lightgrey)`;
      break;
  }

  return (
    <div className={classes.mainDiv} style={{ background: gradientStyle }}>
      {renderInfo()}
    </div>
  );
};
export default WeatherWidget;
