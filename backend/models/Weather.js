const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
  {
    district: {
      type: String,
      required: true,
    },

    temperature: {
      type: Number,
      required: true,
    },

    humidity: {
      type: Number,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    rainChance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Weather",
  weatherSchema
);