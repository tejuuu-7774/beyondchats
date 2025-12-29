const axios = require("axios");
const cheerio = require("cheerio");

const scrapeReferenceArticle = async (url) => {
  try {
    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    const $ = cheerio.load(data);

    let content = "";

    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 60) {
        content += text + "\n\n";
      }
    });

    return content || null;
  } catch (err) {
    console.log(`Failed to scrape reference: ${url}`);
    return null;
  }
};

module.exports = scrapeReferenceArticle;
