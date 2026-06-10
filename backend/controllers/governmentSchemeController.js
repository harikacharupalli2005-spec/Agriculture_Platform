const GovernmentScheme = require(
  "../models/GovernmentScheme"
);

const addScheme = async (req, res) => {
  try {
    const scheme = new GovernmentScheme(req.body);

    await scheme.save();

    res.status(201).json({
      message: "Scheme Added Successfully",
      scheme,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};

const getSchemes = async (req, res) => {
  try {
    const schemes = await GovernmentScheme.find();

    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};

module.exports = {
  addScheme,
  getSchemes,
};