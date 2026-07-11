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
    // ==========================
    // DEBUG LOGS
    // ==========================
    console.log("========== SMTP DEBUG ==========");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log("SMTP HOST: smtp-relay.brevo.com");
    console.log("SMTP PORT: 587");
    console.log("================================");

    // ==========================
    // SMTP TRANSPORT
    // ==========================
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ==========================
    // VERIFY CONNECTION
    // ==========================
    console.log("Verifying SMTP connection...");

    await transporter.verify();

    console.log("✅ Brevo SMTP Connected Successfully");

    // ==========================
    // SEND EMAIL
    // ==========================
    const info = await transporter.sendMail({
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

    console.log("✅ Email sent successfully.");
    console.log("Message ID:", info.messageId);

    return info;

  } catch (error) {
    console.error("❌ EMAIL ERROR");
    console.error("Name:", error.name);
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Message:", error.message);
    console.error(error);

    throw error;
  }
};

module.exports = sendZoomMail;