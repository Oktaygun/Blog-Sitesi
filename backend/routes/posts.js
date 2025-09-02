const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const upload = require("../middleware/upload");


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog bulunamadı" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : "";

    const newPost = new Post({
      title,
      category,
      content,
      image,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Post oluşturulurken hata oluştu" });
  }
});

module.exports = router;
