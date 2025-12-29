const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const testRoutes = require("./routes/test");
const articleRoutes = require("./routes/articles");

app.get("/", (req, res) => {
  res.send("BeyondChats API running");
});
app.use("/api", testRoutes);
app.use("/api/articles", articleRoutes);

module.exports = app;
