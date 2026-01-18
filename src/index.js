export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("OK");
    }

    const update = await request.json();

    // resolve chat_id safely for both message & callback
    const chatId =
      update.message?.chat?.id ||
      update.callback_query?.message?.chat?.id;

    if (!chatId) {
      return new Response("OK");
    }

    // 🔥 FORCE SEND (NO ROUTER, NO FLOWS)
    await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "✅ Worker received update (proof message)"
        })
      }
    );

    // ACK callback if exists
    if (update.callback_query) {
      await fetch(
        `https://api.telegram.org/bot${env.BOT_TOKEN}/answerCallbackQuery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: update.callback_query.id
          })
        }
      );
    }

    return new Response("OK");
  }
};
