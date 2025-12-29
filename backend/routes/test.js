const express = require("express");
const Article = require("../models/Article");

const router = express.Router();

router.get("/test-article", async (req, res) => {
  try {
    const article = await Article.create({
      title: "Test Article",
      slug: "test-article",
      content: "This is a test article to verify DB connection.",
      sourceUrl: "https://beyondchats.com/blogs/"
    });

    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
