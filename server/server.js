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


// ===============================
// CORS CONFIGURATION
// ===============================
app.use(cors({
    origin: [
        "https://virtual-learning-academy-production.up.railway.app",
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    credentials: true,
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
}));


// ===============================
// BODY PARSER
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===============================
// DEBUG REQUEST LOGGER
// ===============================
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});


// ===============================
// API ROUTES
// ===============================
app.use("/api", enrollmentRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api", contactRoutes);

app.use("/api", researchOrderRoutes);

app.use("/api/zoom", zoomRoutes);


// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.originalUrl
    });
});


// ===============================
// ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Internal Server Error"
    });
});


// ===============================
// SERVER START
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});