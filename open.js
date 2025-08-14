export async function handler(event, context) {
  try {
    const { email, campaign } = event.queryStringParameters;

    // Send data to Google Apps Script webhook
    await fetch("YOUR_APPS_SCRIPT_WEBHOOK_URL", {
      method: "POST",
      body: JSON.stringify({
        type: "open",
        email,
        campaign,
        timestamp: new Date().toISOString()
      }),
      headers: { "Content-Type": "application/json" }
    });

    // Return a 1x1 transparent PNG
    const pixel = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAmsB9vPr2gAAAABJRU5ErkJggg==",
      "base64"
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      },
      body: pixel.toString("base64"),
      isBase64Encoded: true
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}
