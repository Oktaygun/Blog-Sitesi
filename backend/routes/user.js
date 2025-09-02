const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/profile-pictures";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
    }
    res.json(user);
  } catch (err) {
    console.error("Sunucu hatası:", err.message);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
});

router.put(
  "/profile",
  auth,
  upload.single("profilePicture"),
  async (req, res) => {
    try {

      const { username, email, bio } = req.body;


      if (req.file) {
        console.log("Yüklenen dosya:", req.file.filename);

      }


      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ msg: "Bu e-posta zaten kullanımda." });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: "Kullanıcı bulunamadı." });
      }

      user.username = username || user.username;
      user.email = email || user.email;
      user.bio = bio || user.bio;

      if (req.file) {



        user.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
      }

      await user.save();

      res.json({ msg: "Profil başarıyla güncellendi." });
    } catch (err) {
      console.error("Profil güncelleme hatası:", err);
      res.status(500).json({ msg: "Sunucu hatası" });
    }
  }
);

module.exports = router;
