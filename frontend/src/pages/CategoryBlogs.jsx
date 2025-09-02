import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "./CategoryBlogs.css";

const CategoryBlogs = () => {
  const { categoryName } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {
        const filtered = res.data.filter(
          (blog) => blog.category.toLowerCase() === categoryName.toLowerCase()
        );
        setBlogs(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) return <p>Yükleniyor...</p>;
  if (blogs.length === 0) return <p>Bu kategoride blog bulunamadı.</p>;

  return (
    <div className="category-blogs-container">
      <h2 className="category-title">{categoryName}</h2>
      <div className="blogs-list">
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`} className="blog-link">
            <BlogCard
              title={blog.title}
              summary={
                blog.content.length > 100
                  ? blog.content.substring(0, 100) + "..."
                  : blog.content
              }
              image={
                blog.image
                  ? `http://localhost:5000/${blog.image.replace(/\\/g, "/")}`
                  : "/images/default-image.jpg"
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBlogs;
