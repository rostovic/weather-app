import { useEffect, useState } from "react";
import classes from "./Drops.module.css";

const Drops = ({ type }) => {
  const [klasa, setKlasa] = useState("");

  useEffect(() => {
    if (!klasa) {
      setKlasa(classes.raindrops);
      setTimeout(() => {
        setKlasa("");
      }, 1000);
    }
  }, [klasa]);

  let width;
  let height;

  if (type === "rain") {
    width = "0.1rem";
    height = "0.5rem";
  } else {
    width = "0.3rem";
    height = "0.3rem";
  }

  const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div key={klasa} className={klasa}>
      <div
        style={{
          display: "flex",
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        {elements.map((i, index) => (
          <div
            key={index}
            style={{
              marginTop: `${Math.floor(Math.random() * 26) + 10}%`,
              height: `${height}`,
              width: `${width}`,
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Drops;
