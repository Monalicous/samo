// Updates the content based on the user's city search
function updateWeather(response) {
    let locationElement = document.querySelector("#location");
    let temperature = response.data.temperature.current;
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let conditionElement = document.querySelector("#conditions");
    let emojiElement = document.querySelector("#emoji");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let currentTemperature = document.querySelector("#current-temperature");

    locationElement.innerHTML = response.data.city;
    timeElement.innerHTML = currentDate(date);
    conditionElement.innerHTML = response.data.condition.description;
    emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed} km/h`;
    currentTemperature.innerHTML = Math.round(temperature);

    showForecast(response.data.city);
}

// Formats the current date and time
function currentDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

//Format date for weather forecast

function dateFormat(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return days[date.getDay()];
}

// Handles form submission
function submitForm(event) {
    event.preventDefault();
    let searchCity = document.querySelector("#search-input").value.trim();
    if (searchCity) {
        citySearch(searchCity);
    } else {
        alert("Please enter a city name.");
    }
}

// Makes an API request to search for a city's weather data
function citySearch(city) {
    let apiKey = "9a9b6ao3534d1b2afb7b49dddt30a6e7";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(updateWeather);
}

// Api to get the weather forecast
function showForecast(city) {
    let key = "9a9b6ao3534d1b2afb7b49dddt30a6e7"
    let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
    axios.get(url).then(weekForecast);
}

// Weather forecast for 4 days will be injected to html

function weekForecast(response) {
    console.log(response.data);
    let forecastElement = document.querySelector("#four-days-forecast");

    let forecast = "";

    response.data.daily.forEach(function (day, index) {
        // Pulling the forecast for 4 days only
        if (index < 4) {
            forecast = forecast + ` 
        <div class="forecast">
            <div class="forecast-day">
                <div class="forecast-date">${dateFormat(day.time)}</div>
                        <img src = ${day.condition.icon_url} class="forecast-icon">
                        <div class="forecast-temp">
                            <div class="forecast-temp">
                            <strong>${Math.round(day.temperature.maximum)}°</strong>
                            </div>
                            <div class="forecast-temp">
                            <strong>${Math.round(day.temperature.minimum)}°</strong>
                            </div>
                        </div>
            </div>
        </div>
        `
        }
    });

    forecastElement.innerHTML = forecast;
}

// Attach event listener to the search form
let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", submitForm);

// Display default city on page load
citySearch("Johannesburg");