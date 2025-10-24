// backend/server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Load environment variables
dotenv.config();

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const tpcRoutes = require("./routes/tpcRoutes"); // ✅ ADD THIS LINE

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API ROUTES (must come BEFORE frontend)
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/tpc", tpcRoutes); // ✅ Ensure this exists

// ✅ Serve Frontend
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// ✅ Fix for Express 5 — use regex instead of "*"
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
