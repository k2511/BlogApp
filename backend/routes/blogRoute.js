import express from "express";
import { isAuthenticated } from "../middleware/isAuthencitcated.js";
import { singleUpload } from "../middleware/multer.js";
import { createBlog, deletBlog, disLikedBlog, getMyTotalBlogLikes, getOnwBlog, getPublishBlog, likeBlog, togglePublishBlog, updateBlog } from "../controllers/blogControllers.js";

const router = express.Router();

router.post("/", isAuthenticated, createBlog);
router.put("/:blogId", isAuthenticated, singleUpload, updateBlog);
router.get("/get-own-blogs",isAuthenticated, getOnwBlog)
router.delete("/delete/:id",isAuthenticated, deletBlog)
router.get("/:id/like",isAuthenticated, likeBlog)
router.get("/:id/dislike",isAuthenticated, disLikedBlog)
router.get("/my-blogs/likes",isAuthenticated, getMyTotalBlogLikes)
router.get("/get-published-blogs",isAuthenticated, getPublishBlog)
router.patch("/:blogId", togglePublishBlog)


export default router;
