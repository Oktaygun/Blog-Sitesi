import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Yükleniyor...</p>;
  if (!blog) return <p>Blog bulunamadı.</p>;

  return (
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>

      {blog.category && (
        <p className="blog-category">Kategori: {blog.category}</p>
      )}

      {blog.image && (
        <img
          src={`http://localhost:5000/${blog.image.replace(/\\/g, "/")}`}
          alt={blog.title}
          className="blog-detail-image"
        />
      )}


      <div className="blog-detail-content">{blog.content}</div>
    </div>
  );
};

export default BlogDetail;
