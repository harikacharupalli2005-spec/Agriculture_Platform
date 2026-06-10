const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.get(
  "/:userId",
  authMiddleware,
  getProfile
);

router.put(
  "/:userId",
  authMiddleware,
  updateProfile
);

module.exports = router;