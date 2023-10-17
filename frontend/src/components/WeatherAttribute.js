import classes from "./WeatherAttribute.module.css";
import { FaDroplet, FaTemperatureEmpty } from "react-icons/fa6";
import { WiBarometer } from "react-icons/wi";

const WeatherAttribute = ({
  attributeName,
  attributeValue,
  iconName,
  postFix,
}) => {
  let icon;
  const opacity = 0.8;
  switch (iconName) {
    case "humidity":
      icon = <FaDroplet color="black" size={18} opacity={opacity} />;
      break;
    case "temperature":
      icon = <FaTemperatureEmpty color="black" size={18} opacity={opacity} />;
      break;
    case "pressure":
      icon = <WiBarometer color="black" size={18} opacity={opacity} />;
      break;
    default:
      icon = null;
  }
  return (
    <div className={classes.test}>
      {icon}
      {/* &nbsp;
      <span>{attributeName}</span> */}
      &nbsp;
      <span style={{ fontSize: 20 }}>{attributeValue}</span>
      {postFix && <span>{postFix}</span>}
    </div>
  );
};
export default WeatherAttribute;
