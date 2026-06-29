const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (formData) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ===========================================
    // EMAIL TO ADMIN
    // ===========================================

    const adminMail = {
      from: `"Hafsa Institute of International Learning and Research" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: formData.email,
      subject: "New Course Enrollment Received",

      html: `
        <h2>New Enrollment Details</h2>

        <p><strong>Name:</strong> ${formData.full_name}</p>

        <p><strong>Email:</strong> ${formData.email}</p>

        <p><strong>Phone:</strong> ${formData.phone}</p>

        <p><strong>Course:</strong> ${formData.course}</p>

        <p><strong>Education:</strong> ${formData.education}</p>

        <p><strong>Message:</strong> ${formData.message}</p>
      `,
    };

    await transporter.sendMail(adminMail);

    console.log("Admin email sent.");

    // ===========================================
    // EMAIL TO STUDENT
    // ===========================================

    const studentMail = {
      from: `"Virtual Learning Academy" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: "Enrollment Request Received",

      html: `
        <h2>Thank You for Your Enrollment!</h2>

        <p>Dear <strong>${formData.full_name}</strong>,</p>

        <p>
          We have successfully received your enrollment request for
          <strong>${formData.course}</strong>.
        </p>

        <p>
          Our admissions team will review your application within
          <strong>24 hours</strong>.
        </p>

        <p>
          Once your enrollment is approved, you will receive another
          email containing your login credentials so you can access
          your student dashboard.
        </p>

        <br>

        <p>Thank you for choosing Virtual Learning Academy.</p>

        <br>

        <p>Regards,</p>

        <h3>Hafsa Institute of International Learning and Research</h3>
      `,
    };

    await transporter.sendMail(studentMail);

    console.log("Student confirmation email sent.");

  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};

module.exports = sendMail;