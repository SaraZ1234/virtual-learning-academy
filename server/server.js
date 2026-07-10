const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const researchOrderRoutes = require("./routes/researchOrderRoutes");
const zoomRoutes = require("./routes/zoomRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://virtual-learning-academy-production.up.railway.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", enrollmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", contactRoutes);
app.use("/api", researchOrderRoutes);
app.use("/api/zoom", zoomRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});