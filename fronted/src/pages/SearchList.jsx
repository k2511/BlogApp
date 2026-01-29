
import BlogCard from "@/components/BlogCard";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SearchList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const query = params.get("q") || "";
  const { blog } = useSelector((store) => store.blog);

  const filteredBlogs = blog?.filter((item) => {
    const title = item?.title?.toLowerCase() || "";
    const subtitle = item?.subtitle?.toLowerCase() || "";
    const category = item?.category?.toLowerCase() || "";
    const description = item?.description?.toLowerCase() || "";
    const search = query?.toLowerCase() || "";

    return (
      title.includes(search) ||
      subtitle.includes(search) ||
      category.includes(search) || // Changed from === to includes
      description.includes(search) // Added description search
    );
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search]); // Added dependency

  return (
    <div className="pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="mb-5 text-2xl font-bold">
          Search Results for: "{query}"
        </h2>

        {filteredBlogs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-10">
            {filteredBlogs.map((item) => (
              <BlogCard key={item._id} blog={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No blogs found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchList;