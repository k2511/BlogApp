import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://blogapp-yourname.onrender.com"],
  credentials: true
}));

// MongoDB Connection
const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blogapp");
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
  }
};

// Frontend path
const frontendPath = path.join(__dirname, '..', 'fronted', 'dist');

// Check if frontend build exists
if (fs.existsSync(frontendPath)) {
  console.log("✅ Serving frontend from:", frontendPath);
  
  // Serve static files
  app.use(express.static(frontendPath));
  
  // ✅ FIX: Use regex instead of "*" for Express 5
  // This handles all non-file, non-API routes
  app.get(/\/(?!api|assets).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  console.log("⚠️ Frontend build not found at:", frontendPath);
}

// ========== YOUR API ROUTES ==========
// Import your routes
import router from "./routes/userRoute.js";
import blogrouter from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";

// Mount API routes
app.use("/api/v1/user", router);
app.use("/api/v1/blog", blogrouter);
app.use("/api/v1/comment", commentRoute);

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!", timestamp: new Date().toISOString() });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "Blog App" });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectionDB();
});