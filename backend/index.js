// import express from "express";
// import "dotenv/config";
// import connectionDB from "./database/db.js";
// import router from "./routes/userRoute.js";
// import blogrouter from "./routes/blogRoute.js";
// import commentRoute from "./routes/commentRoute.js";
// const app = express();
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const PORT = process.env.PORT || 3000;

// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );

// const _dirname = path.resolve();

// //routes
// app.use("/api/v1/user", router);
// app.use("/api/v1/blog", blogrouter);
// app.use("/api/v1/comment", commentRoute);

// app.use(express.static(path.join(_dirname, "/fronted/dist")));
// // app.get("*", (_, res) => {
// //   res.sendFile(path.resolve(_dirname, "fronted", "dist", "index.html"));
// // });

// app.listen(PORT, () => {
//   connectionDB();
//   console.log(`Server is running at ${PORT}`);
// });


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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL, // Your Render frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const __dirname = path.resolve();

// API routes
app.use("/api/v1/user", router);
app.use("/api/v1/blog", blogrouter);
app.use("/api/v1/comment", commentRoute);

// Serve static files from frontend dist folder
app.use(express.static(path.join(__dirname, "/fronted/dist")));

// FIXED: Catch-all route for SPA - use regex or exclude API routes first
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "fronted", "dist", "index.html"));
});

// Alternative approach (more explicit):
// app.get(["/", "/blogs", "/blogs/*", "/login", "/register", "/profile"], (req, res) => {
//   res.sendFile(path.join(__dirname, "fronted", "dist", "index.html"));
// });

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  connectionDB();
  console.log(`Server is running at port ${PORT}`);
});