const WEATHER_API =
  "https://agriculture-platform.onrender.com/api/real-weather";

async function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    showError("Please enter city");
    return;
  }

  fetchWeather(`${WEATHER_API}?city=${encodeURIComponent(city)}`);
}

function getCurrentLocationWeather() {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported in this browser");
    return;
  }

  const result = document.getElementById("weatherResult");
  result.innerHTML = "<h3>Getting your location...</h3>";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetchWeather(`${WEATHER_API}?lat=${lat}&lon=${lon}`);
    },
    () => {
      showError("Location permission denied");
    }
  );
}

async function fetchWeather(url) {
  const result = document.getElementById("weatherResult");
  const error = document.getElementById("weatherError");

  result.innerHTML = "";
  error.innerText = "";

  try {
    result.innerHTML = "<h3>Loading weather...</h3>";

    const response = await fetch(url);
    const data = await response.json();

    result.innerHTML = "";

    if (!data.success) {
      showError(data.message || "Weather data not found");
      return;
    }

    const current = data.current;
    const advice = getFarmerAdvice(current);
    const icon = getWeatherIcon(current.weather_code);

    let forecastHTML = `
      <h3 class="forecast-title">📅 7-Day Forecast</h3>
      <div class="forecast-list">
    `;

    data.daily.time.forEach((day, index) => {
      const dailyIcon =
        getWeatherIcon(data.daily.weather_code[index]);

      forecastHTML += `
        <div class="forecast-card ${getForecastClass(data.daily.precipitation_probability_max[index])}">
          <h4>${dailyIcon} ${day}</h4>
          <p>🌡 Max: ${data.daily.temperature_2m_max[index]} °C</p>
          <p>❄ Min: ${data.daily.temperature_2m_min[index]} °C</p>
          <p>🌧 Rain Chance: ${data.daily.precipitation_probability_max[index]}%</p>
        </div>
      `;
    });

    forecastHTML += `</div>`;

    result.innerHTML = `
      <div class="weather-card">
        <h2>${icon} ${data.location.city}</h2>
        <p><strong>State:</strong> ${data.location.state || "-"}</p>
        <p><strong>Country:</strong> ${data.location.country || "-"}</p>

        <p><strong>🌡 Temperature:</strong> ${current.temperature_2m} °C</p>
        <p><strong>💧 Humidity:</strong> ${current.relative_humidity_2m} %</p>
        <p><strong>💨 Wind Speed:</strong> ${current.wind_speed_10m} km/h</p>
        <p><strong>⏰ Updated:</strong> ${current.time}</p>

        <div class="farmer-advice">
          <h3>🌾 Farmer Advice</h3>
          <p>${advice}</p>
        </div>
      </div>

      ${forecastHTML}
    `;
  } catch (err) {
    console.log(err);
    showError("Failed to fetch weather");
  }
}

function showError(message) {
  document.getElementById("weatherError").innerText = message;
  document.getElementById("weatherResult").innerHTML = "";
}

function getFarmerAdvice(current) {
  const temp = current.temperature_2m;
  const humidity = current.relative_humidity_2m;
  const wind = current.wind_speed_10m;

  if (wind > 25) {
    return "High wind speed. Avoid pesticide spraying today.";
  }

  if (humidity > 80) {
    return "High humidity. Risk of fungal diseases. Check crops regularly.";
  }

  if (temp > 35) {
    return "High temperature. Provide enough irrigation to crops.";
  }

  if (temp < 15) {
    return "Low temperature. Protect sensitive crops from cold stress.";
  }

  return "Weather is suitable for normal farming activities.";
}

function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if ([1, 2, 3].includes(code)) return "⛅";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67].includes(code)) return "🌧️";
  if ([71, 73, 75, 77].includes(code)) return "❄️";
  if ([80, 81, 82].includes(code)) return "🌧️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌤️";
}

function getForecastClass(rainChance) {
  if (rainChance >= 70) return "rainy-card";
  if (rainChance >= 30) return "cloudy-card";
  return "sunny-card";
}