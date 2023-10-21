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
  let valuesTemp = [];
  let valuesHumidity = [];
  let valuesPressure = [];
  let valuesWind = [];

  filteredData.map((day) =>
    day.items.map((period) => {
      labels.push(`${day.dayName} ${period.dt_txt.split(" ")[1]}`);
      if (filterState.prop === "-") {
        valuesTemp.push((period.main.temp - 273.15).toFixed(2));
        valuesHumidity.push(period.main.humidity);
        valuesPressure.push(period.main.pressure);
        valuesWind.push(period.wind.speed);
      }
      if (filterState.prop === "Temperature") {
        valuesTemp.push((period.main.temp - 273.15).toFixed(2));
      }
      if (filterState.prop === "Humidity") {
        valuesHumidity.push(period.main.humidity);
      }
      if (filterState.prop === "Pressure") {
        valuesPressure.push(period.main.pressure);
      }
      if (filterState.prop === "Wind speed") {
        valuesWind.push(period.wind.speed);
      }
    })
  );

  valuesTemp = [...valuesTemp];
  valuesHumidity = [...valuesHumidity];
  valuesPressure = [...valuesPressure];
  valuesWind = [...valuesWind];

  let data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: valuesTemp,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "Humidity",
        data: valuesHumidity,
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: "Pressure",
        data: valuesPressure,
        borderColor: "yellow",
        backgroundColor: "yellow",
      },
      {
        label: "Wind speed",
        data: valuesWind,
        borderColor: "green",
        backgroundColor: "green",
      },
    ],
  };

  if (filterState.prop !== "-") {
    const dataset = data.datasets.find(
      (element) => element.label === filterState.prop
    );

    data = {
      labels: data.labels,
      datasets: [dataset],
      options: data.options,
    };
  }

  return (
    <>
      <div style={{ width: "50%" }}>
        <Line options={options} data={data} />
      </div>
    </>
  );
};

export default BarChart;
