const axios = require("axios");

const getRealWeather = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    let location = {};

    if (lat && lon) {
      const geoInfo = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "json",
            lat: lat,
            lon: lon,
          },
          headers: {
            "User-Agent": "Agriculture-Platform",
          },
        }
      );

      const address = geoInfo.data.address || {};

      location = {
        latitude: lat,
        longitude: lon,
        name:
          address.city ||
          address.town ||
          address.village ||
          address.hamlet ||
          "Current Location",
        admin1: address.state || "",
        country: address.country || "",
      };
    } else {
      if (!city) {
        return res.status(400).json({
          success: false,
          message: "City or location is required",
        });
      }

      const geoResponse = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: city,
            count: 1,
            language: "en",
            format: "json",
          },
        }
      );

      if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "City not found",
        });
      }

      const place = geoResponse.data.results[0];

      location = {
        latitude: place.latitude,
        longitude: place.longitude,
        name: place.name,
        admin1: place.admin1 || "",
        country: place.country || "",
      };
    }

    const weatherResponse = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          current:
            "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
          daily:
            "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
          timezone: "auto",
        },
      }
    );

    res.status(200).json({
      success: true,
      location: {
        city: location.name,
        state: location.admin1,
        country: location.country,
      },
      current: weatherResponse.data.current,
      daily: weatherResponse.data.daily,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch weather",
      error: error.message,
    });
  }
};

module.exports = {
  getRealWeather,
};