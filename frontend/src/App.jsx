import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const Home = lazy(() => import("./pages/Home"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const About = lazy(() => import("./pages/About"));
const CategoryBlogs = lazy(() => import("./pages/CategoryBlogs"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ProfileEditPage = lazy(() => import("./pages/ProfileEditPage"));

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<div className="loading">Yükleniyor...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route
                path="/category/:categoryName"
                element={<CategoryBlogs />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<ProfileEditPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
