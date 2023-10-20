import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ filteredData, filterState }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  let labels = [];
  let values = [];
  let mainLabel = "";
  switch (filterState.prop) {
    case "Temperature":
      mainLabel = `Temperature (°C)`;
      break;
    case "Humidity":
      mainLabel = `Humidity (%)`;
      break;
    case "Pressure":
      mainLabel = `Pressure (hPa)`;
      break;
    case "Wind speed":
      mainLabel = `Wind speed (km/h)`;
      break;
  }
  filteredData.map((day) =>
    day.items.map((period) => {
      labels.push(`${day.dayName} ${period.dt_txt.split(" ")[1]}`);
      if (filterState.prop === "Temperature") {
        values.push((period.main.temp - 273.15).toFixed(2));
      }
      if (filterState.prop === "Humidity") {
        values.push(period.main.humidity);
      }
      if (filterState.prop === "Pressure") {
        values.push(period.main.pressure);
      }
      if (filterState.prop === "Wind speed") {
        values.push(period.wind.speed);
      }
    })
  );

  values = [...values];

  const data = {
    labels,
    datasets: [
      {
        label: mainLabel,
        data: values,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return (
    <>
      {filterState.prop !== "-" ? (
        <div style={{ width: "50rem", height: "25rem", overflowX: "scroll" }}>
          <Line options={options} data={data} />
        </div>
      ) : null}
    </>
  );
};

export default BarChart;
