const express = require("express");

const {
  createAdmin,
  loginAdmin,
  changePassword,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", createAdmin);

router.post("/login", loginAdmin);

router.put("/change-password", authMiddleware, changePassword);

module.exports = router;