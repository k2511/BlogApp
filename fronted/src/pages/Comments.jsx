import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Comments = () => {
  const [allComments, setAllComments] = useState([]);

  const navigate = useNavigate()

  const getAllComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/comment/my-blogs/comment`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setAllComments(res.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div className="pb-10 pt-20 md:ml-[320px] h-screen">
      <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
        <div>
          <Table>
            <TableCaption>A list of Your Comments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Blog Title</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allComments.map((comment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {comment.postId.title}
                  </TableCell>
                  <TableCell className="font-medium">
                    {comment.content}
                  </TableCell>
                  <TableCell className="font-medium">
                    {comment.userId.firstName} {comment.userId.lastName}
                  </TableCell>
                  <TableCell className="text-right flex gap-3 items-center justify-center">
                    <Eye className="cursor-pointer" onClick={()=> navigate(`/blogs/${comment.postId._id}`)} />

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Comments;
