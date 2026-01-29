import { ChartColumnBig, SquareUser } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineComment, MdOutlineInsertChartOutlined } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="hidden mt-[58px] fixed md:block border-r-2 dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-600 w-[300px] p-10 space-y-2 h-screen z-10 ">
      <div className="text-center pt-10 px-3 space-y-2">
        <NavLink
          to="/dashbord/profile"
          className={({ isActive }) =>
            `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <SquareUser />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/dashbord/your-blogs"
          className={({ isActive }) =>
            `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <ChartColumnBig />
          <span>Your Blogs</span>
        </NavLink>

        <NavLink
          to="/dashbord/comments"
          className={({ isActive }) =>
            `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <MdOutlineComment />
          <span>Comments</span>
        </NavLink>

        <NavLink
          to="/dashbord/write-blogs"
          className={({ isActive }) =>
            `text-2xl  ${isActive ? "bg-gray-800 dark:bg-gray-900 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
          }
        >
          <FaRegEdit />
          <span>Create Blog</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
