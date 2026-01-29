import { setBlog } from "@/redux/blogSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart3, Eye, MessageSquare, ThumbsUp } from "lucide-react";

const TotalProperty = () => {
  const { blog } = useSelector((store) => store.blog);
  const [totalComments, setTotalComments] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const dispatch = useDispatch();

  const getOwnBlog = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/blog/get-own-blogs`,
        { withCredentials: true },
      );
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/comment/my-blogs/comment`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setTotalComments(res.data.totalComments || 0);
      }
    } catch (error) {
      console.log(error);
      setTotalComments(0);
    }
  };

  const getTotalLikes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/blog/my-blogs/likes`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setTotalLikes(res.data.totalLikes || 0);
      }
    } catch (error) {
      console.log(error);
      setTotalLikes(0);
    }
  };

  const calculateTotalViews = () => {
    if (!blog || !Array.isArray(blog)) return 0;
    const views = blog.reduce((total, currentBlog) => {
      return total + (currentBlog.views || 0);
    }, 0);
    setTotalViews(views);
  };

  useEffect(() => {
    getOwnBlog();
    getTotalComments();
    getTotalLikes();
  }, []);

  useEffect(() => {
    if (blog) {
      calculateTotalViews();
    }
  }, [blog]);

  const stats = [
    {
      title: "Total Views",
      value: totalViews,
      icon: Eye,
      changes: "+12%",
      trend: "up",
    },
    {
      title: "Total Blogs",
      value: blog?.length || 0,
      icon: BarChart3,
      changes: "+4%",
      trend: "up",
    },
    {
      title: "Comments",
      value: totalComments,
      icon: MessageSquare,
      changes: "+18%",
      trend: "up",
    },
    {
      title: "Likes",
      value: totalLikes,
      icon: ThumbsUp,
      changes: "+7%",
      trend: "up",
    },
  ];

  return (
    <div className="md:p-10 p-4">
      <div className="flex flex-col md:flex-row justify-around gap-3 md:gap-7">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="w-full dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.changes} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TotalProperty;

