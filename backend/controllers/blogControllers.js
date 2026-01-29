import { Blog } from "../models/blogModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;
    const file = req.file;

    if (!title || !category) {
      return res.status(400).json({
        message: "Blog title and category are required",
      });
    }

    let thumbnailUrl;
    if (file) {
      const fileUri = getDataUri(file);
      const uploaded = await cloudinary.uploader.upload(fileUri);
      thumbnailUrl = uploaded.secure_url;
    }

    const blog = await Blog.create({
      title,
      category,
      author: req.id,
      thumbnail: thumbnailUrl,
    });

    return res.status(201).json({
      success: true,
      blog,
      message: "Blog is created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create Blog",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, subtitle, description, category } = req.body;
    const file = req.file;

    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found!",
      });
    }

    let thumbnailUrl;
    if (file) {
      const fileUri = getDataUri(file);
      const uploaded = await cloudinary.uploader.upload(fileUri);
      thumbnailUrl = uploaded.secure_url;
    }

    const updateData = {
      title,
      subtitle,
      description,
      category,
      author: req.id,
    };

    if (thumbnailUrl) {
      updateData.thumbnail = thumbnailUrl;
    }

    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating blog",
    });
  }
};

export const getOnwBlog = async (req, res) => {
  try {
    const userId = req.id;

    const blogs = await Blog.find({ author: userId }).populate({
      path: "author",
      select: "firstName lastName photoUrl",
    });

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetch",
    });
  }
};

export const deletBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const authorId = req.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    }

    if (blog.author.toString() !== authorId) {
      return res.status(404).json({
        success: false,
        message: "Unathorized to delete blog",
      });
    }

    //Delete Blog
    await Blog.findByIdAndDelete(blogId);
    res
      .status(200)
      .json({ success: true, message: "Blog Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: error.message,
    });
  }
};

export const getPublishBlog = async (_, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "firstName lastName photoUrl" });
    if (!blogs) {
      return res.status(401).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Get Published Blogs",
    });
  }
};

export const togglePublishBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { publish } = req.query;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // publish status based on the query parameters

    blog.isPublished = !blog.isPublished;
    await blog.save();

    const statusMessage = blog.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      success: true,
      message: `Blog is ${statusMessage}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to Update Blog",
    });
  }
};

// export const likeBlog = async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     const likeUserId = req.id;
//     const blog = await findById(blogId).populate({ path: "likes" });
//     if (!blog) {
//       return res.status(404).json({
//         message: "blog not found",
//         success: false,
//       });
//     }
//     await blog.updateOne({ $addToSet: { likes: likeUserId } });
//     await blog.save();
//     return res.status(200).json({
//       message: "Blog Liked",
//       blog,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const disLikedBlog = async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     const likeUserId = req.id;
//     const blog = await findById(blogId);
//     if (!blog) {
//       return res.status(404).json({
//         message: "blog not found",
//         success: false,
//       });
//     }

//     //dislike logic started

//     await blog.updateOne({ $pull: { likes: likeUserId } });
//     await blog.save();
//     return res.status(200).json({
//       message: "Blog disLiked",
//       blog,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };



// Change this: findById should be Blog.findById
export const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;  // This should match your route parameter
    const likeUserId = req.id;
    const blog = await Blog.findById(blogId);  // Fixed: Changed findById to Blog.findById
    if (!blog) {
      return res.status(404).json({
        message: "blog not found",
        success: false,
      });
    }
    // Check if already liked
    if (blog.likes.includes(likeUserId)) {
      return res.status(400).json({
        success: false,
        message: "Already liked"
      });
    }
    blog.likes.push(likeUserId);
    await blog.save();
    return res.status(200).json({
      message: "Blog Liked",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const disLikedBlog = async (req, res) => {
  try {
    const blogId = req.params.id;  // This should match your route parameter
    const likeUserId = req.id;
    const blog = await Blog.findById(blogId);  // Fixed: Changed findById to Blog.findById
    if (!blog) {
      return res.status(404).json({
        message: "blog not found",
        success: false,
      });
    }

    // Check if not liked
    if (!blog.likes.includes(likeUserId)) {
      return res.status(400).json({
        success: false,
        message: "Not liked yet"
      });
    }

    // Remove like
    blog.likes = blog.likes.filter(id => id.toString() !== likeUserId);
    await blog.save();
    return res.status(200).json({
      message: "Blog Disliked",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getMyTotalBlogLikes = async (req, res) => {
  try {
    const userId = req.id;
    const myBlogs = await Blog.find({author:userId}).select("likes")
    const totalLikes = myBlogs.reduce((acc,blog)=>acc+(blog.likes?.length || 0),0)

    return res.status(200).json({
      success:true,
      totalBlogs:myBlogs.length,
      totalLikes,
    })

  } catch (error) {
    return res.status(500).json({
    success:false,
    message:"Failed to fectch toatal bllog likes"
  })
    
  }
  
}

