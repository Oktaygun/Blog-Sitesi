import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    bio: "",
    registrationDate: "",
    profilePicture: null,
  });
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData((prev) => ({
        ...prev,
        profilePicture: imageUrl,
      }));

    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error(
            "JSON parse hatası: Gelen veri JSON formatında değil"
          );
        }

        if (!response.ok) {
          throw new Error(data.msg || "Veri alınamadı");
        }

        setUserData({
          username: data.username,
          email: data.email,
          bio: data.bio || "",
          registrationDate: new Date(data.createdAt).toLocaleDateString(),
          profilePicture: data.profilePicture || null,
        });
      } catch (error) {
        console.error("Profil verisi alınırken hata:", error.message);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profil Sayfası</h2>

      <div className="profile-pic-container">
        {userData.profilePicture ? (
          <img
            src={
              userData.profilePicture.startsWith("http")
                ? userData.profilePicture
                : `http://localhost:5000${userData.profilePicture}`
            }
            alt="Profil Fotoğrafı"
            className="profile-pic"
          />
        ) : (
          <div className="placeholder-pic">Fotoğraf Yok</div>
        )}
      </div>

      <div className="profile-info">
        <p>
          <strong>Kullanıcı Adı:</strong> {userData.username}
        </p>
        <p>
          <strong>E-posta:</strong> {userData.email}
        </p>
        <p>
          <strong>Biyografi:</strong> {userData.bio}
        </p>
      </div>

      <button
        className="update-button"
        onClick={() => navigate("/profile/edit")}
      >
        Profil Bilgilerini Güncelle
      </button>
    </div>
  );
};

export default ProfilePage;
