import { initBot } from "./bot/init.js";

export default {
  async fetch(request, env) {
    // Health check
    if (request.method === "GET") {
      return new Response("Bot is running");
    }

    // Telegram webhook
    if (request.method === "POST") {
      const update = await request.json();

      // Direct /start debug (bypass router)
      if (update.message?.text?.startsWith("/start")) {
        await fetch(
          `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: update.message.chat.id,
              text: "✅ Worker received /start"
            })
          }
        );
        return new Response("OK");
      }

      // Normal flow
      return initBot(
        new Request(request.url, {
          method: "POST",
          body: JSON.stringify(update)
        }),
        env
      );
    }

    return new Response("OK");
  }
};
