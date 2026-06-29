const nodemailer = require("nodemailer");

async function testEmail() {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sarahjavaid111@gmail.com",
        pass: "wezu coqq gixk kuhf", // ✅ remove spaces
      },
    });

    let info = await transporter.sendMail({
      from: "sarahjavaid111@gmail.com",
      to: "sarahjavaid53@gmail.com",
      subject: "Test Email",
      text: "Hello! This is a test email from Node.js",
    });

    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.log("Error:", error);
  }
}

testEmail();