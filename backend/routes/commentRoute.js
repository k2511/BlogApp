// commentRoutes.js
import express from "express";
import { isAuthenticated } from "../middleware/isAuthencitcated.js";
import { 
  createComment, 
  deleteComment, 
  editComment, 
  getAllCommentOnMyBlogs, 
  getCommentsOfPost, 
  likeCommet,
  createReply  // Make sure this is imported
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/:id/create", isAuthenticated, createComment);
router.post("/:parentCommentId/reply", isAuthenticated, createReply); // This line is important
router.delete("/:id/delete", isAuthenticated, deleteComment);
router.put("/:id/edit", isAuthenticated, editComment);
router.get("/:id/comment/all", getCommentsOfPost);
router.get("/:id/like", isAuthenticated, likeCommet);
router.get("/my-blogs/comment", isAuthenticated, getAllCommentOnMyBlogs);

export default router;