const axios = require("axios");
require("dotenv").config();

const sendResearchOrderMail = async (formData) => {
  try {

    console.log("========== BREVO RESEARCH ORDER ==========");
    console.log("SENDER:", process.env.EMAIL_USER);
    console.log("BREVO KEY:", process.env.BREVO_API_KEY ? "AVAILABLE" : "MISSING");
    console.log("==========================================");


    // ==============================
    // EMAIL TO ADMIN
    // ==============================

    const adminMail = {
      sender: {
        name: "Hafsa Institute of International Learning and Research",
        email: process.env.EMAIL_USER,
      },

      to: [
        {
          email: process.env.EMAIL_RECEIVER,
          name: "Admin",
        },
      ],

      replyTo: {
        email: formData.email,
        name: formData.full_name,
      },

      subject: "New Research Order Received",

      htmlContent: `
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


    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      adminMail,
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );


    console.log("Admin research order email sent");


    // ==============================
    // EMAIL TO CUSTOMER
    // ==============================

    const customerMail = {
      sender: {
        name: "Hafsa Institute of International Learning and Research",
        email: process.env.EMAIL_USER,
      },

      to: [
        {
          email: formData.email,
          name: formData.full_name,
        },
      ],

      subject: "Research Order Request Received",

      htmlContent: `
        <h2>Thank You for Your Research Order!</h2>

        <p>
          Dear <strong>${formData.full_name}</strong>,
        </p>

        <p>
          We have successfully received your request for
          <strong>${formData.service}</strong>.
        </p>

        <p>
          Our research team is currently reviewing your submitted details.
          One of our experts will contact you within
          <strong>24 hours</strong>.
        </p>

        <p>
          If additional information is required, we will reach out using
          the contact details you provided.
        </p>

        <p>
          Thank you for choosing
          <strong>
          Hafsa Institute of International Learning and Research
          </strong>.
        </p>

        <br>

        <p>Best Regards,</p>

        <h3>
          Hafsa Institute of International Learning and Research
        </h3>
      `,
    };


    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      customerMail,
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );


    console.log("Customer confirmation email sent");


  } catch (error) {

    console.log("========== BREVO ERROR ==========");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    } else {
      console.log(error.message);
    }

    console.log("=================================");
  }
};


module.exports = sendResearchOrderMail;