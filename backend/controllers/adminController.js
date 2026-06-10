const User = require("../models/User");
const DiseasePrediction = require("../models/DiseasePrediction");
const Feedback = require("../models/Feedback");
const Alert = require("../models/Alert");
const GovernmentScheme = require("../models/GovernmentScheme");

const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalPredictions =
      await DiseasePrediction.countDocuments();

    const totalFeedbacks =
      await Feedback.countDocuments();

    const totalAlerts =
      await Alert.countDocuments();

    const totalSchemes =
      await GovernmentScheme.countDocuments();

    res.status(200).json({
      totalUsers,
      totalPredictions,
      totalFeedbacks,
      totalAlerts,
      totalSchemes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load admin dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  getAdminDashboard,
};