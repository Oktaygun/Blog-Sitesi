import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./Auth.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setMessage("Kayıt başarılı! Giriş yapabilirsiniz.");
    } catch (err) {
      setMessage(
        "Bir hata oluştu: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Kullanıcı Adı"
          value={formData.username}
          onChange={handleChange}
          required
        />
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

        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Şifre Tekrar"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <button type="submit">Kayıt Ol</button>
      </form>
      {message && <p className="auth-message">{message}</p>}

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Zaten bir hesabınız var mı?{" "}
        <Link to="/login" style={{ color: "#090f4fff", fontWeight: "600" }}>
          Giriş Yap
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
