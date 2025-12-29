const express = require("express");
const { scrapeAndStoreArticles } = require("../controllers/scrapeController");

const router = express.Router();

router.post("/scrape", scrapeAndStoreArticles);

module.exports = router;
