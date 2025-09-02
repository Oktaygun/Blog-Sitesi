import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileEditPage.css";

const ProfileEditPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    profilePicture: null,
    profilePictureFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Profil verisi alınamadı");
        const data = await res.json();
        setFormData({
          username: data.username,
          email: data.email,
          bio: data.bio || "",
          profilePicture: data.profilePicture || null,
          profilePictureFile: null,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: URL.createObjectURL(file),
        profilePictureFile: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");


    if (!formData.username.trim() || !formData.email.trim()) {
      setError("Kullanıcı adı ve e-posta zorunludur.");
      setLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append("username", formData.username);
      formPayload.append("email", formData.email);
      formPayload.append("bio", formData.bio);
      if (formData.profilePictureFile) {
        formPayload.append("profilePicture", formData.profilePictureFile);
      }

      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formPayload,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Güncelleme başarısız");
      }

      alert("Profil başarıyla güncellendi!");
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-edit-container">
      <h2>Profil Düzenle</h2>
      {error && <p className="error-message">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="profile-edit-form"
        encType="multipart/form-data"
      >
        <div>
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label>E-posta:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label>Biyografi:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div>
          <label>Profil Fotoğrafı:</label>
          {formData.profilePicture && (
            <img src={formData.profilePicture} alt="Profil Önizleme" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Güncelleniyor..." : "Güncelle"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEditPage;
