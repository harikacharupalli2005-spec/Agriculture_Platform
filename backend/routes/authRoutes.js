const express = require("express");
const router = express.Router();

const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

const {
  registerUser,
  loginUser,
  testEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// Signup
router.post("/signup", registerUser);

// Login
router.post("/login", loginUser);

// Test Email
router.get("/test-email", testEmail);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// =========================
// GOOGLE LOGIN
// =========================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:
      "http://127.0.0.1:5500/frontend/pages/login.html",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.redirect(
      `http://127.0.0.1:5500/frontend/pages/categories.html?token=${token}&name=${encodeURIComponent(
        req.user.name
      )}&email=${encodeURIComponent(
        req.user.email
      )}&role=${req.user.role}`
    );
  }
);

module.exports = router;