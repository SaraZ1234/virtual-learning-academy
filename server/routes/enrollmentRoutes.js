const express = require("express");
const router = express.Router();

const {
  createEnrollment,
  approveEnrollment,
  rejectEnrollment,
  getEnrollments,
  getStudentEnrollments,
} = require("../controllers/enrollmentController");
const verifyToken = require("../middleware/authMiddleware");
// Student submits enrollment
router.post("/enroll", createEnrollment);

// Admin gets all enrollments
router.get("/enrollments", getEnrollments);

// Admin approves enrollment
router.patch("/enroll/:id/approve", approveEnrollment);

router.patch("/enroll/:id/reject", rejectEnrollment);

router.get(
  "/student/enrollments",
  verifyToken,
  getStudentEnrollments
);
module.exports = router;