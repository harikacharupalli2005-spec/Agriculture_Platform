const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./config/db");
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const aiRoutes = require("./routes/aiRoutes");
const marketPriceRoutes = require(
  "./routes/marketPriceRoutes"
);
const dashboardRoutes =
require("./routes/dashboardRoutes");
const cropRecommendationRoutes =
require("./routes/cropRecommendationRoutes");
const weatherRoutes =
require("./routes/weatherRoutes");
const alertRoutes =
require("./routes/alertRoutes");
const governmentSchemeRoutes =
require("./routes/governmentSchemeRoutes");
const feedbackRoutes =
require("./routes/feedbackRoutes");
const adminRoutes =
require("./routes/adminRoutes");
const analyticsRoutes =
require("./routes/analyticsRoutes");
const marketPriceAutoFetchRoutes =
require("./routes/marketPriceAutoFetchRoutes");
const notificationRoutes =
require("./routes/notificationRoutes");
const profileRoutes =
require("./routes/profileRoutes");
const voiceRoutes =
require("./routes/voiceRoutes");
const marketTrendRoutes =
require("./routes/marketTrendRoutes");
const adminAnalyticsRoutes =
require("./routes/adminAnalyticsRoutes");
const autoNotificationRoutes =
require("./routes/autoNotificationRoutes");
const realMarketRoutes =
require("./routes/realMarketRoutes");
const realWeatherRoutes = require("./routes/realWeatherRoutes");
// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "google-login-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/ai", aiRoutes);
app.use(
  "/api/market-prices",
  marketPriceRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/crop-recommendation",
  cropRecommendationRoutes
);
app.use(
  "/api/weather",
  weatherRoutes
);
app.use(
  "/api/alerts",
  alertRoutes
);
app.use(
  "/api/feedback",
  feedbackRoutes
);
app.use(
  "/api/schemes",
  governmentSchemeRoutes
);
app.use(
  "/api/admin",
  adminRoutes
);
app.use(
  "/api/analytics",
  analyticsRoutes
);
app.use(
  "/api/market-auto",
  marketPriceAutoFetchRoutes
);
app.use("/api/notifications", notificationRoutes);
app.use(
  "/api/profile",
  profileRoutes
);
app.use(
  "/api/voice",
  voiceRoutes
);
app.use(
  "/api/market-trends",
  marketTrendRoutes
);
app.use(
  "/api/admin-analytics",
  adminAnalyticsRoutes
);
app.use(
  "/api/auto-notifications",
  autoNotificationRoutes
);
app.use(
  "/api/real-market",
  realMarketRoutes
);
app.use("/api/real-weather", realWeatherRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Agriculture Platform Backend Running...");
});

// Server
const PORT = process.env.PORT || 5000;
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(500).json({
    message: "Server Error",
    error: err.message,
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});