const { getJson } = require("serpapi");

const searchGoogle = async (query) => {
  const result = await getJson({
    q: query,
    engine: "google",
    api_key: process.env.SERPAPI_KEY,
    num: 5
  });

  const links = [];

  if (result.organic_results) {
    for (const r of result.organic_results) {
      if (
        r.link &&
        !r.link.includes("beyondchats.com")
      ) {
        links.push(r.link);
      }

      if (links.length === 2) break;
    }
  }

  return links;
};

module.exports = searchGoogle;
