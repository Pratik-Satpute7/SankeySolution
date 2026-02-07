function updateWeatherCard() {
    const container = document.getElementById('current-weather');
    if (!WeatherState.weatherData) {
        container.innerHTML = '';
        return;
    }
    const { name, main, weather } = WeatherState.weatherData;
    container.innerHTML = `
        <div class="weather-card">
            <h2>${name}</h2>
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
            <p>Temperature: ${main.temp}°C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Description: ${weather[0].description}</p>
        </div>
    `;
}

function renderForecast() {
    const container = document.getElementById('forecast');
    if (WeatherState.forecastData.length === 0) {
        container.innerHTML = '';
        return;
    }
    container.innerHTML = '<h3>5-Day Forecast</h3><div class="forecast-grid"></div>';
    const grid = container.querySelector('.forecast-grid');
    WeatherState.forecastData.forEach(day => {
        const date = new Date(day.dt * 1000).toDateString();
        const { main, weather } = day;
        grid.innerHTML += `
            <div class="weather-card">
                <p>${date}</p>
                <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">
                <p>${main.temp}°C</p>
                <p>${weather[0].description}</p>
            </div>
        `;
    });
}


function updateFavoritesList() {
    const container = document.getElementById('favorites-list');
    container.innerHTML = '<h3>Favorite Cities you marked</h3>';
    if (WeatherState.favoriteCities.length === 0) {
        container.innerHTML += '<p>No favorites yet.</p>';
        return;
    }
    WeatherState.favoriteCities.forEach(city => {
        container.innerHTML += `
            <div class="favorite-item">
                <span>${city}</span>
                <button onclick="loadFavorite('${city}')">View</button>
                <button onclick="removeFavorite('${city}')">Remove</button>
            </div>
        `;
    });
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    setTimeout(() => document.getElementById('error-message').textContent = '', 7000);
}

function switchView() {
    const homeElements = document.querySelectorAll('#search-section, #current-weather, #forecast');
    const favoritesElement = document.getElementById('favorites-list');
    if (WeatherState.view === 'home') {
        homeElements.forEach(el => el.style.display = 'block');
        favoritesElement.style.display = 'none';
    } else {
        homeElements.forEach(el => el.style.display = 'none');
        favoritesElement.style.display = 'block';
    }
 
    document.getElementById('home-btn').classList.toggle('active', WeatherState.view === 'home');
    document.getElementById('favorites-btn').classList.toggle('active', WeatherState.view === 'favorites');
}