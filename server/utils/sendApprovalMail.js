const nodemailer = require("nodemailer");
require("dotenv").config();

const sendApprovalMail = async ({
  full_name,
  email,
  course,
  temporaryPassword,
}) => {
  console.log("==================================================");
  console.log("📩 sendApprovalMail() CALLED");
  console.log("INPUT DATA:", {
    full_name,
    email,
    course,
    temporaryPassword,
  });
  console.log("==================================================");

  // 🔴 INPUT VALIDATION DEBUG
  if (!email || !temporaryPassword) {
    console.log("❌ VALIDATION FAILED: Missing required fields");
    console.log({ email, temporaryPassword });
    return;
  }

  try {
    console.log("🔧 Creating transporter...");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔴 VERIFY SMTP CONNECTION
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    console.log("📤 Sending email to:", email);

    const info = await transporter.sendMail({
      from: `"Hafsa Institute of International Learning and Research" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Your Enrollment Has Been Approved",

      html: `
        <h2>Account Approved</h2>

        <p><b>Name:</b> ${full_name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Course:</b> ${course}</p>
        <p><b>Temporary Password:</b> ${temporaryPassword}</p>

        <hr/>
        <p>Please login and change your password immediately.</p>

        <h3>Virtual Learning Academy</h3>
      `,
    });

    // 🔴 EMAIL RESPONSE DEBUG
    console.log("📬 EMAIL RESPONSE:");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);

    if (info.rejected.length > 0) {
      console.log("❌ EMAIL REJECTED:", info.rejected);
    }

    console.log("✅ Approval email sent successfully");
    console.log("==================================================");

  } catch (error) {
    console.log("❌ APPROVAL EMAIL ERROR:");
    console.log(error);
    console.log("==================================================");
    throw error;
  }
};

module.exports = sendApprovalMail;