import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (blogs.length === 0) return <p>Henüz blog bulunmamaktadır.</p>;

  return (
    <div className="blog-container">
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
  );
};

export default Home;
