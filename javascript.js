function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input");
    theCity(city.value);
}

function theCity(response) {
    let apiKey = "9a9b6ao3534d1b2afb7b49dddt30a6e7"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${theCity}&key=${apiKey}`
    axios.get(apiUrl).then("updateWeather");
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener = ("submit", searchCity);
