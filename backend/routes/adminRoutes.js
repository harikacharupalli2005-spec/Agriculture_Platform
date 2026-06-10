const express = require("express");
const router = express.Router();

const {
  getAdminDashboard,
} = require("../controllers/adminController");

const authMiddleware =
require("../middleware/authMiddleware");

const allowRoles =
require("../middleware/roleMiddleware");

router.get(
  "/dashboard",
  authMiddleware,
  allowRoles("admin"),
  getAdminDashboard
);

module.exports = router;