export async function handler(event, context) {
  try {
    const { email, campaign, redirect } = event.queryStringParameters;

    // Send data to Google Apps Script webhook
    await fetch("YOUR_APPS_SCRIPT_WEBHOOK_URL", {
      method: "POST",
      body: JSON.stringify({
        type: "click",
        email,
        campaign,
        link: redirect,
        timestamp: new Date().toISOString()
      }),
      headers: { "Content-Type": "application/json" }
    });

    // Redirect to original link
    return {
      statusCode: 302,
      headers: { Location: redirect }
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
}
