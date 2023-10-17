import classes from "./Drops.module.css";

const Drops = ({ type }) => {
  let width;
  let height;

  if (type === "Rain" || type === "Drizzle") {
    width = "0.1rem";
    height = "0.5rem";
  } else if (type === "Snow") {
    width = "0.3rem";
    height = "0.3rem";
  }

  const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={classes.mainDiv}>
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
  );
};

export default Drops;
