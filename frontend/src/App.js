import "./App.css";
import Forecast from "./components/Forecast";
import WeatherWidget from "./components/WeatherWidget";

const App = () => {
  return (
    <div className="mainLayoutDiv">
      <WeatherWidget />
      <Forecast />
    </div>
  );
};

export default App;
