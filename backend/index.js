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
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const _dirname = path.resolve();

//routes
app.use("/api/v1/user", router);
app.use("/api/v1/blog", blogrouter);
app.use("/api/v1/comment", commentRoute);

app.use(express.static(path.join(_dirname, "/fronted/dist")));
// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(_dirname, "fronted", "dist", "index.html"));
// });

app.listen(PORT, () => {
  connectionDB();
  console.log(`Server is running at ${PORT}`);
});
