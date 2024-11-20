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

// Attach event listener to the search form
let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", submitForm);

// Display default city on page load
citySearch("Johannesburg");
