import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      setMessage("Giriş başarılı!");


      window.dispatchEvent(new Event("storageChanged"));


      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Giriş hatası:", err);
      setMessage(
        "Giriş başarısız: " +
        (err.response?.data?.message ||
          err.response?.data?.error ||
          err.message)
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Şifre"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button type="submit">Giriş Yap</button>
      </form>

      {message && <p className="auth-message">{message}</p>}

      <div
        style={{
          marginTop: "20px",
          fontSize: "0.9rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Link to="/forgot-password" style={{ color: "#0a1c64ff" }}>
          Şifremi Unuttum
        </Link>
        <p>
          Bir hesabınız yok mu?{" "}
          <Link
            to="/register"
            style={{ color: "#0a1c64ff", fontWeight: "600" }}
          >
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
