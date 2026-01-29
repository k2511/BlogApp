import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setLoading } from "@/redux/authSlice";
import { setBlog } from "@/redux/blogSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const WriteBlogs = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const { blog, loading } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createBlogHandler = async () => {
    try {
      dispatch(setLoading(true));

      const response = await axios.post(
        "http://localhost:8000/api/v1/blog/",
        { title, category },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setBlog([...(blog || []), response.data.blog]));
        navigate(`/dashbord/write-blogs/${response.data.blog._id}`);
        toast.success(response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-4 md:pr-20 h-screen md:ml-[320px] pt-20">
      <Card className="md:p-10 p-4 dark:bg-gray-400">
        <h1 className="text-2xl font-bold">Let's Create Blog</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quae
          molestiae consequuntur ex ipsam voluptas aperiam laboriosam illo,
          optio similique earum perspiciatis accusamus porro vel maiores
          delectus pariatur iure sunt?
        </p>

        <div className="mt-10">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Your Blog Name"
              className="bg-white dark:bg-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mt-4 mb-5">
            <Label>Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a Category</SelectLabel>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button disabled={loading} onClick={createBlogHandler}>
              {loading ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WriteBlogs;



