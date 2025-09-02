import React, { useState } from "react";
import axios from "axios";
import "./create-blog.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Blog başarıyla oluşturuldu!");
      // İstersen formu resetle
      setTitle("");
      setCategory("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Blog oluşturulurken hata oluştu.");
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Yeni Blog Oluştur</h2>
      <form className="create-blog-form" onSubmit={handleSubmit}>
        <label>
          Başlık:
          <input
            type="text"
            name="title"
            placeholder="Blog başlığı girin"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Kategori:
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Kategori Seçin</option>
            <option>Teknoloji</option>
            <option>Seyahat</option>
            <option>Yemek Tarifleri</option>
            <option>Kültür & Sanat</option>
            <option>Kişisel Gelişim</option>
          </select>
        </label>

        <label>
          İçerik:
          <textarea
            name="content"
            rows="8"
            placeholder="Blog içeriğini buraya yazın..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>

        <label>
          Kapak Görseli:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <button type="submit">Yayımla</button>
      </form>
    </div>
  );
};

export default CreateBlog;
