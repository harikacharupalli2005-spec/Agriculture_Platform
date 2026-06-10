const Notification = require("../models/Notification");
const User = require("../models/User");

const generateMarketAlert = async (
  req,
  res
) => {
  try {
    const users = await User.find();

    for (const user of users) {
      await Notification.create({
        userId: user._id,
        title: "Market Price Update",
        message:
          "Tomato prices increased today.",
        type: "market",
      });
    }

    res.status(200).json({
      message:
        "Notifications generated successfully",
      totalUsers: users.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Generation Failed",
      error: error.message,
    });
  }
};

module.exports = {
  generateMarketAlert,
};