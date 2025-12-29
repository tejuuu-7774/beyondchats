const Article = require("../models/Article");
const searchGoogle = require("../utils/googleSearch");
const scrapeReferenceArticle = require("../utils/scrapeReference");
const rewriteArticle = require("../utils/rewriteWithLLM");

exports.publishUpdatedArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      isUpdated: false,
      title: { $ne: "Test Article" }
    });

    if (!article) {
      return res.json({ message: "No article to update" });
    }

    const referenceLinks = await searchGoogle(article.title);

    const referenceContents = [];

    for (const link of referenceLinks) {
      const content = await scrapeReferenceArticle(link);
      if (content) referenceContents.push(content.slice(0, 700));
    }

    const rewrittenContent = await rewriteArticle({
      originalTitle: article.title,
      originalContent: article.content.slice(0, 1200),
      references: referenceContents
    });

    const updatedArticle = await Article.create({
      title: article.title + " (Updated)",
      slug: article.slug + "-updated",
      content:
        rewrittenContent +
        "\n\nReferences:\n" +
        referenceLinks.join("\n"),
      sourceUrl: article.sourceUrl,
      isUpdated: true,
      references: referenceLinks
    });

    res.json({
      message: "Updated article published",
      articleId: updatedArticle._id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
