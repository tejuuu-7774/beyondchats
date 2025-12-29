const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const testRoutes = require("./routes/test");
const articleRoutes = require("./routes/articles");
const scrapeRoutes = require("./routes/scrape");
const searchRoutes = require("./routes/search");
const publishRoutes = require("./routes/publish");

app.get("/", (req, res) => {
  res.send("BeyondChats API running");
});
app.use("/api", testRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api", scrapeRoutes);
app.use("/api", searchRoutes);
app.use("/api", publishRoutes);

module.exports = app;
