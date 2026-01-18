import { Router } from "./bot/router.js";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("OK");
    }

    const update = await request.json();
    const router = new Router(env);
    const payload = await router.handle(update);

    // ✅ ACK callback_query (VERY IMPORTANT)
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

    if (!payload) {
      return new Response("OK");
    }

    // ✅ Respond directly to Telegram
    return new Response(JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
