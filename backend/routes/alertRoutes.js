const express = require("express");
const router = express.Router();

const {
  addAlert,
  getAlerts,
} = require("../controllers/alertController");

router.post("/", addAlert);
router.get("/", getAlerts);

module.exports = router;