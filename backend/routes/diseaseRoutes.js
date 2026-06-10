const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Upload image route
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      image: req.file.filename,
      path: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      message: "Image upload failed",
      error: error.message,
    });
  }
});

module.exports = router;