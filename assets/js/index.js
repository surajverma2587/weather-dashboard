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

const renderCurrentWeatherCard = function (currentData) {
  console.log(currentData);
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

// constructing weather cards
const renderWeatherCards = function (weatherData) {
  //   console.log(weatherData);

  renderCurrentWeatherCard(weatherData.current);
};

renderWeatherCards(mockData);
