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

