const express = require("express");
const router = express.Router();

const {
  approveEnrollment,
} = require("../controllers/adminController");

// Approve Enrollment
router.put("/approve/:id", approveEnrollment);

module.exports = router;