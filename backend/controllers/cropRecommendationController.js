const getCropRecommendation = async (req, res) => {
  try {
    const { state, district, season, soilType } = req.body;

    if (!state || !district || !season || !soilType) {
      return res.status(400).json({
        success: false,
        message: "State, district, season and soil type are required",
      });
    }

    let recommendedCrops = [];
    let tips = [];
    let expectedYield = "";
    let marketDemand = "";

    if (season === "Kharif" && soilType === "Black Soil") {
      recommendedCrops = ["Cotton", "Maize", "Soybean", "Groundnut"];
      expectedYield = "Medium to High";
      marketDemand = "High";
      tips = [
        "Ensure proper drainage during heavy rainfall.",
        "Use certified seeds for better yield.",
        "Monitor crops for pest attacks during humid weather.",
      ];
    } else if (season === "Kharif" && soilType === "Red Soil") {
      recommendedCrops = ["Groundnut", "Millets", "Pulses", "Maize"];
      expectedYield = "Medium";
      marketDemand = "Medium to High";
      tips = [
        "Apply organic manure to improve soil fertility.",
        "Irrigate at regular intervals if rainfall is low.",
        "Use drought-resistant varieties.",
      ];
    } else if (season === "Rabi" && soilType === "Black Soil") {
      recommendedCrops = ["Wheat", "Bengal Gram", "Mustard", "Sunflower"];
      expectedYield = "High";
      marketDemand = "High";
      tips = [
        "Use residual soil moisture efficiently.",
        "Avoid over-irrigation.",
        "Apply fertilizers based on soil testing.",
      ];
    } else if (season === "Rabi" && soilType === "Red Soil") {
      recommendedCrops = ["Chickpea", "Groundnut", "Millets", "Vegetables"];
      expectedYield = "Medium";
      marketDemand = "Medium";
      tips = [
        "Use mulching to conserve soil moisture.",
        "Select short-duration crop varieties.",
        "Protect crops from low temperature stress.",
      ];
    } else if (season === "Zaid") {
      recommendedCrops = ["Watermelon", "Muskmelon", "Cucumber", "Vegetables"];
      expectedYield = "Medium to High";
      marketDemand = "High";
      tips = [
        "Provide frequent irrigation due to high temperature.",
        "Use mulching to reduce evaporation.",
        "Avoid pesticide spraying during peak afternoon heat.",
      ];
    } else {
      recommendedCrops = ["Paddy", "Maize", "Groundnut", "Vegetables"];
      expectedYield = "Medium";
      marketDemand = "Medium";
      tips = [
        "Select crops based on local climate and water availability.",
        "Consult local agriculture officers for best varieties.",
      ];
    }

    res.status(200).json({
      success: true,
      state,
      district,
      season,
      soilType,
      recommendedCrops,
      expectedYield,
      marketDemand,
      tips,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to recommend crops",
      error: error.message,
    });
  }
};

module.exports = {
  getCropRecommendation,
};