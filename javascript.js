
// allows the content to be updated based on the user city search
function updateWeather(response) {
    let cityElement = document.querySelector("#location");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let conditionElement = document.querySelector("#conditions");
    let emojiElement = document.querySelector("#emoji");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind")
    let currentTemperature = document.querySelector("#current-temperature");
    let temperature = response.data.temperature.current;


    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = currentDate(date);
    conditionElement.innerHTML = response.data.condition.description;
    emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`
    windElement.innerHTML = `${response.data.wind.speed}km/h`
    currentTemperature.innerHTML = Math.round(temperature);

}


// Collects the current date  and time as per the city
function currentDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satureday"];

    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`
}

// Allows the user to search for the city and 
function submitForm(event) {
    event.preventDefault();
    let searchCity = document.querySelector("#search-input");

    citySearch(searchCity.value);
}

// Function to store data when searching for the city using API 
function citySearch(city) {
    let apiKey = "9a9b6ao3534d1b2afb7b49dddt30a6e7"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?&query=${city}&key=${apiKey}`
    axios.get(apiUrl).then(updateWeather);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener = ("submit", submitForm);

citySearch("Lisbon");