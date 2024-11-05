const apiKey = 'a1ce36071e9b21dd7cb7a3594d2dff32'; // Your OpenWeatherMap API key
const weatherInfo = document.getElementById('weather-info');
const locationElem = document.getElementById('location');
const temperatureElem = document.getElementById('temperature');
const conditionElem = document.getElementById('condition');


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getWeather, showError);
} else {
  locationElem.textContent = "Geolocation is not supported by this browser.";
}


async function getWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  console.log(`Latitude: ${lat}, Longitude: ${lon}`); // Log coordinates for debugging

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`, {
      mode: 'cors' // Enabling CORS mode
    });

    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather data received:", data); // Log the data for debugging

    // Update the DOM with weather data
    locationElem.textContent = `Location: ${data.name}`;
    temperatureElem.textContent = `Temperature: ${data.main.temp} °C`;
    conditionElem.textContent = `Condition: ${data.weather[0].description}`;
  } catch (error) {
    locationElem.textContent = "Unable to fetch weather data.";
    console.error("Error fetching weather data:", error); // Logs any fetch errors
  }
}


function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationElem.textContent = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      locationElem.textContent = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      locationElem.textContent = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      locationElem.textContent = "An unknown error occurred.";
      break;
  }
  console.error("Geolocation error:", error); // Logs any geolocation errors
}
