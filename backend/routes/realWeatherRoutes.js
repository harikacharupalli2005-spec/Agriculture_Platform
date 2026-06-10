const express = require("express");
const router = express.Router();

const {
  getRealWeather,
} = require("../controllers/realWeatherController");

router.get("/", getRealWeather);

module.exports = router;