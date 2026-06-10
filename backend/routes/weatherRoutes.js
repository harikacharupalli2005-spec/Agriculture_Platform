const express = require("express");
const router = express.Router();

const {
  addWeather,
  getWeather,
} = require("../controllers/weatherController");

router.post("/", addWeather);

router.get("/:district", getWeather);

module.exports = router;