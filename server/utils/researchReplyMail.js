const axios = require("axios");
require("dotenv").config();

const sendResearchReplyMail = async ({
  to,
  full_name,
  subject,
  message,
}) => {
  try {

    console.log("========== BREVO RESEARCH REPLY ==========");
    console.log("SENDER:", process.env.EMAIL_USER);
    console.log("RECEIVER:", to);
    console.log(
      "BREVO KEY:",
      process.env.BREVO_API_KEY ? "AVAILABLE" : "MISSING"
    );
    console.log("==========================================");


    const emailData = {

      sender: {
        name: "Hafsa Institute of International Learning and Research",
        email: process.env.EMAIL_USER,
      },

      to: [
        {
          email: to,
          name: full_name,
        },
      ],

      subject: subject,

      htmlContent: `
        <h2>Research Order Update</h2>

        <p>
          Dear <strong>${full_name}</strong>,
        </p>

        <p>
          ${message}
        </p>

        <br>

        <p>
          If you have any questions, feel free to reply to this email.
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


    console.log("Research reply email sent successfully:", response.data);


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


module.exports = sendResearchReplyMail;