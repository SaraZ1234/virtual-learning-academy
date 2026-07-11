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
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  requireTLS: true,
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

await transporter.verify();
console.log("SMTP Connected Successfully");

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

  console.log("Zoom email sent successfully.");
};

module.exports = sendZoomMail;