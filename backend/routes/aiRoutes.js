const express = require("express");
const router = express.Router();

const {
  predictDisease,
  getPredictionHistory,
} = require("../controllers/aiController");

router.post("/predict", predictDisease);

router.get(
  "/history/:userId",
  getPredictionHistory
);

module.exports = router;