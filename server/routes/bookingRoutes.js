
const express = require("express");

const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// PUBLIC ROUTE
// =========================

// Customer creates a booking
router.post("/", createBooking);

// =========================
// PROTECTED ADMIN ROUTES
// =========================

// Admin gets all bookings
router.get("/", authMiddleware, getBookings);

// Admin gets one booking
router.get("/:id", authMiddleware, getBookingById);

// Admin updates booking status/details
router.put("/:id", authMiddleware, updateBooking);

// Admin deletes a booking
router.delete("/:id", authMiddleware, deleteBooking);

module.exports = router;

