// import React, { useState } from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Badge } from "@/components/ui/badge";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { FaRegHeart } from "react-icons/fa6";
// import { Bookmark, MessageSquare, Share2 } from "lucide-react";
// import { toast } from "sonner";
// import axios from "axios";
// import { FaHeart } from "react-icons/fa";
// import { setBlog } from "@/redux/blogSlice";
// import CommentBox from "@/components/CommentBox";

// const BlogView = () => {
//   const params = useParams();
//   const blogId = params.blogId;
//   const dispatch = useDispatch();
//   const { blog } = useSelector((store) => store.blog);
//   const { user } = useSelector((store) => store.auth);

//   const selectedBlog = blog?.find((blog) => blog._id === blogId);

//   // Add null checks for selectedBlog
//   const [blogLike, setBlogLike] = useState(selectedBlog?.likes?.length || 0);
//   const [liked, setLiked] = useState(
//     selectedBlog?.likes?.includes(user?._id) || false,
//   );

//   if (!selectedBlog) {
//     return <p className="p-10 text-center pt-24 text-lg">Blog not found</p>;
//   }

//   const changeTimeFormat = (isDate) => {
//     const date = new Date(isDate);
//     return date.toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const handleShare = (blogId) => {
//     const blogUrl = `${window.location.origin}/blogs/${blogId}`;
//     if (navigator.share) {
//       navigator.share({
//         title: "Check out this blog!",
//         text: "Read this amazing blog post",
//         url: blogUrl,
//       });
//     } else {
//       navigator.clipboard.writeText(blogUrl).then(() => {
//         toast.success("Blog link copied to clipboard");
//       });
//     }
//   };

//   const likeOrDislikeHandler = async () => {
//     try {
//       const action = liked ? "dislike" : "like";
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/blog/${selectedBlog._id}/${action}`,
//         { withCredentials: true },
//       );

//       if (res.data.success) {
//         const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
//         setBlogLike(updatedLikes);
//         setLiked(!liked);

//         // Update the blog in Redux store if you want to sync across components
//         if (blog) {
//           const updatedBlogs = blog.map((p) => {
//             if (p._id === selectedBlog._id) {
//               return {
//                 ...p,
//                 likes: liked
//                   ? p.likes.filter((id) => id !== user._id)
//                   : [...p.likes, user._id],
//               };
//             }
//             return p;
//           });

//           dispatch(setBlog(updatedBlogs));
//         }

//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="pt-16 md:pt-20 blog-View">
//       <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
//         {/* Breadcrumb */}
//         <Breadcrumb className="mb-6">
//           <BreadcrumbList className="flex-wrap">
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/">Home</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage className="truncate max-w-[220px] sm:max-w-none">
//                 {selectedBlog.title}
//               </BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>

//         {/* Blog Title */}
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-5">
//           {selectedBlog.title}
//         </h1>

//         {/* Author Info */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
//           <div className="flex items-center gap-3">
//             <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
//               <AvatarImage src={selectedBlog.author?.photoUrl} alt="author" />
//               <AvatarFallback>
//                 {selectedBlog.author?.firstName?.[0] || "U"}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium text-sm sm:text-base">
//                 {selectedBlog.author?.firstName} {selectedBlog.author?.lastName}
//               </p>
//               <p className="text-xs sm:text-sm text-muted-foreground">
//                 {changeTimeFormat(selectedBlog.createdAt)} · 8 min read
//               </p>
//             </div>
//           </div>

//           {/* Mobile Share */}
//           <div className="sm:hidden">
//             <Button
//               onClick={() => handleShare(selectedBlog._id)}
//               variant="outline"
//               size="sm"
//               className="gap-2 w-full"
//             >
//               <Share2 className="w-4 h-4" />
//               Share
//             </Button>
//           </div>
//         </div>

//         {/* Thumbnail */}
//         {selectedBlog.thumbnail && (
//           <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
//             <img
//               src={selectedBlog.thumbnail}
//               alt="Blog thumbnail"
//               className="w-full h-52 sm:h-64 md:h-80 lg:h-[420px] object-cover"
//             />
//           </div>
//         )}

//         {/* Subtitle */}
//         {selectedBlog.subtitle && (
//           <p className="text-base sm:text-lg italic text-muted-foreground mb-8">
//             {selectedBlog.subtitle}
//           </p>
//         )}

//         {/* Blog Content */}
//         {selectedBlog.description && (
//           <div className="mb-10">
//             <div
//               className="prose prose-sm dark:bg-white sm:prose-base lg:prose-lg max-w-none leading-relaxed"
//               dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
//             />
//           </div>
//         )}

//         {/* Tags */}
//         <div className="mb-8">
//           <div className="flex flex-wrap gap-2">
//             <Badge variant="secondary">Next.js</Badge>
//             <Badge variant="secondary">React</Badge>
//             <Badge variant="secondary">Web Development</Badge>
//             <Badge variant="secondary">MERN Stack</Badge>
//             <Badge variant="secondary">JavaScript</Badge>
//           </div>
//         </div>

//         {/* Engagement */}
//         <div className="border-t border-b py-4">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <Button
//                 onClick={likeOrDislikeHandler}
//                 variant="ghost"
//                 size="sm"
//                 className="gap-2"
//               >
//                 {liked ? (
//                   <FaHeart size={20} className="text-red-600" />
//                 ) : (
//                   <FaRegHeart className="w-5 h-5" />
//                 )}
//                 <span className="text-sm">{blogLike}</span>
//               </Button>

//               <Button variant="ghost" size="sm" className="gap-2">
//                 <MessageSquare className="w-5 h-5" />
//                 <span className="text-sm">1 comment</span>
//               </Button>
//             </div>

//             <div className="flex items-center gap-2">
//               <Button variant="ghost" size="sm">
//                 <Bookmark className="w-4 h-4" />
//               </Button>

//               <Button
//                 onClick={() => handleShare(selectedBlog._id)}
//                 variant="ghost"
//                 size="sm"
//                 className="hidden sm:flex gap-2"
//               >
//                 <Share2 className="w-4 h-4" />
//                 Share
//               </Button>
//             </div>
//           </div>
//           <div>
//             <CommentBox selectedBlog={selectedBlog} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogView;




import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaRegHeart } from "react-icons/fa6";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { setBlog } from "@/redux/blogSlice";
import CommentBox from "@/components/CommentBox";

const BlogView = () => {
  const params = useParams();
  const blogId = params.blogId;
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);

  const selectedBlog = blog?.find((blog) => blog._id === blogId);

  const [blogLike, setBlogLike] = useState(selectedBlog?.likes?.length || 0);
  const [liked, setLiked] = useState(
    selectedBlog?.likes?.includes(user?._id) || false
  );

  if (!selectedBlog) {
    return <p className="p-10 text-center pt-24 text-lg">Blog not found</p>;
  }

  const changeTimeFormat = (isDate) => {
    const date = new Date(isDate);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleShare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`;
    if (navigator.share) {
      navigator.share({
        title: "Check out this blog!",
        text: "Read this amazing blog post",
        url: blogUrl,
      });
    } else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("Blog link copied to clipboard");
      });
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/blog/${selectedBlog._id}/${action}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
        setBlogLike(updatedLikes);
        setLiked(!liked);

        if (blog) {
          const updatedBlogs = blog.map((p) => {
            if (p._id === selectedBlog._id) {
              return {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              };
            }
            return p;
          });

          dispatch(setBlog(updatedBlogs));
        }

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="pt-16 md:pt-20 blog-View">
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList className="flex-wrap">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate max-w-[220px] sm:max-w-none">
                {selectedBlog.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-5">
          {selectedBlog.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
              <AvatarImage
                src={
                  typeof selectedBlog.author?.photoUrl === "string"
                    ? selectedBlog.author.photoUrl
                    : undefined
                }
                alt="author"
              />
              <AvatarFallback>
                {selectedBlog.author?.firstName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm sm:text-base">
                {selectedBlog.author?.firstName}{" "}
                {selectedBlog.author?.lastName}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {changeTimeFormat(selectedBlog.createdAt)} · 8 min read
              </p>
            </div>
          </div>

          <div className="sm:hidden">
            <Button
              onClick={() => handleShare(selectedBlog._id)}
              variant="outline"
              size="sm"
              className="gap-2 w-full"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {selectedBlog.thumbnail && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
            <img
              src={selectedBlog.thumbnail}
              alt="Blog thumbnail"
              className="w-full h-52 sm:h-64 md:h-80 lg:h-[420px] object-cover"
            />
          </div>
        )}

        {selectedBlog.subtitle && (
          <p className="text-base sm:text-lg italic text-muted-foreground mb-8">
            {selectedBlog.subtitle}
          </p>
        )}

        {selectedBlog.description && (
          <div className="mb-10">
            <div
              className="prose prose-sm dark:bg-white sm:prose-base lg:prose-lg max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
            />
          </div>
        )}

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Web Development</Badge>
            <Badge variant="secondary">MERN Stack</Badge>
            <Badge variant="secondary">JavaScript</Badge>
          </div>
        </div>

        <div className="border-t border-b py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={likeOrDislikeHandler}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                {liked ? (
                  <FaHeart size={20} className="text-red-600" />
                ) : (
                  <FaRegHeart className="w-5 h-5" />
                )}
                <span className="text-sm">{blogLike}</span>
              </Button>

              <Button variant="ghost" size="sm" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm">1 comment</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>

              <Button
                onClick={() => handleShare(selectedBlog._id)}
                variant="ghost"
                size="sm"
                className="hidden sm:flex gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>

          <div>
            <CommentBox selectedBlog={selectedBlog} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
