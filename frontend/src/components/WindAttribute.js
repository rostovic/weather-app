import { FaArrowUpLong } from "react-icons/fa6";

const WindAttribute = ({ direction, speed, style }) => {
  return (
    <div className={style}>
      <FaArrowUpLong
        style={{ rotate: `${direction}deg` }}
        color="black"
        opacity={0.75}
      />
      <span>{speed.toFixed(2)} kmh</span>
    </div>
  );
};

export default WindAttribute;
