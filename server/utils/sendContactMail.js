const axios = require("axios");
require("dotenv").config();

const sendContactMail = async (formData) => {
  try {

    console.log("========== BREVO CONTACT MAIL ==========");
    console.log("SENDER:", process.env.EMAIL_USER);
    console.log("ADMIN RECEIVER:", process.env.EMAIL_RECEIVER);
    console.log(
      "BREVO KEY:",
      process.env.BREVO_API_KEY ? "AVAILABLE" : "MISSING"
    );
    console.log("========================================");


    // ==========================
    // Email to Admin
    // ==========================

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
        name: formData.name,
      },

      subject: `New Contact Form: ${formData.subject}`,


      htmlContent: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${formData.name}</p>

        <p><strong>Email:</strong> ${formData.email}</p>

        <p><strong>Phone:</strong> ${
          formData.phone || "Not provided"
        }</p>

        <p><strong>Subject:</strong> ${formData.subject}</p>

        <hr>

        <p><strong>Message:</strong></p>

        <p>${formData.message}</p>
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


    console.log("✅ Contact email sent to admin");


    // ==========================
    // Confirmation Email to User
    // ==========================

    const userMail = {

      sender: {
        name: "Hafsa Institute of International Learning and Research",
        email: process.env.EMAIL_USER,
      },


      to: [
        {
          email: formData.email,
          name: formData.name,
        },
      ],


      subject: "We've Received Your Message",


      htmlContent: `
        <h2>Thank You for Contacting Us!</h2>

        <p>
          Dear <strong>${formData.name}</strong>,
        </p>


        <p>
          Thank you for contacting
          <strong>Hafsa Institute of International Learning and Research</strong>.
        </p>


        <p>
          We have successfully received your message regarding
          <strong>${formData.subject}</strong>.
        </p>


        <p>
          Our team will review your message and get back to you as soon as possible.
        </p>


        <br>

        <p>Regards,</p>

        <h3>
          Hafsa Institute of International Learning and Research
        </h3>
      `,
    };


    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      userMail,
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );


    console.log("✅ Confirmation email sent to user");


  } catch (error) {

    console.log("========== BREVO CONTACT ERROR ==========");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    } else {
      console.log(error.message);
    }

    console.log("=========================================");

    throw error;
  }
};


module.exports = sendContactMail;