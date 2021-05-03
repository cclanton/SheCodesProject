function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let year = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];
  let formattedDate = `${day}, ${month} ${date}, ${year} ${hour}:${minute}`;
  return formattedDate;
}
let now = new Date();
let dateFunction = document.querySelector(".currentDate");
dateFunction.innerHTML = formatDate(now);

function newCitySearch(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#search-city");
  let cityElement = document.querySelector("#display-city");
  cityElement.innerHTML = `${enterCity.value}`;
  searchCity(enterCity.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newCitySearch);

function getCurrentCity(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#display-city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}


function searchCity(city) {
  let apiKey = "bad7b7623aa69aa37c2b1140525d244e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentCity);
}

function locate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bad7b7623aa69aa37c2b1140525d244e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentCity);

}
let currentPosition = document.querySelector("#current-position");
currentPosition.addEventListener("click", locate);

function convertToCelsius(event) {}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function formatDay (day) {
  let date = new Date(timestamp + 1000);
  let day = date.getDay();
  let days = [ "Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  return days [day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  
  forecast.forEach(function (forecastDay, index) {
    if (index <6) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class = "weather-forecast-date"> ${formatDay(forecastDay.dt)}
          </div>    

          <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42">/
            <div class= "weather-forecast-temperatures">
        <span class= "weather-forecast-temperature-max">
          ${Math.round(forecast.Day.temp.max)}°  </span>
          <span class="weather-forecast-temperature-min">
            ${Math.round(forecast.Day.temp.min)}° 
        </span>
            </div>
          </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ad7b7623aa69aa37c2b1140525d244e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
search("New York");

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);