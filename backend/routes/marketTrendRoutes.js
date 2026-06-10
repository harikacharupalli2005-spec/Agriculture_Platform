const express = require("express");
const router = express.Router();

const {
  getMarketTrend,
} = require("../controllers/marketTrendController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.get(
  "/:cropName",
  authMiddleware,
  getMarketTrend
);

module.exports = router;