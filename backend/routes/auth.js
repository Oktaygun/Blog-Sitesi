const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashed });
    await newUser.save();

    res.status(201).json({ message: "Kayıt başarılı" });
  } catch (err) {
    res.status(400).json({ error: "Kayıt başarısız" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Kullanıcı bulunamadı" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Şifre hatalı" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
