const weatherCardsContainer = $("#weather-cards-container");

const API_KEY = "393609ac7b2e5f25ccdd00e626ee13dd";

const getCurrentData = function (name, forecastData) {
  return {
    name: name,
    temperature: forecastData.current.temp,
    wind: forecastData.current.wind_speed,
    humidity: forecastData.current.humidity,
    uvi: forecastData.current.uvi,
    date: getFormattedDate(forecastData.current.dt),
    iconCode: forecastData.current.weather[0].icon,
  };
};

const getFormattedDate = function (unixTimestamp) {
  return moment.unix(unixTimestamp).format("ddd DD/MM/YYYY");
};

const getIconCode = function () {
  return;
};

const getForecastData = function (forecastData) {
  const callback = function (each) {
    return {
      date: getFormattedDate(each.dt),
      temperature: each.temp.max,
      wind: each.wind_speed,
      humidity: each.humidity,
      iconCode: each.weather[0].icon,
    };
  };

  return forecastData.daily.slice(1, 6).map(callback);
};

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

  const current = getCurrentData(name, forecastData);
  const forecast = getForecastData(forecastData);

  return {
    current: current,
    forecast: forecast,
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

const handleSearch = async function (event) {
  event.preventDefault();

  const cityName = $("#city-input").val();

  if (cityName) {
    const weatherData = await getWeatherData(cityName);

    weatherCardsContainer.empty();

    renderWeatherCards(weatherData);

    // save city to LS
  }
};

$("#search-form").on("submit", handleSearch);
