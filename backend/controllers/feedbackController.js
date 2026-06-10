const Feedback = require("../models/Feedback");

// Add Feedback
const addFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);

    await feedback.save();

    res.status(201).json({
      message: "Feedback Submitted",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};

// Get All Feedback
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("userId", "name email");

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};

module.exports = {
  addFeedback,
  getFeedbacks,
};