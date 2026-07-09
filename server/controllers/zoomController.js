const db = require("../config/db");
const { createZoomMeeting } = require("../services/zoomService");
const sendZoomMail = require("../utils/sendZoomMail");

// Book Zoom Session
exports.bookZoom = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      course,
      preferred_date,
      preferred_time,
    } = req.body;

    // Validation
    if (
      !full_name ||
      !email ||
      !phone ||
      !course ||
      !preferred_date ||
      !preferred_time
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const sql = `
      INSERT INTO zoom_bookings
      (
        full_name,
        email,
        phone,
        course,
        preferred_date,
        preferred_time
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        full_name,
        email,
        phone,
        course,
        preferred_date,
        preferred_time,
      ],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Database Error",
          });
        }

        return res.status(201).json({
          success: true,
          message: "Zoom session booked successfully.",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Zoom Bookings
exports.getAllBookings = (req, res) => {

  const sql = `
    SELECT *
    FROM zoom_bookings
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });

  });

};

// Approve Zoom Booking
// Approve Zoom Booking
exports.approveBooking = (req, res) => {
  const { id } = req.params;

  // 1. Get booking from database
  db.query(
    "SELECT * FROM zoom_bookings WHERE id = ?",
    [id],
    async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Booking not found.",
        });
      }

      const booking = results[0];

      try {
        // 2. Create Zoom Meeting
        const meeting = await createZoomMeeting(
          booking.course,
          `${booking.preferred_date.toISOString().split("T")[0]}T${booking.preferred_time}`
        );

        // 3. Update booking
        db.query(
          `UPDATE zoom_bookings
           SET
             meeting_link = ?,
             meeting_id = ?,
             meeting_password = ?,
             status = 'Approved'
           WHERE id = ?`,
          [
            meeting.join_url,
            meeting.id,
            meeting.password,
            id,
          ],
          async (err2) => {
            if (err2) {
              console.log(err2);
              return res.status(500).json({
                success: false,
                message: "Database Error",
              });
            }

            // 4. Send Email
            await sendZoomMail({
              full_name: booking.full_name,
              email: booking.email,
              course: booking.course,
              preferred_date: booking.preferred_date,
              preferred_time: booking.preferred_time,
              meeting_link: meeting.join_url,
              meeting_id: meeting.id,
              meeting_password: meeting.password,
            });

            return res.json({
              success: true,
              message:
                "Zoom meeting created and email sent successfully.",
            });
          }
        );
      } catch (error) {
        console.log(error);

        return res.status(500).json({
          success: false,
          message: "Failed to create Zoom meeting.",
        });
      }
    }
  );
};