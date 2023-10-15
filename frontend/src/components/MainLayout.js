import { useState } from "react";
import classes from "./MainLayout.module.css";
import WeatherWidget from "./WeatherWidget";

const MainLayout = () => {
  return (
    <div className={classes.mainLayoutDiv}>
      <WeatherWidget />
    </div>
  );
};

export default MainLayout;
