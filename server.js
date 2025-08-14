const express = require("express");
const fetch = require("node-fetch");
const app = express();

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw_PnWao42hQWcp5ASx5RCy42kaaiLHboKjR7CjBjHKz3pfXxieX4SDzv1m9tqWt-vj_Q/exec";

app.get("/", (req, res) => {
  res.send(" Email Tracking Server Running");
});

app.get("/open", async (req, res) => {
  const data = {
    type: "open",
    email: req.query.email || "",
    campaign: req.query.campaign || "",
    timestamp: new Date().toISOString()
  };

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const img = Buffer.from(
    "R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=",
    "base64"
  );
  res.writeHead(200, {
    "Content-Type": "image/gif",
    "Content-Length": img.length
  });
  res.end(img);
});

app.get("/click", async (req, res) => {
  const redirectUrl = req.query.url || "https://google.com";

  const data = {
    type: "click",
    email: req.query.email || "",
    campaign: req.query.campaign || "",
    link: redirectUrl,
    timestamp: new Date().toISOString()
  };

  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  res.redirect(redirectUrl);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
