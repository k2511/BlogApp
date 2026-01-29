// import mongoose from "mongoose";

// const commentsSchem = new mongoose.Schema(
//   {
//     content: {
//       type: String,
//       required: true,
//     },
//     postId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Blog",
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     likes: {
//       type: Array,
//       default: [],
//     },
//     numberofLikes: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true },
// );

// const Comment = mongoose.model("Comment", commentsSchem);
// export default Comment;


import mongoose from "mongoose";

const commentsSchem = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null, // null means it's a top-level comment
    },
    likes: {
      type: Array,
      default: [],
    },
    numberofLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model("Comment", commentsSchem);
export default Comment;