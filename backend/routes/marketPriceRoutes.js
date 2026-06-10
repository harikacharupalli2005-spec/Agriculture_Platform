const express = require("express");
const router = express.Router();

const {
  addMarketPrice,
  getAllMarketPrices,
  getPricesByDistrict,
} = require("../controllers/marketPriceController");

router.post("/", addMarketPrice);

router.get("/", getAllMarketPrices);

router.get(
  "/district/:district",
  getPricesByDistrict
);

module.exports = router;