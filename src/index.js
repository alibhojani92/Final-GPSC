export default {
  async fetch(request, env) {
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

    await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "✅ VERIFIED BASELINE: Bot is alive"
        })
      }
    );

    return new Response("OK");
  }
};
