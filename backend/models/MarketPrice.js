const mongoose = require("mongoose");

const marketPriceSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
    },

    marketPrice: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      default: "Quintal",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MarketPrice",
  marketPriceSchema
);