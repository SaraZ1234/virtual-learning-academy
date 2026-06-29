const express = require("express");
const router = express.Router();
const { createEnrollment } = require("../controllers/enrollmentController");

router.post("/enroll", createEnrollment);

module.exports = router;