const axios = require("axios");

const getRealMarketPrices = async (req, res) => {
  try {
    const { state, district, crop } = req.query;

    const params = {
      "api-key": process.env.DATA_GOV_API_KEY,
      format: "json",
      limit: 100,
    };

    if (state) {
      params["filters[State]"] = state;
    }

    if (district) {
      params["filters[District]"] = district;
    }

    if (crop) {
      params["filters[Commodity]"] = crop;
    }

    const response = await axios.get(
      "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24",
      { params }
    );

    const records = response.data.records || [];

    const formattedData = records.map((item) => ({
      state: item.State,
      district: item.District,
      market: item.Market,
      crop: item.Commodity,
      variety: item.Variety,
      minPrice: item.Min_Price,
      modalPrice: item.Modal_Price,
      maxPrice: item.Max_Price,
      date: item.Arrival_Date,
    }));

    res.status(200).json({
      success: true,
      totalRecords: formattedData.length,
      data: formattedData,
    });

  } catch (error) {
    console.error("MARKET API ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch market prices",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  getRealMarketPrices,
};