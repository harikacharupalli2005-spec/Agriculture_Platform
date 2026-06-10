const Weather = require("../models/Weather");

// Add Weather
const addWeather = async (req, res) => {
  try {
    const weather = new Weather(req.body);

    await weather.save();

    res.status(201).json({
      message: "Weather Added Successfully",
      weather,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Add Weather",
      error: error.message,
    });
  }
};

// Get Weather By District
const getWeather = async (req, res) => {
  try {
    const weather = await Weather.findOne({
      district: req.params.district,
    }).sort({ createdAt: -1 });

    if (!weather) {
      return res.status(404).json({
        message: "Weather Not Found",
      });
    }

    res.status(200).json(weather);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Fetch Weather",
      error: error.message,
    });
  }
};

module.exports = {
  addWeather,
  getWeather,
};