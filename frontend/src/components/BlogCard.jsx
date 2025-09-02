import React from "react";
import "./BlogCard.css";

const BlogCard = ({ title, summary, image }) => {
  return (
    <div className="blog-card">
      <img src={image} alt={title} loading="lazy" />
      <div className="content">
        <h2>{title}</h2>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default BlogCard;
