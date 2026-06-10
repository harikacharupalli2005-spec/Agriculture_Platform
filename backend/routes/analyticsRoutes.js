const express = require("express");

const router = express.Router();

const {
  getAnalytics,
} = require("../controllers/analyticsController");

const authMiddleware =
  require("../middleware/authMiddleware");

const allowRoles =
  require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  allowRoles("admin"),
  getAnalytics
);

module.exports = router;