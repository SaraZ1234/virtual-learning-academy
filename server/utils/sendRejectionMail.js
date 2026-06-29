const nodemailer = require("nodemailer");
require("dotenv").config();

const sendRejectionMail = async ({
  full_name,
  email,
  course,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Hafsa Institute of International Learning and Research" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Application Status Update",

    html: `
      <h2>Application Status</h2>

      <p>Dear <strong>${full_name}</strong>,</p>

      <p>
        Thank you for applying for the
        <strong>${course}</strong> program at
        <strong>Hafsa Institute of International Learning and Research</strong>.
      </p>

      <p>
        After reviewing your application, we regret to inform you that
        it has <strong>not been approved</strong> at this time.
      </p>

      <p>
        This decision does not prevent you from applying again in the future.
        We encourage you to submit another application whenever you are ready.
      </p>

      <br>

      <p>If you have any questions, please feel free to contact us.</p>

      <br>

      <p>Regards,</p>

      <h3>Hafsa Institute of International Learning and Research</h3>
    `,
  };

  await transporter.sendMail(mailOptions);

  console.log("Rejection email sent.");
};

module.exports = sendRejectionMail;