
const Contact = require("../models/Contact");

// =========================
// CREATE CONTACT
// =========================
const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.error("Create contact error:", error);

    res.status(400).json({
      success: false,
      message: "Unable to send message",
    });
  }
};

// =========================
// GET ALL CONTACTS
// =========================
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch contact messages",
    });
  }
};

// =========================
// UPDATE CONTACT
// =========================
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact status updated successfully",
      contact,
    });
  } catch (error) {
    console.error("Update contact error:", error);

    res.status(400).json({
      success: false,
      message: "Unable to update contact message",
    });
  }
};

// =========================
// EXPORT CONTROLLERS
// =========================
module.exports = {
  createContact,
  getContacts,
  updateContact,
};
