const Notification = require("../models/Notification");

// Add notification
const addNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);

    await notification.save();

    res.status(201).json({
      message: "Notification Added Successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add notification",
      error: error.message,
    });
  }
};

// Get notifications by user
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notification",
      error: error.message,
    });
  }
};

module.exports = {
  addNotification,
  getUserNotifications,
  markAsRead,
};