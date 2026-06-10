const VoiceQuery = require("../models/VoiceQuery");

const askVoiceQuestion = async (req, res) => {
  try {
    const { userId, question, language } = req.body;

    let answer = "";

    if (language === "Telugu") {
      answer =
        "మీ ప్రశ్న నమోదు చేయబడింది. రైతు సహాయ సమాధానం ఇక్కడ చూపబడుతుంది.";
    } else {
      answer =
        "Your question has been recorded. Farmer assistance response will appear here.";
    }

    const voiceQuery = new VoiceQuery({
      userId,
      question,
      answer,
      language,
    });

    await voiceQuery.save();

    res.status(200).json({
      message: "Voice Query Processed",
      voiceQuery,
    });
  } catch (error) {
    res.status(500).json({
      message: "Voice Query Failed",
      error: error.message,
    });
  }
};

const getVoiceHistory = async (req, res) => {
  try {
    const history = await VoiceQuery.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch history",
      error: error.message,
    });
  }
};

module.exports = {
  askVoiceQuestion,
  getVoiceHistory,
};