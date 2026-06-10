const express = require("express");
const router = express.Router();

const {
  generateMarketAlert,
} = require(
  "../controllers/autoNotificationController"
);

const authMiddleware =
  require("../middleware/authMiddleware");

const allowRoles =
  require("../middleware/roleMiddleware");

router.post(
  "/market-alert",
  authMiddleware,
  allowRoles("admin"),
  generateMarketAlert
);

module.exports = router;