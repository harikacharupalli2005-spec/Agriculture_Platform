const MarketPrice = require("../models/MarketPrice");

// Add Market Price
const addMarketPrice = async (req, res) => {
  try {
    const marketPrice = new MarketPrice({
      cropName: req.body.cropName,
      district: req.body.district,
      marketPrice: req.body.marketPrice,
      unit: req.body.unit,
    });

    await marketPrice.save();

    res.status(201).json({
      message: "Market Price Added Successfully",
      marketPrice,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Add Market Price",
      error: error.message,
    });
  }
};

// Get All Market Prices
const getAllMarketPrices = async (req, res) => {
  try {
    const prices = await MarketPrice.find().sort({
      createdAt: -1,
    });

    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Fetch Prices",
      error: error.message,
    });
  }
};

// Get Prices By District
const getPricesByDistrict = async (req, res) => {
  try {
    const prices = await MarketPrice.find({
      district: req.params.district,
    });

    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Fetch District Prices",
      error: error.message,
    });
  }
};

module.exports = {
  addMarketPrice,
  getAllMarketPrices,
  getPricesByDistrict,
};