let now = new Date();

function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function formatDate1(now) {
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
    "November",
    "December"
  ];

  let month = months[now.getMonth()];
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  return `${month} ${date}`;
}

let month1 = document.querySelector(".month1");
let currentTime1 = new Date();
month1.innerHTML = formatDate1(currentTime1) + ",";

let times = document.querySelector(".times");
let currentTime = new Date();
times.innerHTML = formatDate(currentTime);



function displayTemperature(response) {
console.log(response);

  cTemp = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML= cTemp;
  let cityElement =  document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humiElement = document.querySelector("#humi");
  humiElement.innerHTML =  response.data.main.humidity + "%";
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed)
  + " Km/h";
  let emojiElement = document.querySelector("#emoji");
  emojiElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}


function search(city){ 
  let apiKey = "5a7acbe76d11ed01350ad9a79a9f8797";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayCTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML =cTemp;
  cLink.classList.add("active");
  fLink.classList.remove("active");

}

function displayFTemp(event) {
  event.preventDefault();
  let fTemp = Math.round(cTemp *9/5+32);
  cLink.classList.remove("active");
  fLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fTemp;

}

function getForecast(coordinates) {
  let apiKey = "5a7acbe76d11ed01350ad9a79a9f8797";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast)}


function formatDay(timestamp){
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thur",
  "Fri",
  "Sat"]

  return days[day];

}

function displayForecast(response){
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) { 
    if (index < 5) {
    forecastHTML =
      forecastHTML +
  `<div class="col">
  <div class="card" style="width: auto;">
    <div class="card-body">
      <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
      <h6>${Math.round(forecastDay.temp.max)}º</h6> <h6 class="tempMin">${Math.round(forecastDay.temp.min)}º</h6><br>
      <img class="imgForecast"
      src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      width="80">
    </div>
  </div>
</div>`}
    });

forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
let cTemp = null;


let fLink = document.querySelector("#flink");
fLink.addEventListener("click", displayFTemp);

let cLink = document.querySelector("#clink");
cLink.addEventListener("click", displayCTemp);

search("Washington");