const express = require("express");
const router = express.Router();

const {
  getAdminAnalytics,
} = require(
  "../controllers/adminAnalyticsController"
);

const authMiddleware =
  require("../middleware/authMiddleware");

const allowRoles =
  require("../middleware/roleMiddleware");

router.get(
  "/",
  authMiddleware,
  allowRoles("admin"),
  getAdminAnalytics
);

module.exports = router;