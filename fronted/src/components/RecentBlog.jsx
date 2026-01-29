import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "@/redux/blogSlice";
import BlogCartList from "./BlogCartList";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const RecentBlog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/blog/get-published-blogs",
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllPublishedBlogs();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold">Recent Blogs</h1>
        <hr className="w-20 border-2 border-red-500" />
      </div>

      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {blog?.slice(0, 4)?.map((blog, index) => {
            return <BlogCartList key={index} blog={blog} />;
          })}
        </div>

        <div className="hidden lg:block lg:col-span-4 bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm h-fit">
          <h1 className="text-xl font-semibold mb-4">Popular Categories</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "Blogging",
              "Web Development",
              "Digital Marketing",
              "Cooking",
              "Photography",
              "Courses",
            ].map((item, index) => {
              return (
                <Badge key={index} className="cursor-pointer text-sm">
                  {item}
                </Badge>
              );
            })}
          </div>

          <h1 className="text-lg font-semibold">Subscribe to Newsletter</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Get the latest posts and updates delivered straight to your inbox
          </p>

          <div className="flex flex-col gap-3 mt-4">
            <Input
              type="email"
              placehoder="enter your email"
              className="h-10 w-full rounded-md border bg-gray-200 dark:bg-gray-800 px-3 text-sm"
            />
            <Button className="w-full">Subscribe</Button>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Suggest Blog</h2>
            <ul className="space-y-4">
              {[
                "10 days to Master React",
                "Understanding Tailwind CSS",
                "Improve SEO in 2026",
              ].map((title, index) => {
                return (
                  <li
                    key={index}
                    className="text-sm text-gray-700 dark:text-gray-100 hover:underline cursor-pointer leading-relaxed"
                  >
                    {title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlog;


