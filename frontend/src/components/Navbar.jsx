import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const categories = [
  "Teknoloji",
  "Seyahat",
  "Yemek Tarifleri",
  "Kişisel Gelişim",
  "Kültür & Sanat",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("username") || "";
      setIsAuthenticated(!!token);
      setUsername(user);

      if (token) {
        fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.profilePicture) {
              // Eğer resim yolu "/uploads/..." ise backend URL'si ile birleştir
              if (data.profilePicture.startsWith("http")) {
                setProfilePicture(data.profilePicture);
              } else {
                setProfilePicture(
                  `http://localhost:5000${data.profilePicture}`
                );
              }
            } else {
              setProfilePicture(null);
            }
          })
          .catch(() => setProfilePicture(null));
      } else {
        setProfilePicture(null);
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    window.addEventListener("storageChanged", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("storageChanged", checkAuth);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (dropdownOpen) setDropdownOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          BLOG
        </Link>
      </div>

      <div className={`navbar__center ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Anasayfa
        </Link>

        <div className="navbar__dropdown">
          <button
            className="dropdown__toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            Kategoriler
          </button>
          <ul className={`dropdown__menu ${dropdownOpen ? "open" : ""}`}>
            {categories.map((cat) => (
              <li key={cat}>
                <Link to={`/category/${cat}`} onClick={closeMenu}>
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isAuthenticated && (
          <Link to="/create" onClick={closeMenu}>
            Blog Oluştur
          </Link>
        )}

        <Link to="/about" onClick={closeMenu}>
          Hakkımızda
        </Link>

        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="profile-icon-btn auth-mobile"
              onClick={closeMenu}
              title="Profil"
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profil"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <FaUserCircle size={32} />
              )}
            </Link>
            {username && <span className="navbar-username">{username}</span>}

            <button
              onClick={handleLogout}
              className="logout-icon-btn auth-mobile"
              title="Çıkış"
            >
              <FiLogOut />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-mobile" onClick={closeMenu}>
              Giriş
            </Link>
            <Link to="/register" className="auth-mobile" onClick={closeMenu}>
              Kayıt Ol
            </Link>
          </>
        )}
      </div>

      <div className="navbar__right auth-desktop">
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="profile-icon-btn btn"
              onClick={closeMenu}
              title="Profil"
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profil"
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <FaUserCircle size={32} />
              )}
            </Link>
            {username && <span className="navbar-username">{username}</span>}

            <button
              onClick={handleLogout}
              className="logout-icon-btn btn"
              title="Çıkış"
            >
              <FiLogOut />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn" onClick={closeMenu}>
              Giriş
            </Link>
            <Link to="/register" className="btn" onClick={closeMenu}>
              Kayıt Ol
            </Link>
          </>
        )}
      </div>

      <button
        className="navbar__hamburger"
        onClick={toggleMenu}
        aria-label="Menüyü aç/kapat"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
