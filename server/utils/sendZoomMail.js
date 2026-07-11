const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { data, error } = await resend.emails.send({
      from: "Hafsa Institute <onboarding@resend.dev>",
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

    if (error) {
      console.error("Resend Error:", error);
      throw error;
    }

    console.log("Email sent successfully:", data);
  } catch (err) {
    console.error("Email sending failed:", err);
    throw err;
  }
};

module.exports = sendZoomMail;