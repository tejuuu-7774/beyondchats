const Article = require("../models/Article");
const searchGoogle = require("../utils/googleSearch");
const scrapeReferenceArticle = require("../utils/scrapeReference");
const rewriteArticle = require("../utils/rewriteWithLLM");

exports.searchReferences = async (req, res) => {
  try {
    const article = await Article.findOne({
      title: { $ne: "Test Article" }
    });

    const links = await searchGoogle(article.title);

    const references = [];

    for (const link of links) {
      const content = await scrapeReferenceArticle(link);
      if (content) references.push(content.slice(0, 1500));
    }

    const rewritten = await rewriteArticle({
      originalTitle: article.title,
      originalContent: article.content.slice(0, 3000),
      references
    });

    res.json({
      originalTitle: article.title,
      rewrittenPreview: rewritten.slice(0, 1000)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
