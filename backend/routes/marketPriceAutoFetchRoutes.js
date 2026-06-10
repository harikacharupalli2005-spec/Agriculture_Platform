const express = require("express");
const router = express.Router();

const {
  fetchMarketPrices,
} = require("../controllers/marketPriceAutoFetchController");

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

router.post(
  "/fetch",
  authMiddleware,
  allowRoles("admin"),
  fetchMarketPrices
);

module.exports = router;