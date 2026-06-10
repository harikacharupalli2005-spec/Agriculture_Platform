const express = require("express");
const router = express.Router();

const {
  addScheme,
  getSchemes,
} = require(
  "../controllers/governmentSchemeController"
);

router.post("/", addScheme);
router.get("/", getSchemes);

module.exports = router;