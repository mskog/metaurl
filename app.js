const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const metascraper = require("metascraper")([
  require("metascraper-author")(),
  require("metascraper-date")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-logo")(),
  require("metascraper-clearbit")(),
  require("metascraper-publisher")(),
  require("metascraper-title")(),
  require("metascraper-url")()
]);

const got = require("got");

app.get("/", (req, res) => {
  const targetUrl = req.query["url"];

  (async () => {
    try {
      const { body: html, url } = await got(targetUrl, { timeout: 5000 });
      const metadata = await metascraper({ html, url });
      res.send(metadata);
    } catch (e) {
      res.status(422);
      res.json({ error: "Unprocessable entity" });
    }
  })();
});

app.listen(port);
