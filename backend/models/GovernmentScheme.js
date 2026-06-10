const mongoose = require("mongoose");

const governmentSchemeSchema = new mongoose.Schema(
  {
    schemeName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    eligibility: {
      type: String,
      required: true,
    },

    benefits: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "GovernmentScheme",
  governmentSchemeSchema
);