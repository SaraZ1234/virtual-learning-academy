const nodemailer = require("nodemailer");
require("dotenv").config();

const sendZoomMail = async ({
  full_name,
  email,
  course,
  preferred_date,
  preferred_time,
  meeting_link,
  meeting_id,
  meeting_password,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log("✅ Brevo SMTP Connected Successfully");

    // Send Email
    await transporter.sendMail({
      from: `"Hafsa Institute of International Learning and Research" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Zoom Session Has Been Approved",

      html: `
        <h2>Hello ${full_name},</h2>

        <p>Your Zoom session has been approved.</p>

        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Date:</strong> ${preferred_date}</p>
        <p><strong>Time:</strong> ${preferred_time}</p>

        <hr>

        <p><strong>Meeting Link:</strong></p>
        <a href="${meeting_link}">${meeting_link}</a>

        <p><strong>Meeting ID:</strong> ${meeting_id}</p>
        <p><strong>Password:</strong> ${meeting_password}</p>

        <br>

        <p>Regards,</p>

        <h3>Hafsa Institute of International Learning and Research</h3>
      `,
    });

    console.log("✅ Zoom email sent successfully.");
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw error;
  }
};

module.exports = sendZoomMail;