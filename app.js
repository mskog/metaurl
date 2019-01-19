const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const metascraper = require("metascraper")([
  require("metascraper-author")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-logo")(),
  require("metascraper-clearbit-logo")(),
  require("metascraper-publisher")(),
  require("metascraper-title")(),
  require("metascraper-url")()
]);

const got = require("got");

app.get("/", (req, res) => {
  const targetUrl = req.query["url"];

  (async () => {
    const { body: html, url } = await got(targetUrl);
    const metadata = await metascraper({ html, url });
    res.send(metadata);
  })();
});
