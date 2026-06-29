const db = require("../config/db");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const generatePassword = require("../utils/generatePassword");

const approveEnrollment = (req, res) => {
  const { id } = req.params;

  // 1. Get enrollment first
  const getSql = "SELECT * FROM enrollments WHERE id = ?";

  db.query(getSql, [id], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    const enrollment = results[0];

    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 2. Insert into USERS table (IMPORTANT FIX)
    const insertUserSql = `
      INSERT INTO users 
      (enrollment_id, full_name, email, password, role)
      VALUES (?, ?, ?, ?, 'student')
    `;

    db.query(
      insertUserSql,
      [
        enrollment.id,
        enrollment.full_name || enrollment.name, // fallback safety
        enrollment.email,
        hashedPassword,
      ],
      (err2) => {
        if (err2) {
          return res.status(500).json({
            message: "User creation failed",
            error: err2,
          });
        }

        // 3. Update enrollment status
        const updateSql = `
          UPDATE enrollments
          SET status = 'Approved'
          WHERE id = ?
        `;

        db.query(updateSql, [id]);

        // 4. Send email
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: enrollment.email,
          subject: "Enrollment Approved - Login Credentials",
          text: `
Hello ${enrollment.full_name || enrollment.name},

Your enrollment has been APPROVED 🎉

Login Details:
Email: ${enrollment.email}
Password: ${plainPassword}

Please login and change your password after first login.

Regards,
Admin Team
          `,
        });

        res.json({
          success: true,
          message: "Enrollment approved, user created, email sent",
        });
      }
    );
  });
};

module.exports = { approveEnrollment };