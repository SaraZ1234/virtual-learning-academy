const db = require("../config/db");
const sendResearchOrderMail = require("../utils/researchOrderMail");
const sendResearchReplyMail = require("../utils/researchReplyMail");

// Create Research Order
const createResearchOrder = (req, res) => {
  const {
    full_name,
    email,
    phone,
    service,
    subject,
    deadline,
    requirements,
  } = req.body;

  // Basic Validation
  if (!full_name || !email || !service) {
    return res.status(400).json({
      success: false,
      message: "Full Name, Email and Service are required.",
    });
  }

  const sql = `
    INSERT INTO research_orders
    (full_name, email, phone, service, subject, deadline, requirements)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      full_name,
      email,
      phone,
      service,
      subject,
      deadline,
      requirements,
    ],
    async (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      await sendResearchOrderMail({
        full_name,
        email,
        phone,
        service,
        subject,
        deadline,
        requirements,
      });

      res.status(201).json({
        success: true,
        message: "Research Order Submitted Successfully",
      });
    }
  );
};

// Get All Research Orders
const getResearchOrders = (req, res) => {
  const sql = `
    SELECT *
    FROM research_orders
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json(results);
  });
};

const replyResearchOrder = (req, res) => {
  const { id } = req.params;
  const { subject, message } = req.body;

  const sql = "SELECT * FROM research_orders WHERE id = ?";

  db.query(sql, [id], async (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Research Order not found.",
      });
    }

    const order = results[0];

    try {
  await sendResearchReplyMail({
    to: order.email,
    full_name: order.full_name,
    subject,
    message,
  });

  // Update order status in database
  const updateSql = `
    UPDATE research_orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(updateSql, ["Responded", id], (updateErr) => {
    if (updateErr) {
      console.error("Status Update Error:", updateErr);

      return res.status(500).json({
        success: false,
        message: "Reply sent but failed to update status.",
      });
    }

    res.json({
      success: true,
      message: "Reply sent successfully.",
    });
  });

} catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to send email.",
      });

    }

  });
};

module.exports = {
  createResearchOrder, getResearchOrders, replyResearchOrder
};