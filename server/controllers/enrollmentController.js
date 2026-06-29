const db = require("../config/db");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcryptjs");
const sendApprovalMail = require("../utils/sendApprovalMail");
const sendRejectionMail = require("../utils/sendRejectionMail");

const createEnrollment = async (req, res) => {
  const {
    full_name,
    email,
    phone,
    country,
    course,
    education,
    message,
  } = req.body;

  const sql = `
    INSERT INTO enrollments
    (full_name, email, phone, country, course, education, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [full_name, email, phone, country, course, education, message],
    async (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      await sendMail({
        full_name,
        email,
        phone,
        course,
        education,
        message,
      });

      res.status(201).json({
        success: true,
        message: "Enrollment submitted successfully!",
      });
    }
  );
};

const approveEnrollment = async (req, res) => {
  const { id } = req.params;

  // Get enrollment
  db.query(
    "SELECT * FROM enrollments WHERE id = ?",
    [id],
    async (err, results) => {

      if (err)
        return res.status(500).json({
          success: false,
          message: "Database error",
        });

      if (results.length === 0)
        return res.status(404).json({
          success: false,
          message: "Enrollment not found",
        });

      const student = results[0];

      // Already approved?
      if (student.status === "Approved") {
        return res.json({
          success: false,
          message: "Already approved",
        });
      }

      // Generate temporary password
      const tempPassword = Math.random().toString(36).slice(-8);

      // Encrypt password
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      // Create user
      db.query(
        `INSERT INTO users
        (enrollment_id, full_name, email, password)
        VALUES (?, ?, ?, ?)`,
        [
          student.id,
          student.full_name,
          student.email,
          hashedPassword,
        ],
        (err, result) => {

          if (err)
            return res.status(500).json({
              success: false,
              message: err.code === "ER_DUP_ENTRY"
                ? "User already exists"
                : "Database Error",
            });

          // Update enrollment status
          db.query(
            "UPDATE enrollments SET status='Approved', user_id=? WHERE id=?",
            [result.insertId, id],
            async (err2) => {

              if (err2)
                return res.status(500).json({
                  success: false,
                  message: "Status update failed",
                });

              console.log("==================================================");
              console.log("🚀 APPROVAL PROCESS STARTED");

              console.log("Student Data:");
              console.log({
                name: student.full_name,
                email: student.email,
                course: student.course,
              });

              console.log("Generated Temporary Password:", tempPassword);
              console.log("==================================================");

              try {
                console.log("📨 Sending approval email...");

                await sendApprovalMail({
                  full_name: student.full_name,
                  email: student.email,
                  course: student.course,
                  temporaryPassword: tempPassword,
                });

                console.log("✅ Approval email successfully sent");
              } catch (err) {
                console.log("❌ Approval email FAILED:");
                console.log(err);
              }

              res.json({
                success: true,
                message: "Student approved",
                temporaryPassword: tempPassword
              });

            }
          );

        }
      );

    }
  );
};

const getEnrollments = (req, res) => {
  const sql = `
    SELECT *
    FROM enrollments
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: err,
      });
    }

    res.json(result);
  });
};

const getStudentEnrollments = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT *
    FROM enrollments
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json(result);
  });
};

const rejectEnrollment = (req, res) => {
  const { id } = req.params;

  // Get enrollment details
  db.query(
    "SELECT * FROM enrollments WHERE id = ?",
    [id],
    async (err, results) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Enrollment not found",
        });
      }

      const student = results[0];

      // Update status
      db.query(
        "UPDATE enrollments SET status='Rejected' WHERE id=?",
        [id],
        async (err2) => {

          if (err2) {
            return res.status(500).json({
              success: false,
              message: "Status update failed",
            });
          }

          try {

            await sendRejectionMail({
              full_name: student.full_name,
              email: student.email,
              course: student.course,
            });

          } catch (mailError) {
            console.log(mailError);
          }

          res.json({
            success: true,
            message: "Student rejected successfully",
          });

        }
      );

    }
  );
};


module.exports = {
  createEnrollment, approveEnrollment, getEnrollments, getStudentEnrollments, rejectEnrollment
};