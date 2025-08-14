import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw_PnWao42hQWcp5ASx5RCy42kaaiLHboKjR7CjBjHKz3pfXxieX4SDzv1m9tqWt-vj_Q/exec";

// Track Opens
app.get("/open", async (req, res) => {
  const { email, campaign } = req.query;

  if (email && campaign) {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "open",
        email,
        campaign,
        timestamp: new Date().toISOString()
      })
    });
  }

  // Send 1x1 tracking pixel
  const pixel = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
    "base64"
  );
  res.set("Content-Type", "image/gif");
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.end(pixel, "binary");
});

// Track Clicks
app.get("/click", async (req, res) => {
  const { email, campaign, url } = req.query;

  if (email && campaign) {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "click",
        email,
        campaign,
        link: url,
        timestamp: new Date().toISOString()
      })
    });
  }

  res.redirect(url || "https://example.com");
});

app.listen(PORT, () => console.log(`✅ Tracker running on port ${PORT}`));
