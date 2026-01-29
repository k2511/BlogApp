
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import JoditEditor from "jodit-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { setBlog } from "@/redux/blogSlice";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = useParams();

  const { blog, loading } = useSelector((store) => store.blog);
  const selectedBlog = blog?.find((b) => b._id === blogId);

  const editor = useRef(null);

  const [content, setContent] = useState("");
  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    category: "",
    thumbnail: null,
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [publish, setPublish] = useState(false);

  useEffect(() => {
    if (selectedBlog) {
      setBlogData({
        title: selectedBlog.title,
        subtitle: selectedBlog.subtitle,
        category: selectedBlog.category,
        thumbnail: null,
      });
      setContent(selectedBlog.description);
      setPreviewThumbnail(selectedBlog.thumbnail);
      setPublish(selectedBlog.isPublished || false);
    }
  }, [selectedBlog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCategory = (value) => {
    setBlogData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBlogData((prev) => ({
      ...prev,
      thumbnail: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewThumbnail(reader.result);
    reader.readAsDataURL(file);
  };

  const updateBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", content);
    formData.append("category", blogData.category);
    if (blogData.thumbnail) {
      formData.append("thumbnail", blogData.thumbnail);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/${blogId}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(-1);
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const togglePublish = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/blog/${blogId}?publish=${!publish}`,
        {},
        { withCredentials: true }
      );
      
      if (res.data.success) {
        setPublish(!publish);
        toast.success(res.data.message);
      } else {
        toast.error("Failed to update publish status");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // const deleteBlog = async () => {
  //   try {
  //     const res = await axios.delete(
  //       `http://localhost:8000/api/v1/blog/${blogId}`,
  //       { withCredentials: true }
  //     );
      
  //     if (res.data.success) {
  //       // Update Redux store by removing the deleted blog
  //       const updatedBlogData = blog.filter((blogItem) => blogItem._id !== blogId);
  //       dispatch(setBlog(updatedBlogData));
  //       toast.success(res.data.message);
  //       navigate("/dashboard/your-blogs");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  const deleteBlog = async () => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/v1/blog/delete/${blogId}`,
      { withCredentials: true }
    );

    if (res.data.success) {
      const updatedBlogData = blog.filter(
        (blogItem) => blogItem._id !== blogId
      );
      dispatch(setBlog(updatedBlogData));
      toast.success(res.data.message);
      navigate("/dashbord/your-blogs");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

  return (
    <div className="lg:ml-[320px] h-full min-h-screen pt-20 px-3 pb-10">
      <div className="max-w-6xl mx-auto mt-4 lg:mt-8">
        <Card className="w-full bg-white dark:bg-gray-800 p-6 space-y-6 shadow-lg">
          <h1 className="text-3xl font-bold">Basic Blog Information</h1>
          
          <div className="space-x-2">
            <Button onClick={togglePublish}>
              {publish ? "Unpublish" : "Publish"}
            </Button>
            <Button onClick={deleteBlog} variant="destructive">
              Delete Blog
            </Button>
          </div>

          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={blogData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input
              name="subtitle"
              value={blogData.subtitle}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Content</Label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select value={blogData.category} onValueChange={selectCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Thumbnail</Label>
            <Input type="file" accept="image/*" onChange={selectThumbnail} />
            {previewThumbnail && (
              <img src={previewThumbnail} alt="Thumbnail preview" className="w-64 mt-3" />
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button onClick={updateBlogHandler} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;

