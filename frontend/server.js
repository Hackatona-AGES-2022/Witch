const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.resolve(__dirname, "build")));

app.get("*service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 3000, (err) => {
  if (err) return console.error("Algum problema aconteceu", err);
  console.log("Tudo ok");
});
