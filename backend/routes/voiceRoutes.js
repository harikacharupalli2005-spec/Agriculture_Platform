const express = require("express");
const router = express.Router();

const {
  askVoiceQuestion,
  getVoiceHistory,
} = require("../controllers/voiceController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.post(
  "/ask",
  authMiddleware,
  askVoiceQuestion
);

router.get(
  "/history/:userId",
  authMiddleware,
  getVoiceHistory
);

module.exports = router;