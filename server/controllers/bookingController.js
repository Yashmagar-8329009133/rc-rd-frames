
const Booking = require("../models/Booking");

// =========================
// CREATE BOOKING
// =========================
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Booking submitted successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(400).json({
      success: false,
      message: "Unable to create booking",
    });
  }
};

// =========================
// GET ALL BOOKINGS
// =========================
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch bookings",
    });
  }
};

// =========================
// GET BOOKING BY ID
// =========================
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Get booking error:", error);

    res.status(400).json({
      success: false,
      message: "Invalid booking ID",
    });
  }
};

// =========================
// UPDATE BOOKING STATUS
// =========================
const updateBooking = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Update booking error:", error);

    res.status(400).json({
      success: false,
      message: "Unable to update booking",
    });
  }
};

// =========================
// DELETE BOOKING
// =========================
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      booking,
    });
  } catch (error) {
    console.error("Delete booking error:", error);

    res.status(400).json({
      success: false,
      message: "Invalid booking ID",
    });
  }
};

// =========================
// EXPORT CONTROLLERS
// =========================
module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};

