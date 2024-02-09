const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode', darkModeToggle.checked);
});
async function getWeather() {
    const apiKey = 'f7f13723031c6d95e70d9cf2dd0b0fc4';
    const city = 'Ghaziabad';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById('location').textContent = `Location: ${data.name}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
        document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherBody = document.getElementById('weather-body');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName !== '') {
        getWeather(cityName);
        cityInput.value = '';
    }
});
async function getWeather(city) {
    const apiKey = 'f7f13723031c6d95e70d9cf2dd0b0fc4';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${data.name}</td>
            <td>${data.main.temp}</td>
            <td>${data.weather[0].description}</td>
        `;
        weatherBody.innerHTML = ''; 
        weatherBody.appendChild(newRow);
        const temperature = parseFloat(data.main.temp);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}
window.addEventListener('load', getWeather);
