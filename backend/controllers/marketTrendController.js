const MarketPrice = require("../models/MarketPrice");

const getMarketTrend = async (req, res) => {
  try {
    const { cropName } = req.params;

    const prices = await MarketPrice.find({
      cropName,
    });

    if (prices.length === 0) {
      return res.status(404).json({
        message: "No market data found",
      });
    }

    const values = prices.map(
      (item) => item.marketPrice
    );

    const averagePrice =
      values.reduce((a, b) => a + b, 0) /
      values.length;

    const highestPrice = Math.max(...values);
    const lowestPrice = Math.min(...values);

    res.status(200).json({
      cropName,
      averagePrice,
      highestPrice,
      lowestPrice,
      records: values.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Trend Analysis Failed",
      error: error.message,
    });
  }
};

module.exports = {
  getMarketTrend,
};