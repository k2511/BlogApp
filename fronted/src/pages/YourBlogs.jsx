import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "@/redux/blogSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Delete, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const YourBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog = [] } = useSelector((store) => store.blog);

  const getOwnBlog = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/blog/get-own-blogs",
        { withCredentials: true },
      );
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletBlog = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/delete/${id}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
      }
      console.log(res.data.message);
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getOwnBlog();
  }, []);

  return (
    <div className="pb-10 pt-20 md:ml-[320px] h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="w-full p-5 dark:bg-gray-800">
          <Table>
            <TableCaption>A list of your Blogs. || Try to details</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {blog.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="flex gap-4 items-center">
                    <img
                      src={item.thumbnail || ""}
                      alt=""
                      className="w-20 rounded-md hidden md:block"
                    />
                    <h1 onClick={()=>navigate(`/blogs/${item._id}`)}  className="hover:underline cursor-pointer">
                      {item.title}
                    </h1>
                  </TableCell>

                  <TableCell>{item.category}</TableCell>

                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {" "}
                          <BsThreeDotsVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40" align="left">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(`/dashbord/write-blogs/${item._id}`)
                            }
                          >
                            {" "}
                            <Edit /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem  onClick={()=> deletBlog(item._id)} className="text-red-500">
                            {" "}
                            <Trash2
                              className="text-red-500 hover:text-red-700"
                             
                            />{" "}
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default YourBlogs;
