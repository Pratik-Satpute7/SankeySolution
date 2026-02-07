function loadFavorite(city) {
    document.getElementById('city-input').value = city;
    document.getElementById('search-btn').click();  
    WeatherState.setView('home');
    switchView();
}

function removeFavorite(city) {
    WeatherState.removeFavorite(city);
    updateFavoritesList();
}

document.addEventListener('DOMContentLoaded', () => {
    switchView();
    updateFavoritesList();

    // Search button
    document.getElementById('search-btn').addEventListener('click', async () => {
        const city = document.getElementById('city-input').value.trim();
        if (!city) {
            showError('Please enter a city name.');
            return;
        }
        try {
            WeatherState.setCurrentCity(city);
            const weather = await fetchWeatherNow(city);  // API call
            WeatherState.setCurrentWeather(weather);  // update state
            const forecast = await getForecast(city);  // API call
            WeatherState.setForecast(forecast);  // update state
            updateWeatherCard();  
            renderForecast();  
            showError('');  
        } catch (error) {
            showError(error.message);  
        }
    });

    document.getElementById('add-favorite-btn').addEventListener('click', () => {
        if (WeatherState.selectedCity) {
            WeatherState.addFavorite(WeatherState.selectedCity);
            updateFavoritesList();  
        } else {
            showError('Search for a city first.');
        }
    });

    document.getElementById('home-btn').addEventListener('click', () => {
        WeatherState.setView('home');
        switchView();
    });

    document.getElementById('favorites-btn').addEventListener('click', () => {
        WeatherState.setView('favorites');
        switchView();
        updateFavoritesList();
    });
});