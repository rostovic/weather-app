import { useEffect, useState } from "react";

const TimeDisplay = () => {
  const [timeString, setTimeString] = useState();
  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      setTimeString(
        `${hours}:${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <span
      style={{
        fontWeight: "300",
        fontSize: "0.75rem",
        color: "white",
        opacity: 0.75,
      }}
    >
      {timeString}
    </span>
  );
};

export default TimeDisplay;
