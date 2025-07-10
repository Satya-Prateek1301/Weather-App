const API_KEY = "d8f0dcb3d3ba3d95468256988e1cf809";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetching HTML elements
const cityInput = document.getElementById("cityInput");
const searchbtn = document.getElementById("searchBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

// Weather display elements 
const CityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

searchbtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

function handleSearch() {
    const city = cityInput.value.trim();

    if (!city) {
        showError("Please Enter a City Name");
        return;
    }

    hideAllSections();
    showLoading();
    fetchWeatherData(city);
}

// Fetch weather data
async function fetchWeatherData(city) {
    try {
        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please check the spelling.");
            } else if (response.status === 401) {
                throw new Error("Invalid API Key.");
            } else {
                throw new Error("Failed to fetch weather data.");
            }
        }

        const data = await response.json();
        displayWeatherData(data);
    } catch (err) {
        console.error("Error fetching weather data:", err);
        hideLoading();
        showError(err.message);
    }
}

function displayWeatherData(data) {
    hideLoading();

    const cityNameText = `${data.name}, ${data.sys.country}`;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const feelsLikeTemp = Math.round(data.main.feels_like);
    const humidityValue = data.main.humidity;
    const windSpeedValue = Math.round(data.wind.speed);

    CityName.textContent = cityNameText;
    temperature.textContent = temp;
    weatherDescription.textContent = description;
    feelsLike.textContent = feelsLikeTemp;
    humidity.textContent = humidityValue;
    windSpeed.textContent = windSpeedValue;

    showWeatherDisplay();
}

function showLoading() {
    loading.classList.remove("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

function showWeatherDisplay() {
    weatherDisplay.classList.remove("hidden");
}

function hideWeatherDisplay() {
    weatherDisplay.classList.add("hidden");
}

function hideAllSections() {
    hideLoading();
    hideError();
    hideWeatherDisplay();
}
