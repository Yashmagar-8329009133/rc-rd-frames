const express = require("express");

const {
  createContact,
  getContacts,
  updateContact,
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// PUBLIC ROUTE
// =========================

router.post("/", createContact);

// =========================
// PROTECTED ADMIN ROUTES
// =========================

router.get("/", authMiddleware, getContacts);

router.put("/:id", authMiddleware, updateContact);

module.exports = router;