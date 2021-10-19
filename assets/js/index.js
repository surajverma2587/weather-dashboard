const mockData = {
  current: {
    name: "London",
    temperature: 123.45,
    wind: 111.22,
    humidity: 33,
    uvi: 2.5,
    date: "(3/30/2021)",
    iconCode: "04n",
  },
  forecast: [
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
  ],
};

const weatherCardsContainer = $("#weather-cards-container");

const API_KEY = "393609ac7b2e5f25ccdd00e626ee13dd";

const getWeatherData = async (cityName) => {
  const currentDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
  const currentDataResponse = await fetch(currentDataUrl);
  const currentData = await currentDataResponse.json();
  const lat = currentData.coord.lat;
  const lon = currentData.coord.lon;
  const name = currentData.name;

  const forecastDataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  const forecastDataResponse = await fetch(forecastDataUrl);
  const forecastData = await forecastDataResponse.json();
  return {
    current: {
      name: name,
      temperature: forecastData.current.temp,
      wind: forecastData.current.wind_speed,
      humidity: forecastData.current.humidity,
      uvi: forecastData.current.uvi,
      date: "(3/30/2021)",
      iconCode: "04n",
    },
    forecast: [
      {
        date: "(3/30/2021)",
        temperature: 123.45,
        wind: 111.22,
        humidity: 33,
        iconCode: "04n",
      },
      {
        date: "(3/30/2021)",
        temperature: 123.45,
        wind: 111.22,
        humidity: 33,
        iconCode: "04n",
      },
      {
        date: "(3/30/2021)",
        temperature: 123.45,
        wind: 111.22,
        humidity: 33,
        iconCode: "04n",
      },
      {
        date: "(3/30/2021)",
        temperature: 123.45,
        wind: 111.22,
        humidity: 33,
        iconCode: "04n",
      },
      {
        date: "(3/30/2021)",
        temperature: 123.45,
        wind: 111.22,
        humidity: 33,
        iconCode: "04n",
      },
    ],
  };
};

const renderCurrentWeatherCard = function (currentData) {
  const currentWeatherCard = `<div class="card-body bg-white border mb-2">
    <h2 class="card-title">
        ${currentData.name} ${currentData.date}
        <img src="https://openweathermap.org/img/w/${currentData.iconCode}.png" />
    </h2>
    <p class="card-text">Temp: ${currentData.temperature}&deg;F</p>
    <p class="card-text">Wind: ${currentData.wind} MPH</p>
    <p class="card-text">Humidity: ${currentData.humidity}%</p>
    <p class="card-text">
        UV index: <span class="btn btn-primary">${currentData.uvi}</span>
    </p>
    </div>`;

  weatherCardsContainer.append(currentWeatherCard);
};

// constructing forecast cards
const renderForecastWeatherCards = function (forecastData) {
  const constructForecastCard = function (each) {
    return `<div class="card m-1 forecast-card">
        <div class="card-body">
        <h5 class="card-title">${each.date}</h5>
        <p class="card-text">
            <img src="https://openweathermap.org/img/w/${each.iconCode}.png" />
        </p>
        <p class="card-text">Temp: ${each.temperature}&deg;F</p>
        <p class="card-text">Wind: ${each.wind} MPH</p>
        <p class="card-text">Humidity: ${each.humidity}</p>
        </div>
    </div>`;
  };

  const forecastCards = forecastData.map(constructForecastCard).join("");

  const forecastCardsContainer = `<div class="bg-white border">
    <h3 class="p-3 text-center">5-Day Forecast:</h3>
    <div
        class="m-3 d-flex flex-wrap justify-content-around"
        id=""
    >${forecastCards}</div>
    </div>`;

  weatherCardsContainer.append(forecastCardsContainer);
};

// constructing weather cards
const renderWeatherCards = function (weatherData) {
  //   console.log(weatherData);

  renderCurrentWeatherCard(weatherData.current);

  renderForecastWeatherCards(weatherData.forecast);
};

getWeatherData("london");
renderWeatherCards(mockData);
