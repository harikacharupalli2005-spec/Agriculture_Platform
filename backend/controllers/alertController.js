const Alert = require("../models/Alert");

// Add Alert
const addAlert = async (req, res) => {
  try {
    const alert = new Alert(req.body);

    await alert.save();

    res.status(201).json({
      message: "Alert Added Successfully",
      alert,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};

// Get Alerts
const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .sort({ createdAt: -1 });

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};

module.exports = {
  addAlert,
  getAlerts,
};