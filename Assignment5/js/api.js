async function fetchWeatherNow(city) {
    try {
        const response = await fetch(`${WEATHER_BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        return await response.json();  
    } catch (error) {
        throw new Error(`Failed to fetch current weather: ${error.message}`);
    }
}

async function getForecast(city) {
    try {
        const response = await fetch(`${WEATHER_BASE_URL}/forecast?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        return data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
    } catch (error) {
        throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
}