import { Router } from "./router.js";

export async function initBot(request, env) {
  const update = await request.json();
  const router = new Router(env);
  const payload = await router.handle(update);

  if (!payload) return new Response("OK");

  const url = `https://api.telegram.org/bot${env.BOT_TOKEN}/${payload.method}`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return new Response("OK");
}
