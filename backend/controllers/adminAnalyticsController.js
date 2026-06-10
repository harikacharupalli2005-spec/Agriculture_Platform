const User = require("../models/User");
const DiseasePrediction = require("../models/DiseasePrediction");
const Feedback = require("../models/Feedback");
const Notification = require("../models/Notification");

const getAdminAnalytics = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const predictions =
      await DiseasePrediction.countDocuments();
    const feedbacks =
      await Feedback.countDocuments();
    const notifications =
      await Notification.countDocuments();

    const latestPredictions =
      await DiseasePrediction.find()
        .sort({ createdAt: -1 })
        .limit(5);

    res.status(200).json({
      users,
      predictions,
      feedbacks,
      notifications,
      latestPredictions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Analytics Failed",
      error: error.message,
    });
  }
};

module.exports = {
  getAdminAnalytics,
};