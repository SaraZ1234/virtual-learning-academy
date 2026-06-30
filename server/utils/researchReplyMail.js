const nodemailer = require("nodemailer");
require("dotenv").config();

const sendResearchReplyMail = async ({ to, full_name, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Hafsa Institute of International Learning and Research" <${process.env.EMAIL_USER}>`,
      to,
      subject,

      html: `
        <h2>Research Order Update</h2>

        <p>Dear <strong>${full_name}</strong>,</p>

        <p>${message}</p>

        <br>

        <p>If you have any questions, feel free to reply to this email.</p>

        <br>

        <p>Regards,</p>

        <h3>Hafsa Institute of International Learning and Research</h3>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("Research reply email sent.");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw error;
  }
};

module.exports = sendResearchReplyMail;