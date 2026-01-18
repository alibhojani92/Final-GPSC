const update = await request.json();

if (update.message?.text?.startsWith("/start")) {
  await fetch(
    `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: update.message.chat.id,
        text: "✅ Worker received /start directly"
      })
    }
  );
  return new Response("OK");
}

return initBot(
  new Request(request.url, {
    method: "POST",
    body: JSON.stringify(update)
  }),
  env
);
