import { useEffect, useState } from "react";
import classes from "./Drops.module.css";

const Drops = ({ type }) => {
  let width;
  let height;

  if (type === "Rain" || type === "Drizzle") {
    width = "0.1rem";
    height = "0.5rem";
  } else {
    width = "0.3rem";
    height = "0.3rem";
  }

  const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        {elements.map((i) => (
          <div
            key={i}
            style={{
              height: `${height}`,
              width: `${width}`,
              borderRadius: "50%",
              backgroundColor: "white",
              marginTop: `${Math.floor(Math.random() * 6)}rem`,
            }}
            className={classes.raindrops}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Drops;
