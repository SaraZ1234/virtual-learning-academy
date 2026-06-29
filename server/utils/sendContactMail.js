const nodemailer = require("nodemailer");
require("dotenv").config();

const sendContactMail = async (formData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ==========================
    // Email to Admin
    // ==========================
    const adminMail = {
      from: `"Virtual Learning Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: formData.email,
      subject: `New Contact Form: ${formData.subject}`,

      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>

        <hr>

        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    };

    await transporter.sendMail(adminMail);

    console.log("✅ Contact email sent to admin.");

    // ==========================
    // Confirmation Email to User
    // ==========================
    const userMail = {
      from: `"Hafsa Institute of International Learning and Research" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: "We've Received Your Message",

      html: `
        <h2>Thank You for Contacting Us!</h2>

        <p>Dear <strong>${formData.name}</strong>,</p>

        <p>
          Thank you for contacting <strong>Virtual Learning Academy</strong>.
          We have successfully received your message regarding
          <strong>${formData.subject}</strong>.
        </p>

        <p>
          Our team will review your message and get back to you as soon as possible.
        </p>

        <br>

        <p>Regards,</p>
        <h3>Virtual Learning Academy</h3>
      `,
    };

    await transporter.sendMail(userMail);

    console.log("✅ Confirmation email sent to user.");
  } catch (error) {
    console.log("CONTACT EMAIL ERROR:", error);
    throw error;
  }
};

module.exports = sendContactMail;