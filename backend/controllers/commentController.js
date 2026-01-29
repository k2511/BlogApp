import { Blog } from "../models/blogModel.js";
import Comment from "../models/commentModel.js";

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentKrneWalaUserKiId = req.id;
    const { content } = req.body;

    const blog = await Blog.findById(postId);
    if (!content)
      return res
        .status(400)
        .json({ message: "text is required", success: false });

    const comment = await Comment.create({
      content,
      userId: commentKrneWalaUserKiId,
      postId: postId,
    });

    await comment.populate({
      path: "userId",
      select: "firstName lastName photoUrl",
    });

    blog.comments.push(comment._id);
    await blog.save();
    return res.status(201).json({
      message: "Comment Added",
      comment,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching comments for blog ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID format",
      });
    }

    // Get all top-level comments (no parent)
    const comments = await Comment.find({
      postId: id,
      parentCommentId: null,
    })
      .populate({
        path: "userId",
        select: "firstName lastName photoUrl",
      })
      .sort({ createdAt: -1 });

    // For each comment, get its replies
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ parentCommentId: comment._id })
          .populate({
            path: "userId",
            select: "firstName lastName photoUrl",
          })
          .sort({ createdAt: 1 });

        return {
          ...comment.toObject(),
          replies: replies || [],
        };
      }),
    );

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments: commentsWithReplies,
    });
  } catch (error) {
    console.log("Error in getCommentsOfPost:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching comments",
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const authorId = req.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    if (comment.userId.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: "Unathourized do delete this id",
      });
    }

    const blogId = comment.postId;
    //Delete the comment

    await Comment.findByIdAndDelete(commentId);

    //remove comment id from blogs comment array

    await Blog.findByIdAndUpdate(blogId, {
      $pull: { comments: commentId },
    });

    res
      .status(200)
      .json({ success: true, message: "Comment delete successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error are deleting",
      error: error.message,
    });
  }
};

export const editComment = async (req, res) => {
  try {
    const userId = req.id;
    const { content } = req.body;
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not aurhorizes to edit the comment",
      });
    }

    comment.content = content;
    comment.editedAt = new Date();

    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment Updated successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Comment is not edited",
      error: error.message,
    });
  }
};

export const likeCommet = async (req, res) => {
  try {
    const userId = req.id;
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId).populate("userId");
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment are not found",
      });
    }

    const alreadLiked = comment.likes.includes(userId);
    if (alreadLiked) {
      //if already like, unlike it
      comment.likes = comment.likes.filter((id) => id !== userId);
    } else {
      // if not liked yet, like it
      comment.likes.push(userId);
      comment.numberofLikes += 1;
    }
    await comment.save();
    res.status(200).json({
      success: true,
      message: alreadLiked ? "Comment unliked" : "Comment Liked",
      updatedComment: comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong when liking the comment",
      error: error.message,
    });
  }
};

export const getAllCommentOnMyBlogs = async (req, res) => {
  try {
    const userId = req.id;

    // find blogs created by logged-in user
    const myBlogs = await Blog.find({ author: userId }).select("_id");

    const blogIds = myBlogs.map((blog) => blog._id);

    if (blogIds.length === 0) {
      return res.status(200).json({
        success: true,
        totalComments: 0,
        comments: [],
        message: "No blogs found for this user",
      });
    }

    const comments = await Comment.find({
      postId: { $in: blogIds },
    })
      .populate("userId", "firstName lastName email")
      .populate("postId", "title");

    res.status(200).json({
      success: true,
      totalComments: comments.length,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get comments",
    });
  }
};

// Add reply to a comment
export const createReply = async (req, res) => {
  try {
    const { parentCommentId } = req.params;
    const userId = req.id;
    const { content } = req.body;

    // Find parent comment to get postId
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      return res.status(404).json({
        success: false,
        message: "Parent comment not found",
      });
    }

    // Create the reply
    const reply = await Comment.create({
      content,
      userId,
      postId: parentComment.postId,
      parentCommentId: parentCommentId,
    });

    await reply.populate({
      path: "userId",
      select: "firstName lastName photoUrl",
    });

    // Also add to blog's comments array
    await Blog.findByIdAndUpdate(
      parentComment.postId,
      { $push: { comments: reply._id } },
      { new: true },
    );

    return res.status(201).json({
      success: true,
      message: "Reply added successfully",
      comment: reply,
    });
  } catch (error) {
    console.log("Error creating reply:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add reply",
      error: error.message,
    });
  }
};
