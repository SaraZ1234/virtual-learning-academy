const express = require("express");
const router = express.Router();

const {
  createResearchOrder,
  getResearchOrders,
  replyResearchOrder,
} = require("../controllers/researchOrderController");
// Submit Research Order
router.post("/research-order", createResearchOrder);
router.get("/research-orders", getResearchOrders);
router.post("/research-order/:id/reply", replyResearchOrder);

module.exports = router;