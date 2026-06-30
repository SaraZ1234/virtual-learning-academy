const nodemailer = require("nodemailer");
require("dotenv").config();

const sendResearchOrderMail = async (formData) => {
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
      subject: "New Research Order Received",

      html: `
        <h2>New Research Order Details</h2>

        <p><strong>Name:</strong> ${formData.full_name}</p>

        <p><strong>Email:</strong> ${formData.email}</p>

        <p><strong>Phone:</strong> ${formData.phone}</p>

        <p><strong>Research Service:</strong> ${formData.service}</p>

        <p><strong>Subject/Topic:</strong> ${formData.subject}</p>

        <p><strong>Deadline:</strong> ${formData.deadline}</p>

        <p><strong>Requirements:</strong></p>

        <p>${formData.requirements}</p>
      `,
    };

    await transporter.sendMail(adminMail);

    console.log("Research order email sent to admin.");

    // ===========================================
    // EMAIL TO CUSTOMER
    // ===========================================

    const customerMail = {
      from: `"Hafsa Institute of International Learning and Research" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: "Research Order Request Received",

      html: `
        <h2>Thank You for Your Research Order!</h2>

        <p>Dear <strong>${formData.full_name}</strong>,</p>

        <p>
          We have successfully received your request for
          <strong>${formData.service}</strong>.
        </p>

        <p>
          Our research team is currently reviewing your submitted details.
          One of our experts will contact you within
          <strong>24 hours</strong> regarding your order.
        </p>

        <p>
          If additional information is required, we will reach out using
          the email address or phone number you provided.
        </p>

        <p>
          Thank you for choosing
          <strong>Hafsa Institute of International Learning and Research</strong>.
          We look forward to assisting you with your research project.
        </p>

        <br>

        <p>Best Regards,</p>

        <h3>Hafsa Institute of International Learning and Research</h3>
      `,
    };

    await transporter.sendMail(customerMail);

    console.log("Customer confirmation email sent.");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};

module.exports = sendResearchOrderMail;