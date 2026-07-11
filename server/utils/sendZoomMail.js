const axios = require("axios");
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

    console.log("========== BREVO CHECK ==========");
    console.log("EMAIL USER:", process.env.EMAIL_USER);
    console.log(
      "BREVO KEY:",
      process.env.BREVO_API_KEY ? "AVAILABLE" : "MISSING"
    );
    console.log("=================================");


    const emailData = {
      sender: {
        name: "Hafsa Institute of International Learning and Research",
        email: process.env.EMAIL_USER,
      },

      to: [
        {
          email: email,
          name: full_name,
        },
      ],

      subject: "Your Zoom Session Has Been Approved",

      htmlContent: `
        <h2>Hello ${full_name},</h2>

        <p>Your Zoom session has been approved.</p>

        <p><strong>Course:</strong> ${course}</p>

        <p>
          <strong>Date:</strong>
          ${new Date(preferred_date).toDateString()}
        </p>

        <p>
          <strong>Time:</strong>
          ${preferred_time}
        </p>

        <hr>

        <p><strong>Meeting Link:</strong></p>

        <a href="${meeting_link}">
          ${meeting_link}
        </a>

        <p>
          <strong>Meeting ID:</strong>
          ${meeting_id}
        </p>

        <p>
          <strong>Password:</strong>
          ${meeting_password}
        </p>

        <br>

        <p>Regards,</p>

        <h3>
          Hafsa Institute of International Learning and Research
        </h3>
      `,
    };


    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      emailData,
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );


    console.log("Email sent successfully:", response.data);

    return response.data;


  } catch (error) {

    console.log("========== BREVO ERROR ==========");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    } else {
      console.log(error.message);
    }

    console.log("=================================");

    throw error;
  }
};


module.exports = sendZoomMail;