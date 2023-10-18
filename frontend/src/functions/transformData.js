export const transformWeatherData = (weatherData) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);
  tomorrowDate.setHours(0, 0, 0, 0);

  const futureDate = new Date();
  futureDate.setDate(tomorrowDate.getDate() + 4);
  futureDate.setHours(23, 59, 59, 59);

  let filteredWeatherList = weatherData.list.filter((datetime) => {
    const date = new Date(datetime.dt_txt);
    return date >= tomorrowDate && date <= futureDate;
  });

  const groupedData = {};

  filteredWeatherList.forEach((item) => {
    const date = new Date(item.dt_txt);
    const dtTxt = item.dt_txt.split(" ")[0];

    const dayName = daysOfWeek[date.getDay()];

    if (!groupedData[dtTxt]) {
      groupedData[dtTxt] = {
        dayName: dayName,
        items: [],
      };
    }
    groupedData[dtTxt].items.push(item);
  });

  const dataArray = Object.entries(groupedData).map(([date, info]) => ({
    date,
    ...info,
  }));

  const data = {
    name: weatherData.city.name,
    country: weatherData.city.country,
    coords: {
      latitude: weatherData.city.coord.lat,
      longitude: weatherData.city.coord.lon,
    },
    weatherForecastList: dataArray,
  };
  return data;
};
