const WeatherState = {
    selectedCity: null,  
    weatherData: null,  
    forecastData: [],  
    favoriteCities: JSON.parse(localStorage.getItem('favorites')) || [],  
    view: 'home', 

    setCurrentCity(city) {
        this.selectedCity = city;
    },

    setCurrentWeather(weather) {
        this.weatherData = weather;
    },

    setForecast(forecast) {
        this.forecastData = forecast;
    },

    addFavorite(city) {
        if (!this.favoriteCities.includes(city)) {
            this.favoriteCities.push(city);
            this.saveFavorites();  
        }
    },

    removeFavorite(city) {
        this.favoriteCities = this.favoriteCities.filter(fav => fav !== city);
        this.saveFavorites();  
    },

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favoriteCities));
    },

    setView(view) {
        this.view = view;
    }
};