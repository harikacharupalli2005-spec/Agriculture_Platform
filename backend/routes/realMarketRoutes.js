const express = require("express");
const router = express.Router();

const {
  getRealMarketPrices
} = require("../controllers/realMarketController");

router.get("/prices", getRealMarketPrices);

module.exports = router;