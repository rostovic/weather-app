import { useState } from "react";
import classes from "./MainLayout.module.css";
import WeatherWidget from "./WeatherWidget";
import Forecast from "./Forecast";

const MainLayout = () => {
  return (
    <div className={classes.mainLayoutDiv}>
      <WeatherWidget />
      <Forecast />
    </div>
  );
};

export default MainLayout;
