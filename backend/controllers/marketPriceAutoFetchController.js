const axios = require("axios");
const MarketPrice = require("../models/MarketPrice");

const fetchMarketPrices = async (req, res) => {
  try {
    let records = [];

    try {
      const response = await axios.get(
        "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
        {
          params: {
            "api-key": process.env.DATA_GOV_API_KEY,
            format: "json",
            limit: 10,
          },
        }
      );

      records = response.data.records || [];
    } catch (apiError) {
      console.log("Online API failed. Using fallback sample data.");

      records = [
        {
          commodity: "Tomato",
          district: "Annamayya",
          modal_price: 2500,
        },
        {
          commodity: "Onion",
          district: "Kurnool",
          modal_price: 1800,
        },
        {
          commodity: "Paddy",
          district: "Guntur",
          modal_price: 2200,
        },
      ];
    }

    for (const item of records) {
      await MarketPrice.create({
        cropName: item.commodity,
        district: item.district,
        marketPrice: Number(item.modal_price),
        unit: "Quintal",
      });
    }

    res.status(200).json({
      message: "Market prices fetched and saved successfully",
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save market prices",
      error: error.message,
    });
  }
};

module.exports = {
  fetchMarketPrices,
};