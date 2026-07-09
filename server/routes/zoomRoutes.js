const express = require("express");
const router = express.Router();

const {
  bookZoom,
  getAllBookings, approveBooking
} = require("../controllers/zoomController");

// Book Zoom Session
router.post("/book", bookZoom);

// Get All Zoom Bookings (Admin)
router.get("/all", getAllBookings);

router.put("/approve/:id", approveBooking);

module.exports = router;