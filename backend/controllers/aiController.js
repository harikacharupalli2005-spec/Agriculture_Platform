const axios = require("axios");
const DiseasePrediction = require("../models/DiseasePrediction");

// Save AI prediction
const predictDisease = async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/predict`,
      {
        image: req.body.image,
      }
    );

    const prediction = new DiseasePrediction({
      userId: req.body.userId,
      image: req.body.image,
      disease: response.data.disease,
      confidence: response.data.confidence,
      solution: response.data.solution,
    });

    await prediction.save();

    res.status(200).json({
      message: "Prediction saved successfully",
      prediction,
    });
  } catch (error) {
    console.error("AI ERROR FULL:");
    console.error(error.response?.data);
    console.error(error.message);

    res.status(500).json({
      message: "AI Service Error",
      error: error.response?.data || error.message,
    });
  }
};

// Get prediction history
const getPredictionHistory = async (req, res) => {
  try {
    const predictions = await DiseasePrediction.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch history",
      error: error.message,
    });
  }
};

module.exports = {
  predictDisease,
  getPredictionHistory,
};