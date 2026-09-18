const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rc-rd-frames-2.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

// =========================
// HEALTH CHECK
// =========================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RC & RD Frames API is running",
  });
});

// =========================
// API ROUTES
// =========================

app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// =========================
// 404 HANDLER
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();