const User = require("../models/User");
const DiseasePrediction = require("../models/DiseasePrediction");

const getDashboard = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select("-password");

    const totalPredictions =
      await DiseasePrediction.countDocuments({
        userId,
      });

    const recentPredictions =
      await DiseasePrediction.find({
        userId,
      })
        .sort({ createdAt: -1 })
        .limit(5);

    res.status(200).json({
      user,
      totalPredictions,
      recentPredictions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};