const express = require("express");
const router = express.Router();

const {
  addNotification,
  getUserNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  allowRoles("admin"),
  addNotification
);

router.get(
  "/user/:userId",
  authMiddleware,
  getUserNotifications
);

router.put(
  "/read/:id",
  authMiddleware,
  markAsRead
);

module.exports = router;