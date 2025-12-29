const express = require("express");
const { publishUpdatedArticle } = require("../controllers/publishController");

const router = express.Router();

router.post("/publish", publishUpdatedArticle);

module.exports = router;
