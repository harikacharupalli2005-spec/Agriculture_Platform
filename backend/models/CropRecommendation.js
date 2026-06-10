const mongoose = require("mongoose");

const cropRecommendationSchema = new mongoose.Schema(
  {
    district: {
      type: String,
      required: true,
    },

    season: {
      type: String,
      required: true,
    },

    soilType: {
      type: String,
      required: true,
    },

    recommendedCrops: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CropRecommendation",
  cropRecommendationSchema
);