const db = require("../config/db");
const sendContactMail = require("../utils/sendContactMail");

const createContactMessage = async (req, res) => {
  const {
    name,
    email,
    phone,
    subject,
    message,
  } = req.body;

  const sql = `
    INSERT INTO contact_messages
    (name, email, phone, subject, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, subject, message],
    async (err) => {

      if (err) {
        console.log("DB ERROR:", err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      try {
        await sendContactMail({
          name,
          email,
          phone,
          subject,
          message,
        });

        res.status(201).json({
          success: true,
          message: "Message sent successfully.",
        });

      } catch (error) {
        console.log(error);

        res.status(500).json({
          success: false,
          message: "Message saved but email could not be sent.",
        });
      }

    }
  );
};

const sendMail = require("../utils/sendContactMail");

const sendContactMessage = async (req, res) => {
  const {
    name,
    email,
    phone,
    subject,
    message,
  } = req.body;

  try {
    await sendMail({
      full_name: name,
      email,
      phone,
      course: subject,
      education: "Contact Form",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};


module.exports = {
  createContactMessage,sendContactMessage
};