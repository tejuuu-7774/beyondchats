const Article = require("../models/Article");
const {
  getOldestArticleLinks,
  scrapeArticlePage
} = require("../utils/scrapeBeyondChats");

exports.scrapeAndStoreArticles = async (req, res) => {
    try {
        const links = await getOldestArticleLinks();

        const savedArticles = [];

        for (const link of links) {
    const data = await scrapeArticlePage(link);

    if (!data) {
        console.log(`Skipped invalid article: ${link}`);
        continue;
    }

    const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const existing = await Article.findOne({ slug });

    if (existing) {
        console.log(`Skipped duplicate article: ${slug}`);
        continue;
    }

    const article = await Article.create({
        title: data.title,
        slug,
        content: data.content,
        sourceUrl: data.sourceUrl
    });

    savedArticles.push(article);
    }


    res.json({
      message: "Articles scraped and saved",
      count: savedArticles.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
