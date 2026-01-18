const payload = await router.handle(update);

if (!payload) {
  await fetch(
    `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: update.message?.chat?.id || update.callback_query?.message?.chat?.id,
        text: "⚠️ Router received update but no handler matched"
      })
    }
  );
  return new Response("OK");
}
