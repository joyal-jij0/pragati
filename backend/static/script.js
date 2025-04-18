async function getWeather() {
    const location = document.getElementById('location').value;
    if (!location) return;

    try {
        const response = await fetch(`/api/v1/weather/${encodeURIComponent(location)}`);
        const data = await response.json();

        // Update location name
        document.getElementById('location-name').textContent = data.location;

        // Update current weather
        const current = data.current;
        document.getElementById('current-details').innerHTML = `
            <p>Temperature: ${current.temp}°F</p>
            <p>Conditions: ${current.conditions}</p>
            <p>Humidity: ${current.humidity}%</p>
            <p>Wind Speed: ${current.windspeed} mph</p>
        `;

        // Update forecast
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';
        
        data.forecast.forEach(day => {
            const date = new Date(day.datetime).toLocaleDateString();
            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.innerHTML = `
                <h4>${date}</h4>
                <p>High: ${day.tempmax}°F</p>
                <p>Low: ${day.tempmin}°F</p>
                <p>Conditions: ${day.conditions}</p>
            `;
            forecastContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Optional: Get user's location
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        document.getElementById('location').value = `${lat},${lon}`;
        getWeather();
    });
}