export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only accept Telegram webhook on /webhook
    if (url.pathname !== "/webhook") {
      return new Response("OK");
    }

    if (request.method !== "POST") {
      return new Response("OK");
    }

    const update = await request.json();

    const chatId =
      update.message?.chat?.id ||
      update.callback_query?.message?.chat?.id;

    if (!chatId) {
      return new Response("OK");
    }

    // VERIFIED: send via Telegram API
    await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "✅ VERIFIED: Bot is working"
        })
      }
    );

    return new Response("OK");
  }
};
