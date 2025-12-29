const express = require("express");
const { searchReferences } = require("../controllers/searchController");

const router = express.Router();

router.get("/search-test", searchReferences);

module.exports = router;
