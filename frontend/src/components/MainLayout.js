import classes from "./MainLayout.module.css";
import WeatherWidget from "./WeatherWidget";

const MainLayout = () => {
  return (
    <div className={classes.mainLayoutDiv}>
      <div className={classes.widgetDiv}>
        <WeatherWidget />
      </div>
    </div>
  );
};

export default MainLayout;
