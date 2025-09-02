require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();


app.use(cors());
app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/user", userRoutes);


const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB bağlantısı başarılı!");
    app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor.`));
  })
  .catch((err) => console.log("MongoDB bağlantı hatası:", err));
