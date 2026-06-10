const User = require("../models/User");
const DiseasePrediction = require("../models/DiseasePrediction");
const Feedback = require("../models/Feedback");

const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalPredictions =
      await DiseasePrediction.countDocuments();

    const totalFeedbacks =
      await Feedback.countDocuments();

    let averageRating = 0;

    const ratings = await Feedback.find();

    if (ratings.length > 0) {
      const totalRating = ratings.reduce(
        (sum, item) => sum + item.rating,
        0
      );

      averageRating =
        (totalRating / ratings.length).toFixed(1);
    }

    const diseaseStats =
      await DiseasePrediction.aggregate([
        {
          $group: {
            _id: "$disease",
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: 1,
        },
      ]);

    const topDisease =
      diseaseStats.length > 0
        ? diseaseStats[0]._id
        : "No Data";

    res.status(200).json({
      totalUsers,
      totalPredictions,
      totalFeedbacks,
      averageRating,
      topDisease,
    });
  } catch (error) {
    res.status(500).json({
      message: "Analytics Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};