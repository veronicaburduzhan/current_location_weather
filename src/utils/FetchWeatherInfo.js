const fetchWeatherInfo = async (latitude, longitude) => {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`
    );

    if (response.ok) {
        const fetchedWeather = await response.json();
        return fetchedWeather;
    } else {
        return response.status;
    }
};

export { fetchWeatherInfo };