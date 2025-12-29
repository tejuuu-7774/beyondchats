const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://beyondchats.com";

/**
 * STEP 1: Get oldest article links
 */
const getOldestArticleLinks = async () => {
  const listPageUrl = `${BASE_URL}/blogs?page=14`;

  const { data } = await axios.get(listPageUrl);
  const $ = cheerio.load(data);

  const links = new Set();

  $("a[href^='/blogs/']").each((_, el) => {
  if (links.size < 5) {
    const href = $(el).attr("href");

    if (
      href &&
      href.startsWith("/blogs/") &&
      href.split("/").length > 3
    ) {
      links.add(`${BASE_URL}${href}`);
    }
  }
    });


  return Array.from(links);
};

/**
 * STEP 2: Scrape single article page
 */
const scrapeArticlePage = async (url) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const title = $("h1").first().text().trim();
  if (!title) return null;

  let content = "";

  $("article p, .blog-content p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 50) {
      content += text + "\n\n";
    }
  });

  if (!content) return null;

  return {
    title,
    content,
    sourceUrl: url
  };
};


module.exports = {
  getOldestArticleLinks,
  scrapeArticlePage
};
