import express from "express";
import "dotenv/config";
import connectionDB from "./database/db.js";
import router from "./routes/userRoute.js";
import blogrouter from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

// ✅ __dirname ठीक से बनाएं
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

// ✅ CORS ठीक करें
app.use(cors({
  origin: ["http://localhost:5173", "https://blogapp-tebg.onrender.com"],
  credentials: true
}));

// ✅ Frontend path ठीक से सेट करें
const frontendPath = path.join(__dirname, '..', 'fronted', 'dist');

// ✅ DEBUG: Check if folder exists
console.log("Frontend path:", frontendPath);
console.log("Folder exists:", fs.existsSync(frontendPath));

// ✅ IMPORTANT: Express को बताएं कि static files कहाँ हैं
app.use(express.static(frontendPath));

// API routes
app.use("/api/v1/user", router);
app.use("/api/v1/blog", blogrouter);
app.use("/api/v1/comment", commentRoute);

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// ✅ IMPORTANT FIX: File extension check करने वाला middleware
app.use((req, res, next) => {
  const url = req.url;
  
  // अगर URL में .css, .js, .png etc है तो उसे static file की तरह handle करो
  if (url.includes('.css') || url.includes('.js') || url.includes('.png') || 
      url.includes('.jpg') || url.includes('.svg') || url.includes('.woff') ||
      url.includes('.ttf') || url.includes('.ico')) {
    
    // Express static middleware को handle करने दो
    return next();
  }
  
  // अगर API route है
  if (url.startsWith('/api/')) {
    return next();
  }
  
  // वरना index.html भेजो
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  connectionDB();
  console.log(`Server running on port ${PORT}`);
});