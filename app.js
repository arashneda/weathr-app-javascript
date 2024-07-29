const apiKey = "066836afd81fd9dd956973969e4698db";

const weatherDataEl = document.getElementById("weather-data");
const cityInpueEl = document.getElementById("city-inpue");
const formEl = document.querySelector("form");
const iconEl = document.querySelector(".icon");
const temperatureEl = document.querySelector(".temperature");
const DesShapeEl = document.querySelector(".DesShape");
const feelsLikeEl = document.querySelector(".feelsLike");
const humidityEl = document.querySelector(".humidity");
const windSpeedEl = document.querySelector(".windSpeed");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInpueEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const responce = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    if (!responce.ok) {
      throw new error("network response was not ok");
    }

    const data = await responce.json();
    const temperatury = Math.round(data.main.temp);

    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const main = data.weather[0].main;

    const FeelsLike = Math.round(data.main.feels_like);
    const Humidity = data.main.humidity;
    const WindSpeed = data.wind.speed;

    iconEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`;
    temperatureEl.textContent = `${cityValue} - ${temperatury}°C`;
    DesShapeEl.textContent = `${main}`;
    feelsLikeEl.innerHTML = `Feels Like: <br><br> ${FeelsLike}`
    humidityEl.innerHTML = `humidity: <br><br> ${Humidity}`
    windSpeedEl.innerHTML = `humidity: <br><br> ${WindSpeed}`

    console.log(data);
  } catch (error) {
    alert("please enter the city");
  }
}
